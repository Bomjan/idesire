"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function HeroSection() {
  const textRef  = useRef<HTMLDivElement>(null);
  const cardRef  = useRef<HTMLDivElement>(null);
  const hintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-logo",    { opacity: 0, y: 16, duration: 0.6 })
        .from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.7 }, "-=0.3")
        .from(".hero-h1",      { opacity: 0, y: 56, duration: 0.9 }, "-=0.5")
        .from(".hero-pills",   { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
        .from(".hero-ctas",    { opacity: 0, y: 18, duration: 0.6 }, "-=0.4")
        .from(".hero-hints",   { opacity: 0,         duration: 0.5 }, "-=0.3")
        .from(".hero-card",    { opacity: 0, x: 24, duration: 0.8, ease: "power2.out" }, "-=0.6");

      // Scroll fade
      ScrollTrigger.create({
        trigger: "#hero-section",
        start: "top top",
        end: () => window.innerHeight * 0.38,
        scrub: 0.5,
        onUpdate: (self) => {
          const p = 1 - self.progress;
          if (textRef.current)  textRef.current.style.opacity  = String(p);
          if (cardRef.current)  cardRef.current.style.opacity  = String(Math.max(p * 1.5 - 0.5, 0));
          if (hintsRef.current) hintsRef.current.style.opacity = String(Math.max(p * 1.5 - 0.5, 0));
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    /* Mobile: 100vh (no scroll waste), Desktop: 220vh (scroll-fade effect) */
    <section id="hero-section" className="relative bg-black min-h-screen md:min-h-[220vh]">

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Canvas */}
        <div className="absolute inset-0 z-0"><HeroCanvas /></div>

        {/* Mobile overlay */}
        <div className="absolute inset-0 z-[1] pointer-events-none lg:hidden"
          style={{ background: "rgba(0,0,0,0.62)" }} />

        {/* Desktop left vignette */}
        <div className="absolute inset-0 z-[1] pointer-events-none hidden lg:block" style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.60) 24%, rgba(0,0,0,0.18) 40%, transparent 52%)",
        }} />

        {/* ── Text ── */}
        <div
          ref={textRef}
          className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 h-full flex items-center pt-14
            justify-center md:justify-start text-center md:text-left"
        >
          <div className="w-full max-w-[90%] sm:max-w-[75%] lg:max-w-[46%]">

            {/* Apple icon */}
            <div className="hero-logo mb-5 sm:mb-7 flex justify-center md:justify-start">
              <svg viewBox="0 0 814 1000" width="24" height="30" aria-hidden="true"
                style={{ fill: "rgba(255,255,255,0.55)" }}>
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1-67.4 0-85.2-39.3-164.5-39.3-76.5 0-103.7 40.8-165.9 40.8-62 0-105-57.8-155.5-127.4C46.7 790.7 0 663 0 541.8c0-207.3 135.3-316.9 269-316.9 71.2 0 130.4 46.3 174.3 46.3 42.7 0 109.6-49 192.7-49 67.3 0 119.1 10 134.6 118.7z"/>
                <path d="M554.1 88.4C587.5 48.3 608.5 2.2 608.5 0c0-.7-.7-1.3-2.2-1.3-4.5 0-72.3 35.4-106.3 75.9-28 31.2-56.5 85.6-56.5 129.6 0 2.6.6 4.5 2.6 4.5 5.8 0 77.4-32.5 107.9-120.3z"/>
              </svg>
            </div>

            {/* Eyebrow */}
            <p className="hero-eyebrow font-syne text-[10px] font-semibold text-apple-blue uppercase tracking-[0.32em] mb-4 sm:mb-5">
              Bhutan&apos;s #1 Apple Authorised Store
            </p>

            {/* Headline */}
            <h1 className="hero-h1 font-bebas leading-[0.90] mb-6 sm:mb-8"
              style={{ fontSize: "clamp(3rem, 13vw, 9rem)" }}>
              <span className="text-white block">EXPERIENCE</span>
              <span className="block" style={{
                background: "linear-gradient(140deg, #ffffff 0%, #c8c8cc 35%, #ffffff 55%, #a8a8ad 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>APPLE.</span>
              <span className="text-white/22 block">IN BHUTAN.</span>
            </h1>

            {/* Pills — hidden on small mobile */}
            <div className="hero-pills hidden sm:flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
              {["Genuine Devices", "Expert Service", "Nationwide Delivery"].map((label) => (
                <span key={label}
                  className="font-syne text-[10px] text-white/50 border border-white/12 px-3 py-1.5 rounded-full tracking-wide">
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-ctas flex flex-col sm:flex-row gap-3 items-center md:items-start">
              <Link href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-black text-[11px] font-bold uppercase tracking-widest px-7 py-3.5 hover:bg-apple-gray active:scale-[0.97] transition-all duration-150 font-syne">
                Shop Now
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-white/20 text-white text-[11px] font-semibold uppercase tracking-widest px-7 py-3.5 hover:border-white/50 active:scale-[0.97] transition-all duration-150 font-syne">
                Our Story
              </Link>
            </div>

            {/* Mobile-only pills below CTAs */}
            <div className="hero-pills flex sm:hidden flex-wrap gap-2 mt-6 justify-center">
              {["Genuine Devices", "Expert Service", "Nationwide Delivery"].map((label) => (
                <span key={label}
                  className="font-syne text-[9px] text-white/40 border border-white/10 px-3 py-1 rounded-full tracking-wide">
                  {label}
                </span>
              ))}
            </div>

          </div>
        </div>

        {/* ── Product card — desktop only ── */}
        <div ref={cardRef}
          className="hero-card hidden lg:block absolute right-14 top-1/2 -translate-y-1/2 z-10"
          style={{ width: 272 }}>
          <div style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(28px) saturate(160%)",
            WebkitBackdropFilter: "blur(28px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 22,
            padding: "30px 28px 26px",
          }}>
            <div className="flex items-center gap-2 mb-5">
              <span className="font-syne text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                style={{ background: "rgba(0,113,227,0.75)", color: "#fff" }}>New</span>
              <span className="font-syne text-[9px] text-white/30 uppercase tracking-widest">2025</span>
            </div>
            <div className="font-bebas text-white leading-none mb-1" style={{ fontSize: 40 }}>
              iPhone 17 Pro Max
            </div>
            <p className="font-syne text-white/40 text-[12px] leading-relaxed mb-5">
              Titanium. A19 Pro chip.<br />Thinnest bezels ever.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {["6.9″ ProMotion", "A19 Pro", "4K 120fps"].map(s => (
                <span key={s}
                  className="font-syne text-[9px] text-white/35 border border-white/10 px-2 py-1 rounded-full tracking-wide">
                  {s}
                </span>
              ))}
            </div>
            <div className="border-t border-white/8 mb-5" />
            <div className="font-syne text-white/45 text-[11px] mb-1">Starting from</div>
            <div className="font-bebas text-white text-[28px] leading-none mb-5">Nu. 1,59,900</div>
            <Link href="/products"
              className="flex items-center justify-between w-full font-syne text-[10px] font-semibold uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-150 group">
              <span>Explore iPhone 17</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="group-hover:translate-x-0.5 transition-transform duration-150">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Scroll hint — desktop only */}
        <div ref={hintsRef} className="hero-hints hidden md:flex absolute bottom-8 left-8 z-10 items-center gap-3">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
            <span className="font-syne text-[9px] text-white/22 tracking-[0.35em] uppercase">Scroll</span>
          </div>
        </div>

        {/* Swipe nudge — mobile only */}
        <div className="md:hidden absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round" className="text-white/20 animate-bounce">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span className="font-syne text-[9px] text-white/20 tracking-[0.35em] uppercase">Explore</span>
        </div>

      </div>
    </section>
  );
}
