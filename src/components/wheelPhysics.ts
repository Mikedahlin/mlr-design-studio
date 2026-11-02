export const mod = (value: number, length: number): number =>
  ((value % length) + length) % length;

export function shortestDelta(index: number, position: number, cardCount: number): number {
  let d = index - mod(position, cardCount);
  if (d > cardCount / 2) d -= cardCount;
  if (d < -cardCount / 2) d += cardCount;
  return d;
}

export function getSnappedIndex(position: number, cardCount = 8): number {
  return mod(Math.round(position), cardCount);
}

export function commitWheelSelection(
  currentIndex: number,
  position: number,
  settled: boolean,
  cardCount = 8
): number {
  return settled ? getSnappedIndex(position, cardCount) : currentIndex;
}

const AUTO_TURN_RATE = 0.000035;

export function getAutoTurnTarget(position: number): number {
  return position + 1;
}

export function getAutoTurnDuration(): number {
  return 1 / (AUTO_TURN_RATE * 1000);
}

export function getCardTapAction({
  cardIndex,
  selectedIndex,
  moved,
}: {
  cardIndex: number;
  selectedIndex: number;
  moved: number;
}): "momentum" | "inspect" | "select" {
  if (moved > 10) return "momentum";
  return cardIndex === selectedIndex ? "inspect" : "select";
}

// Cubic-bezier(0.25, 0.1, 0.25, 1.0) approximation for smooth momentum carry
function cubicEaseOut(t: number): number {
  const inv = 1 - t;
  return 1 - inv * inv * inv * (1 - 0.28 * t);
}

export type ActiveAnimation = {
  stop: () => void;
};

export class MotionPosition {
  private value: number;
  private velocity = 0;
  private activeCancel: (() => void) | null = null;

  constructor(initial = 0) {
    this.value = initial;
  }

  get(): number {
    return this.value;
  }

  getVelocity(): number {
    return this.velocity;
  }

  set(next: number, instantVelocity?: number): void {
    if (instantVelocity !== undefined) {
      this.velocity = instantVelocity;
    } else {
      this.velocity = next - this.value;
    }
    this.value = next;
  }

  stop(): void {
    if (this.activeCancel) {
      this.activeCancel();
      this.activeCancel = null;
    }
  }

  animateTween(
    target: number,
    options: {
      duration: number; // seconds
      ease?: "linear" | "cubicOut";
      onComplete?: () => void;
    }
  ): ActiveAnimation {
    this.stop();
    const startValue = this.value;
    const delta = target - startValue;
    const durationMs = Math.max(16, options.duration * 1000);
    const startTime = performance.now();
    let cancelled = false;
    let rafId = 0;

    const step = (now: number) => {
      if (cancelled) return;
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      const eased = options.ease === "linear" ? t : cubicEaseOut(t);
      const nextVal = startValue + delta * eased;
      this.velocity = (nextVal - this.value) * 60;
      this.value = nextVal;

      if (t < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        this.value = target;
        this.velocity = 0;
        this.activeCancel = null;
        options.onComplete?.();
      }
    };

    this.activeCancel = () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };

    rafId = requestAnimationFrame(step);
    return {
      stop: () => this.stop(),
    };
  }

  animateSpring(
    target: number,
    options: {
      stiffness?: number;
      damping?: number;
      mass?: number;
      restDelta?: number;
      onComplete?: () => void;
    } = {}
  ): ActiveAnimation {
    this.stop();
    const stiffness = options.stiffness ?? 180;
    const damping = options.damping ?? 22;
    const mass = options.mass ?? 0.85;
    const restDelta = options.restDelta ?? 0.0005;

    let current = this.value;
    let vel = this.velocity * 0.35;
    let lastTime = performance.now();
    let cancelled = false;
    let rafId = 0;

    const step = (now: number) => {
      if (cancelled) return;
      const dt = Math.min(0.032, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      const displacement = current - target;
      const springForce = -stiffness * displacement;
      const dampingForce = -damping * vel;
      const acceleration = (springForce + dampingForce) / mass;

      vel += acceleration * dt;
      current += vel * dt;

      this.velocity = vel;
      this.value = current;

      if (Math.abs(vel) < restDelta * 12 && Math.abs(target - current) < restDelta) {
        this.value = target;
        this.velocity = 0;
        this.activeCancel = null;
        options.onComplete?.();
      } else {
        rafId = requestAnimationFrame(step);
      }
    };

    this.activeCancel = () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };

    rafId = requestAnimationFrame(step);
    return {
      stop: () => this.stop(),
    };
  }
}

