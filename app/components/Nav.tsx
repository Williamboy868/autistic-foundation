"use client";

import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RiHeartPulseLine } from "react-icons/ri";

const NAV_LINKS = ["Mission", "Programs", "Gallery", "Research", "Get Involved"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entry animation
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    )
      .fromTo(
        logoRef.current,
        { x: -10, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        linksRef.current?.children ? Array.from(linksRef.current.children) : [],
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.06 },
        "-=0.35"
      )
      .fromTo(
        ctaRef.current,
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.8)" },
        "-=0.2"
      );
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-light)" : "1px solid transparent",
        boxShadow: scrolled ? "rgba(0,0,0,0.04) 0px 1px 24px" : "none",
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
      aria-label="Main navigation"
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}
      >
        {/* Logo */}
        <a
          ref={logoRef}
          href="#"
          style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}
          aria-label="Romeo Foundation home"
        >
          <div
            style={{
              width: 36,
              height: 36,
              background: "var(--brand-6)",
              borderRadius: "var(--r-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <RiHeartPulseLine size={18} color="#fff" aria-hidden="true" />
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "var(--col-text00)",
              letterSpacing: "-0.02em",
            }}
          >
            Romeo
            <span style={{ color: "var(--brand-6)" }}>.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div
          ref={linksRef}
          className="hidden md:flex"
          style={{ alignItems: "center", gap: "2.25rem" }}
          role="list"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              role="listitem"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.84rem",
                fontWeight: 500,
                color: "var(--col-text04)",
                letterSpacing: "0.01em",
                transition: "color 0.18s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--brand-6)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--col-text04)")
              }
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="https://wa.me/233592945680?text=Hi!%20I%20would%20like%20to%20make%20a%20donation%20to%20Romeo%20Foundation."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            fontFamily: "var(--font-ui)",
            fontSize: "0.84rem",
            fontWeight: 600,
            background: "var(--dark-surface)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--r-sm)",
            padding: "10px 22px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            letterSpacing: "0.01em",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = "var(--brand-6)";
            (e.target as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = "var(--dark-surface)";
            (e.target as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          Donate Now
        </a>
      </div>
    </nav>
  );
}
