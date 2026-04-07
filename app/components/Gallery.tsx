"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Each image with explicit grid placement
const IMAGES = [
  {
    src: "/autistic1.jpg",
    alt: "Romeo Foundation community gathering",
    class: "col-span-1 md:col-span-2 md:row-span-2 min-h-[300px]",
  },
  {
    src: "/autistic2.jpg",
    alt: "Supportive care and connection",
    class: "col-span-1 min-h-[220px]",
  },
  {
    src: "/autistic3.jpg",
    alt: "Sensory-informed spaces",
    class: "col-span-1 min-h-[260px]",
  },
  {
    src: "/autistic4.jpg",
    alt: "Family navigation sessions",
    class: "col-span-1 md:col-span-3 min-h-[280px]",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        headRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%", once: true },
        }
      );

      if (gridRef.current) {
        const items = Array.from(gridRef.current.querySelectorAll(".gal-item"));

        items.forEach((item) => {
          // Emil Kowalski: blur + scale + clip-path reveal
          gsap.fromTo(
            item,
            {
              y: 60,
              opacity: 0,
              scale: 0.96,
              filter: "blur(10px)",
              clipPath: "inset(8% 8% 8% 8% round 24px)",
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              clipPath: "inset(0% 0% 0% 0% round 24px)",
              duration: 1.3,
              ease: "power4.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                once: true,
              },
            }
          );

          // Scroll-driven inner parallax
          const inner = item.querySelector(".gal-inner") as HTMLElement | null;
          if (inner) {
            gsap.fromTo(
              inner,
              { yPercent: -6 },
              {
                yPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: item,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.4,
                },
              }
            );
          }
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={{ padding: "6rem 0", background: "#fff" }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <div
          ref={headRef}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-flex",
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
                marginBottom: "1.25rem",
              }}
            >
              Gallery
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
              Moments of connection.
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.88rem",
              fontWeight: 400,
              color: "var(--col-text04)",
              maxWidth: 320,
              lineHeight: 1.75,
            }}
          >
            A glimpse into the communities, safe spaces, and moments we create
            together at Romeo Foundation.
          </p>
        </div>

        {/* Bento Grid — 3 columns */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap: "1rem",
            gridAutoRows: "minmax(220px, auto)",
          }}
        >
          {IMAGES.map((img, i) => (
            <div
              key={i}
              className={`gal-item ${img.class}`}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 20,
                background: "var(--bg-surface)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* Inner wrapper grows slightly larger for parallax headroom */}
              <div
                className="gal-inner"
                style={{
                  position: "absolute",
                  inset: 0,
                  top: "-8%",
                  bottom: "-8%",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  unoptimized
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Subtle dark gradient at bottom for depth */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(24,30,37,0.18) 0%, transparent 50%)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
