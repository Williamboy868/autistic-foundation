"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { n: "450+", l: "Families Supported", d: "Since 2025" },
  { n: "12", l: "Partner Clinics", d: "Across 4 regions" },
  { n: "96%", l: "Satisfaction Rate", d: "From family surveys" },
  { n: "850", l: "Hours of Training", d: "Delivered to clinicians" },
];

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Heading
      gsap.fromTo(
        headRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 82%", once: true },
        }
      );

      // Cards stagger from bottom with slight x offset alternating
      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.children);
        gsap.fromTo(
          cards,
          { y: 70, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: { amount: 0.4, from: "start" },
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Counter animations
      STATS.forEach((stat, i) => {
        const el = counterRefs.current[i];
        if (!el) return;

        // Extract numeric value
        const rawNum = parseFloat(stat.n.replace(/[^0-9.]/g, ""));
        const suffix = stat.n.replace(/[0-9.,]/g, "");

        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              { val: 0 },
              { val: rawNum, duration: 1.8, ease: "power2.out" },
              {
                onUpdate: function () {
                  if (!el) return;
                  const v = this.targets()[0].val as number;
                  const formatted =
                    rawNum >= 1000
                      ? Math.round(v).toLocaleString()
                      : rawNum < 10
                      ? v.toFixed(0)
                      : Math.round(v).toString();
                  el.textContent = formatted + suffix;
                },
              }
            );
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="research"
      style={{
        padding: "6rem 0",
        background: "var(--dark-surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative radial overlays */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -60,
          width: 340,
          height: 340,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(20,86,240,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "0 1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div
          ref={headRef}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-ui)",
              fontSize: "0.675rem",
              fontWeight: 600,
              letterSpacing: "0.09em",
              textTransform: "uppercase" as const,
              color: "var(--color-primary-light)",
              background: "rgba(96,165,250,0.12)",
              border: "1px solid rgba(96,165,250,0.18)",
              padding: "0.3rem 0.9rem",
              borderRadius: "var(--r-pill)",
              marginBottom: "1.25rem",
            }}
          >
            Our Impact
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem, 3vw, 2.75rem)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: "#fff",
              marginTop: "0.5rem",
              lineHeight: 1.15,
            }}
          >
            Numbers that matter.
          </h2>
        </div>

        {/* Stat cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            gap: "1.25rem",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.l}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "var(--r-2xl)",
                padding: "2.25rem 1.75rem",
                textAlign: "center",
                backdropFilter: "blur(12px)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(255,255,255,0.07)";
                el.style.borderColor = "rgba(96,165,250,0.25)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.transform = "translateY(0)";
              }}
            >
              <div
                ref={(el) => {
                  counterRefs.current[i] = el;
                }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.6rem",
                  fontWeight: 600,
                  color: "var(--color-primary-200)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 500,
                  fontSize: "0.88rem",
                  color: "#fff",
                  marginTop: "0.75rem",
                }}
              >
                {s.l}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.7rem",
                  color: "var(--color-primary-light)",
                  marginTop: "0.35rem",
                  opacity: 0.7,
                }}
              >
                {s.d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
