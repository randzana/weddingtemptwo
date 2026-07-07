"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, var(--color-cream) 0%, var(--color-cream-dark) 60%, var(--color-gold-light) 100%)
        `,
      }}
    >
      <div ref={contentRef} className="text-center px-6 max-w-3xl mx-auto">
        {/* Monogram */}
        <div className="mb-8">
          <span
            className="text-5xl sm:text-6xl text-shimmer"
            style={{ fontFamily: "var(--font-display)" }}
          >
            D
          </span>
          <span
            className="text-3xl sm:text-4xl text-gold mx-2"
            style={{ fontFamily: "var(--font-elegant)", fontStyle: "italic" }}
          >
            &
          </span>
          <span
            className="text-5xl sm:text-6xl text-shimmer"
            style={{ fontFamily: "var(--font-display)" }}
          >
            K
          </span>
        </div>

        <p
          className="text-lg sm:text-xl text-charcoal-light mb-2"
          style={{ fontFamily: "var(--font-elegant)", fontWeight: 300 }}
        >
          &ldquo;گیانمان لە هەرچی دروستکرابێت، هی ئەو و هی من یەکن.&rdquo;
        </p>
        <p
          className="text-sm text-charcoal-light/50 mb-10"
          style={{ fontFamily: "var(--font-body)" }}
        >
          — ئێمیلی برۆنتی
        </p>

        <div className="ornamental-divider !my-6">
          <span className="text-gold text-sm">✦</span>
        </div>

        <p
          className="text-sm text-charcoal-light/60 tracking-wide"
          style={{ fontFamily: "var(--font-body)" }}
        >
          ٩ی تەممووزی ٢٠٢٦ · سلێمانی
        </p>

        <p
          className="text-xs text-charcoal-light/40 mt-6 tracking-wide"
          style={{ fontFamily: "var(--font-body)" }}
        >
          بە خۆشەویستییەوە ♥ دروستکراوە بۆ دییە و کاردۆ
        </p>

        {/* Floating hearts decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="floating-heart"
              style={{
                left: `${10 + i * 12}%`,
                animationDuration: `${6 + Math.random() * 8}s`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${12 + Math.random() * 16}px`,
              }}
            >
              ♥
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
