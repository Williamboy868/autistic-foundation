"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiArrowRightLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const STACK_PROGRAMS = [
  {
    lbl: "Family Navigation",
    t: "Guides, Grants & Advocacy",
    d: "Dedicated navigators help families access services, benefits, and the right specialists.",
  },
  {
    lbl: "Adult Transition",
    t: "Employment & Independent Living",
    d: "Supporting autistic adults as they move into work, education, and community life.",
  },
  {
    lbl: "Mental Health",
    t: "Trauma-Informed Counselling",
    d: "Affordable, autism-adapted counselling for individuals and family members.",
  },
];

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        headRef.current,
        { y: 45, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%", once: true },
        }
      );

      // Featured card slides in from left
      gsap.fromTo(
        featuredRef.current,
        { x: -60, opacity: 0, scale: 0.97 },
        {
          x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: featuredRef.current, start: "top 80%", once: true },
        }
      );

      // Stack cards slide in from right, staggered
      if (stackRef.current) {
        gsap.fromTo(
          Array.from(stackRef.current.children),
          { x: 50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.13,
            scrollTrigger: { trigger: stackRef.current, start: "top 78%", once: true },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="programs"
      style={{ padding: "6rem 0", background: "var(--bg-surface)" }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <div ref={headRef} style={{ marginBottom: "2.75rem" }}>
          <span
            style={{
              display: "inline-flex",
              fontFamily: "var(--font-ui)",
              fontSize: "0.675rem",
              fontWeight: 600,
              letterSpacing: "0.09em",
              textTransform: "uppercase" as const,
              color: "var(--color-primary-600)",
              background: "rgba(20,86,240,0.06)",
              border: "1px solid rgba(20,86,240,0.12)",
              padding: "0.3rem 0.9rem",
              borderRadius: "var(--r-pill)",
              marginBottom: "1.25rem",
            }}
          >
            Programs
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem, 3.2vw, 2.75rem)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: "var(--col-text00)",
              lineHeight: 1.1,
            }}
          >
            Built for real lives.
          </h2>
        </div>

        {/* Content grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]"
          style={{
            gap: "1.25rem",
          }}
        >
          {/* Featured card */}
          <div
            ref={featuredRef}
            style={{
              background: "var(--brand-6)",
              borderRadius: "var(--r-3xl)",
              padding: "2.75rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 400,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* decorative circle */}
            <div
              style={{
                position: "absolute",
                bottom: -70,
                right: -70,
                width: 240,
                height: 240,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.07)",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />
            <div
              style={{
                position: "absolute",
                top: -40,
                left: -40,
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <span
                style={{
                  display: "inline-flex",
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase" as const,
                  color: "rgba(255,255,255,0.75)",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "0.3rem 0.9rem",
                  borderRadius: "var(--r-pill)",
                  marginBottom: "1.5rem",
                }}
              >
                Early Intervention
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                  fontWeight: 500,
                  color: "#fff",
                  margin: "0 0 1.1rem",
                  lineHeight: 1.2,
                }}
              >
                Early Childhood
                <br />
                Autism Support
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.9rem",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.8,
                  maxWidth: 360,
                }}
              >
                Tailored support for children under 8, combining speech therapy,
                occupational therapy, and family coaching in one integrated
                program.
              </p>
            </div>

            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-ui)",
                fontSize: "0.84rem",
                fontWeight: 500,
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                border: "1.5px solid rgba(255,255,255,0.28)",
                borderRadius: "var(--r-sm)",
                padding: "10px 20px",
                width: "fit-content",
                transition: "all 0.2s ease",
                textDecoration: "none",
                position: "relative",
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(255,255,255,0.25)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(255,255,255,0.15)";
                el.style.transform = "translateY(0)";
              }}
            >
              Learn More
              <RiArrowRightLine size={14} aria-hidden="true" />
            </a>
          </div>

          {/* Stack */}
          <div ref={stackRef} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {STACK_PROGRAMS.map((prog) => (
              <div
                key={prog.lbl}
                style={{
                  background: "#fff",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--r-2xl)",
                  padding: "1.5rem 1.75rem",
                  boxShadow: "var(--shadow-card)",
                  transition: "all 0.22s ease",
                  cursor: "pointer",
                  flex: 1,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateX(6px)";
                  el.style.borderColor = "rgba(20,86,240,0.2)";
                  el.style.boxShadow = "var(--shadow-elevated)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateX(0)";
                  el.style.borderColor = "var(--border-light)";
                  el.style.boxShadow = "var(--shadow-card)";
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.63rem",
                    fontWeight: 600,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase" as const,
                    color: "var(--brand-6)",
                    display: "block",
                    marginBottom: "0.45rem",
                  }}
                >
                  {prog.lbl}
                </span>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "var(--col-text00)",
                    marginBottom: "0.5rem",
                    lineHeight: 1.3,
                  }}
                >
                  {prog.t}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.83rem",
                    fontWeight: 400,
                    color: "var(--col-text04)",
                    lineHeight: 1.75,
                  }}
                >
                  {prog.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
