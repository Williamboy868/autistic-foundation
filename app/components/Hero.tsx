"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiArrowRightLine, RiPlayCircleLine } from "react-icons/ri";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { n: "450+", l: "Families Supported" },
  { n: "12", l: "Partner Clinics" },
  { n: "96%", l: "Satisfaction Rate" },
  { n: "100+", l: "Volunteers" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const rightBotRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Floating orbs
      gsap.to(orb1Ref.current, {
        y: -30,
        x: 15,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(orb2Ref.current, {
        y: 25,
        x: -12,
        duration: 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });

      // Main hero TL — staggered reveal
      const tl = gsap.timeline({ delay: 0.55 });

      tl.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: "power3.out" }
      )
        .fromTo(
          // Split each word of heading for stagger
          headingRef.current?.querySelectorAll(".word") ?? [],
          { y: 60, opacity: 0, skewY: 4 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 0.75,
            ease: "power4.out",
            stagger: 0.07,
          },
          "-=0.3"
        )
        .fromTo(
          subRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          actionsRef.current?.children
            ? Array.from(actionsRef.current.children)
            : [],
          { y: 16, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.6)",
            stagger: 0.1,
          },
          "-=0.35"
        )
        .fromTo(
          statsRef.current?.children
            ? Array.from(statsRef.current.children)
            : [],
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.08 },
          "-=0.25"
        )
        .fromTo(
          rightTopRef.current,
          { x: 40, opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
          0.3
        )
        .fromTo(
          rightBotRef.current,
          { x: 40, opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
          0.5
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: "100vh",
        background: "#fff",
        padding: "7rem 0 5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative orbs */}
      <div
        ref={orb1Ref}
        style={{
          position: "absolute",
          top: "5%",
          right: "0%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(20,86,240,0.07) 0%, transparent 72%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      <div
        ref={orb2Ref}
        style={{
          position: "absolute",
          bottom: "8%",
          left: "-2%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(61,174,255,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Grid dot pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(20,86,240,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 80%)",
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
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]"
          style={{
            gap: "1.25rem",
            alignItems: "stretch",
          }}
        >
          <div
            className="lg:row-span-2"
            style={{
              background: "#fff",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--r-3xl)",
              padding: "3rem 2rem 2.5rem",
              boxShadow: "var(--shadow-card)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Badge */}
              <div ref={badgeRef} style={{ marginBottom: "2rem" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.675rem",
                    fontWeight: 600,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    color: "var(--color-primary-600)",
                    background: "rgba(20,86,240,0.06)",
                    border: "1px solid rgba(20,86,240,0.12)",
                    padding: "0.3rem 0.9rem",
                    borderRadius: "var(--r-pill)",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--color-primary-500)",
                      display: "block",
                      animation: "pulse 2.2s ease-out infinite",
                    }}
                  />
                  Romeo Foundation · Est. 2025
                </span>
              </div>

              {/* Heading */}
              <h1
                ref={headingRef}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.75rem, 4.8vw, 4.5rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  color: "var(--col-text00)",
                  marginBottom: "1.75rem",
                }}
              >
                <span className="word" style={{ display: "inline-block" }}>
                  Every
                </span>{" "}
                <span className="word" style={{ display: "inline-block" }}>
                  mind
                </span>
                <br />
                <span
                  className="word"
                  style={{
                    display: "inline-block",
                    color: "var(--brand-6)",
                  }}
                >
                  belongs
                </span>{" "}
                <span className="word" style={{ display: "inline-block" }}>
                  here.
                </span>
              </h1>

              {/* Sub */}
              <p
                ref={subRef}
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "1.05rem",
                  fontWeight: 400,
                  color: "var(--col-text04)",
                  lineHeight: 1.75,
                  maxWidth: 420,
                  marginBottom: "2.5rem",
                }}
              >
                Supporting autistic individuals and their families through
                compassionate health care, community, and advocacy — because
                belonging is a right, not a privilege.
              </p>

              {/* Actions */}
              <div
                ref={actionsRef}
                style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
              >
                <a
                  href="#mission"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    background: "var(--dark-surface)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "var(--r-sm)",
                    padding: "13px 24px",
                    cursor: "pointer",
                    transition: "all 0.22s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "var(--brand-6)";
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = "var(--shadow-brand)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "var(--dark-surface)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  Discover Our Mission
                  <RiArrowRightLine size={15} aria-hidden="true" />
                </a>

                <a
                  href="#gallery"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    background: "transparent",
                    color: "var(--col-text00)",
                    border: "1.5px solid var(--border-gray)",
                    borderRadius: "var(--r-sm)",
                    padding: "12px 22px",
                    cursor: "pointer",
                    transition: "all 0.22s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--color-primary-500)";
                    el.style.color = "var(--brand-6)";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border-gray)";
                    el.style.color = "var(--col-text00)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <RiPlayCircleLine size={15} aria-hidden="true" />
                  View Gallery
                </a>
              </div>
            </div>

            {/* Stats bar */}
            <div
              ref={statsRef}
              style={{
                display: "flex",
                gap: "2.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--border-light)",
                marginTop: "3rem",
                flexWrap: "wrap",
              }}
            >
              {STATS.map(({ n, l }) => (
                <div key={l}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.65rem",
                      fontWeight: 600,
                      color: "var(--brand-6)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {n}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.7rem",
                      fontWeight: 400,
                      color: "var(--col-text-mute)",
                      marginTop: "0.3rem",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT TOP: Featured image */}
          <div
            ref={rightTopRef}
            style={{
              background: "#fff",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--r-3xl)",
              boxShadow: "var(--shadow-card)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&auto=format&fit=crop&q=80"
              alt="A family sharing a joyful moment together"
              width={800}
              height={480}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              priority
            />
            {/* Floating pill badge */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--r-xl)",
                padding: "0.7rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--brand-6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: -4,
                    borderRadius: "50%",
                    border: "2px solid rgba(20,86,240,0.3)",
                    animation: "pulse 2.2s ease-out infinite",
                  }}
                />
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontWeight: 600,
                    fontSize: "0.79rem",
                    color: "var(--col-text00)",
                  }}
                >
                  Active Community
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.67rem",
                    color: "var(--col-text-mute)",
                    marginTop: "0.1rem",
                  }}
                >
                  In 12 cities across Ghana
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT BOTTOM: Pull quote */}
          <div
            ref={rightBotRef}
            style={{
              background: "var(--dark-surface)",
              borderRadius: "var(--r-3xl)",
              padding: "2rem",
              border: "1px solid rgba(255,255,255,0.04)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 180,
            }}
          >
            <svg
              width="24"
              height="20"
              viewBox="0 0 32 24"
              fill="rgba(96,165,250,0.45)"
              aria-hidden="true"
            >
              <path d="M0 24V14.4C0 10.88 0.8 7.88 2.4 5.4C4 2.92 6.48 1.08 9.84 0L11.52 2.64C9.04 3.56 7.2 4.88 6 6.6C4.88 8.32 4.32 10.24 4.32 12.36H8.16V24H0ZM20.16 24V14.4C20.16 10.88 20.96 7.88 22.56 5.4C24.16 2.92 26.64 1.08 30 0L31.68 2.64C29.2 3.56 27.36 4.88 26.16 6.6C25.04 8.32 24.48 10.24 24.48 12.36H28.32V24H20.16Z" />
            </svg>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontStyle: "italic",
                fontSize: "0.97rem",
                fontWeight: 300,
                color: "#fff",
                lineHeight: 1.85,
                margin: "1rem 0",
              }}
            >
              Before Romeo Foundation, every appointment felt like a battle. Now
              my son walks in with confidence.
            </p>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  color: "var(--color-primary-200)",
                }}
              >
                Adwoa M.
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.68rem",
                  color: "var(--color-primary-light)",
                  marginTop: "0.15rem",
                }}
              >
                Mother of a 9-year-old, Kumasi
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for pulse */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
