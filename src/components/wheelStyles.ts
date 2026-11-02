import rawStyles from "./InteractiveWheel.module.css";

const styleRecord = (rawStyles ?? {}) as Record<string, string>;

const s: Record<string, string> = new Proxy(styleRecord, {
  get(target, prop: string) {
    return target[prop] || prop;
  },
});

export default s;

