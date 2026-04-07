"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Impact from "./components/Impact";
import Programs from "./components/Programs";
import Gallery from "./components/Gallery";
import GetInvolved from "./components/GetInvolved";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Smooth scroll with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // Global scroll-progress indicator
  useGSAP(() => {
    gsap.to(".scroll-progress", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  });

  return (
    <>
      {/* Scroll progress bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          zIndex: 200,
          background: "var(--border-light)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <div
          className="scroll-progress"
          style={{
            height: "100%",
            background: "var(--brand-6)",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>

      <Nav />
      <main id="main-content">
        <Hero />
        <Mission />
        <Impact />
        <Programs />
        <Gallery />
        <GetInvolved />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
