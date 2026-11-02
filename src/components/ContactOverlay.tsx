"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import s from "./wheelStyles";

type ContactOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactOverlay({ open, onClose }: ContactOverlayProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  const [status, setStatus] = useState<
    "idle" | "submitting" | "sent" | "error" | "unconfigured"
  >("idle");
  const [feedback, setFeedback] = useState("");
  const [serviceConfigured, setServiceConfigured] = useState<boolean | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const focusTimer = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 80);

    fetch("/api/contact")
      .then((r) => r.json())
      .then((data: { configured?: boolean }) => {
        setServiceConfigured(Boolean(data.configured));
      })
      .catch(() => {
        setServiceConfigured(false);
      });

    return () => window.clearTimeout(focusTimer);
  }, [open]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (!cleanName) {
      setStatus("error");
      setFeedback("Name is required.");
      return;
    }
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStatus("error");
      setFeedback("A valid Email is required.");
      return;
    }
    if (!cleanMessage || cleanMessage.length < 2) {
      setStatus("error");
      setFeedback("Message is required.");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          message: cleanMessage,
          website,
        }),
      });

      const payload = (await response.json()) as {
        success?: boolean;
        configured?: boolean;
        error?: string;
      };

      if (response.status === 503 || payload.configured === false) {
        setStatus("unconfigured");
        setFeedback(
          payload.error ||
            "Email transport is not configured. Define CONTACT_RECIPIENT_EMAIL and SMTP/Gmail/Resend credentials in environment variables."
        );
        return;
      }

      if (!response.ok || !payload.success) {
        setStatus("error");
        setFeedback(payload.error || "Unable to send message.");
        return;
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setFeedback("Message transmitted.");
    } catch {
      setStatus("error");
      setFeedback("Network error while attempting transmission.");
    }
  };

  return (
    <div
      className={`${s.contactBackdrop} ${open ? s.contactBackdropOpen : ""}`}
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        className={`${s.contactPanel} ${open ? s.contactPanelOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Contact"
      >
        <div className={s.contactHeader}>
          <span className={s.contactTitle}>CONTACT</span>
          <button
            type="button"
            className={s.overlayClose}
            onClick={onClose}
            aria-label="Close contact overlay"
            tabIndex={open ? 0 : -1}
          >
            ×
          </button>
        </div>

        <form className={s.contactForm} onSubmit={handleSubmit} noValidate>
          <div className={s.honeypot} aria-hidden="true">
            <label htmlFor="pwa-website">Website</label>
            <input
              id="pwa-website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <label className={s.fieldGroup}>
            <span className={s.fieldLabel}>Name</span>
            <input
              ref={nameInputRef}
              type="text"
              name="name"
              required
              maxLength={120}
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={s.fieldInput}
              tabIndex={open ? 0 : -1}
            />
          </label>

          <label className={s.fieldGroup}>
            <span className={s.fieldLabel}>Email</span>
            <input
              type="email"
              name="email"
              required
              maxLength={254}
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={s.fieldInput}
              tabIndex={open ? 0 : -1}
            />
          </label>

          <label className={s.fieldGroup}>
            <span className={s.fieldLabel}>Message</span>
            <textarea
              name="message"
              required
              rows={4}
              maxLength={5000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={s.fieldTextarea}
              tabIndex={open ? 0 : -1}
            />
          </label>

          {serviceConfigured === false && status === "idle" && (
            <p className={s.configNotice} role="status">
              Transport status: awaiting environment configuration (
              <code>CONTACT_RECIPIENT_EMAIL</code> +{" "}
              <code>SMTP_HOST / SMTP_USER / SMTP_PASS</code> or{" "}
              <code>GMAIL_USER / GMAIL_APP_PASSWORD</code>).
            </p>
          )}

          {feedback && (
            <p
              className={
                status === "sent"
                  ? s.feedbackSuccess
                  : status === "unconfigured"
                    ? s.configNotice
                    : s.feedbackError
              }
              role="alert"
            >
              {feedback}
            </p>
          )}

          <button
            type="submit"
            className={s.sendButton}
            disabled={status === "submitting"}
            tabIndex={open ? 0 : -1}
          >
            <span>{status === "submitting" ? "SENDING..." : "SEND"}</span>
          </button>
        </form>
      </section>
    </div>
  );
}
