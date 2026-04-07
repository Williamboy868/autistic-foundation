"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 82%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{ padding: "6rem 0", background: "#fff" }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          ref={cardRef}
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            background: "var(--dark-surface)",
            borderRadius: "var(--r-3xl)",
            padding: "clamp(2rem, 5vw, 4rem)",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Orbs */}
          <div
            style={{
              position: "absolute",
              right: -80,
              top: -80,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />
          <div
            style={{
              position: "absolute",
              left: -60,
              bottom: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(20,86,240,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />

          {/* Left */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <span
              style={{
                display: "inline-flex",
                fontFamily: "var(--font-ui)",
                fontSize: "0.675rem",
                fontWeight: 600,
                letterSpacing: "0.09em",
                textTransform: "uppercase" as const,
                color: "var(--color-primary-light)",
                background: "rgba(96,165,250,0.12)",
                border: "1px solid rgba(96,165,250,0.2)",
                padding: "0.3rem 0.9rem",
                borderRadius: "var(--r-pill)",
                marginBottom: "1.25rem",
              }}
            >
              Stay Connected
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 2.6vw, 2.2rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "#fff",
                margin: "0.5rem 0 1rem",
                lineHeight: 1.2,
              }}
            >
              Stories, research, and good news — monthly.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.88rem",
                fontWeight: 400,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.8,
              }}
            >
              No noise. Just meaningful updates from our community. Unsubscribe anytime.
            </p>
          </div>

          {/* Right */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {!done ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    background: "rgba(255,255,255,0.07)",
                    border: "1.5px solid rgba(255,255,255,0.12)",
                    borderRadius: "var(--r-sm)",
                    overflow: "hidden",
                    marginBottom: "0.85rem",
                  }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      padding: "0.875rem 1.25rem",
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.875rem",
                      color: "#fff",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && email) setDone(true);
                    }}
                    aria-label="Email address for newsletter"
                  />
                  <button
                    onClick={() => email && setDone(true)}
                    style={{
                      background: "var(--brand-6)",
                      color: "#fff",
                      border: "none",
                      padding: "0.875rem 1.5rem",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 600,
                      fontSize: "0.84rem",
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.background =
                        "var(--color-primary-600)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.background =
                        "var(--brand-6)")
                    }
                  >
                    Subscribe
                  </button>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.68rem",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  We respect your inbox and your privacy.
                </p>
              </>
            ) : (
              <div
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1.5px solid rgba(255,255,255,0.1)",
                  borderRadius: "var(--r-xl)",
                  padding: "2.25rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "0.85rem" }}>✦</div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: "#fff",
                    marginBottom: "0.5rem",
                  }}
                >
                  You&apos;re in!
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.82rem",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  Thank you — look out for our next dispatch.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
