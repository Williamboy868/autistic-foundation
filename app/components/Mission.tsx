"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiShieldUserLine, RiGroupLine, RiMegaphoneLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    lbl: "Safe Health Care",
    title: "Sensory-Informed Medical Support",
    body: "We partner with clinics trained in autism-informed care — where appointments move at your pace and your child is never rushed.",
    icon: RiShieldUserLine,
    accent: "var(--brand-6)",
  },
  {
    lbl: "Community",
    title: "Families Who Understand",
    body: "Our peer circles, family camps, and online spaces connect people who truly understand. No explaining needed. Just belonging.",
    icon: RiGroupLine,
    accent: "var(--color-primary-600)",
  },
  {
    lbl: "Advocacy",
    title: "Fighting for the Right Systems",
    body: "We lobby for inclusive education, workplace accommodations, and health policies — because individual support alone is never enough.",
    icon: RiMegaphoneLine,
    accent: "var(--color-primary-700)",
  },
];

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingGroupRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header reveal
      gsap.fromTo(
        headingGroupRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingGroupRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Cards stagger
      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.children);
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Quote slide-in
      gsap.fromTo(
        quoteRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="mission"
      style={{ padding: "6rem 0", background: "#fff" }}
    >
      <div
        style={{ maxWidth: 1160, margin: "0 auto", padding: "0 1.5rem" }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div ref={headingGroupRef}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
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
              Our Mission
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
              Understanding is the
              <br />
              first form of care.
            </h2>
          </div>

          <p
            ref={descRef}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.95rem",
              fontWeight: 400,
              color: "var(--col-text04)",
              lineHeight: 1.8,
              maxWidth: 380,
            }}
          >
            For too long, autistic individuals navigated a world not built for
            them. Romeo Foundation exists to change that — one family, one
            program, one breakthrough at a time.
          </p>
        </div>

        {/* Pillar cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{
            gap: "1.25rem",
            marginBottom: "1.25rem",
          }}
        >
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.lbl}
                style={{
                  background: "#fff",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--r-2xl)",
                  padding: "2rem",
                  boxShadow: "var(--shadow-card)",
                  transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(-5px)";
                  el.style.boxShadow = "var(--shadow-elevated)";
                  el.style.borderColor = "rgba(20,86,240,0.2)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "var(--shadow-card)";
                  el.style.borderColor = "var(--border-light)";
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "var(--r-md)",
                    background: "rgba(20,86,240,0.07)",
                    color: p.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <Icon size={22} aria-hidden="true" />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase" as const,
                    color: p.accent,
                    display: "block",
                    marginBottom: "0.6rem",
                  }}
                >
                  {p.lbl}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    color: "var(--col-text00)",
                    marginBottom: "0.85rem",
                    lineHeight: 1.3,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    color: "var(--col-text04)",
                    lineHeight: 1.8,
                  }}
                >
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Wide quote card */}
        <div
          ref={quoteRef}
          style={{
            background: "rgba(20,86,240,0.04)",
            border: "1px solid rgba(20,86,240,0.1)",
            borderRadius: "var(--r-2xl)",
            padding: "2.25rem 2.75rem",
            display: "flex",
            alignItems: "center",
            gap: "3rem",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontStyle: "italic",
              fontSize: "1.2rem",
              fontWeight: 400,
              color: "var(--brand-3)",
              lineHeight: 1.75,
              flex: 1,
              minWidth: 280,
            }}
          >
            &ldquo;Autism is not a processing error — it&apos;s a different
            operating system. Our work is building a world that runs on
            both.&rdquo;
          </p>
          <div style={{ flexShrink: 0, textAlign: "right" }}>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontWeight: 600,
                fontSize: "0.84rem",
                color: "var(--color-primary-700)",
              }}
            >
            Romeo Owusu Ansah
            </div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.72rem",
                color: "var(--color-primary-500)",
                marginTop: "0.2rem",
              }}
            >
              Founder &amp; Chief Advocate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
