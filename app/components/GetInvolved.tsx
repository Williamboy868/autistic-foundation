"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiHeartLine, RiTimeLine, RiBuildingLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    lbl: "Donate",
    t: "Fund What Matters",
    b: "Your donation directly funds diagnostic sessions, family navigators, and scholarship programs.",
    a: "Donate Now",
    icon: RiHeartLine,
    accent: "var(--brand-6)",
    href: "https://wa.me/233592945680?text=Hi,%20I%20want%20to%20donate%20to%20Romeo%20Foundation.",
  },
  {
    lbl: "Volunteer",
    t: "Give Your Time",
    b: "We need transport volunteers, event organisers, peer mentors, and professionals willing to donate expertise.",
    a: "Join as Volunteer",
    icon: RiTimeLine,
    accent: "var(--color-primary-600)",
    href: "https://wa.me/233592945680?text=Hi,%20I%20am%20interested%20in%20volunteering.",
  },
  {
    lbl: "Partner",
    t: "Institutional Partnership",
    b: "Clinics, schools, and corporations — partner with us to build autism-informed environments with lasting impact.",
    a: "Become a Partner",
    icon: RiBuildingLine,
    accent: "var(--color-primary-700)",
    href: "https://wa.me/233592945680?text=Hi,%20we%20want%20to%20partner%20with%20Romeo%20Foundation.",
  },
];

export default function GetInvolved() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      if (cardsRef.current) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          { y: 65, opacity: 0, scale: 0.94 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out",
            stagger: 0.14,
            scrollTrigger: { trigger: cardsRef.current, start: "top 78%", once: true },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="get-involved"
      style={{ padding: "6rem 0", background: "var(--bg-surface)" }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <div ref={headRef} style={{ textAlign: "center", marginBottom: "3rem" }}>
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
            Get Involved
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
            There is a place for you in this.
          </h2>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap: "1.25rem",
          }}
        >
          {CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.lbl}
                style={{
                  background: "#fff",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--r-2xl)",
                  padding: "2.25rem",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "var(--shadow-card)",
                  transition: "all 0.25s ease",
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
                    width: 50,
                    height: 50,
                    borderRadius: "var(--r-md)",
                    background: "rgba(20,86,240,0.07)",
                    color: c.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <Icon size={24} aria-hidden="true" />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.64rem",
                    fontWeight: 600,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase" as const,
                    color: c.accent,
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  {c.lbl}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    color: "var(--col-text00)",
                    marginBottom: "0.9rem",
                    lineHeight: 1.3,
                  }}
                >
                  {c.t}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    color: "var(--col-text04)",
                    lineHeight: 1.8,
                    flexGrow: 1,
                    marginBottom: "1.75rem",
                  }}
                >
                  {c.b}
                </p>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.84rem",
                    fontWeight: 500,
                    background: "transparent",
                    color: "var(--col-text00)",
                    border: "1.5px solid var(--border-gray)",
                    borderRadius: "var(--r-sm)",
                    padding: "10px 20px",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = c.accent;
                    el.style.color = c.accent;
                    el.style.background = "rgba(20,86,240,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "var(--border-gray)";
                    el.style.color = "var(--col-text00)";
                    el.style.background = "transparent";
                  }}
                >
                  {c.a}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
