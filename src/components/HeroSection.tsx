"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(dateRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 0.7,
      });

      gsap.from(scrollIndicatorRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.8,
        ease: "power2.out",
        delay: 1.2,
      });

      // Parallax on scroll
      gsap.to(titleRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-cream"
      style={{
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Main content container with top/bottom padding to avoid overlapping chandelier/palace */}
      <div className="relative z-10 text-center px-6 max-w-xl mx-auto flex flex-col items-center justify-center pt-[14vh] pb-[32vh] sm:pt-[16vh] sm:pb-[34vh] h-full">
        <p
          className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold-dark/70 mb-3"
          style={{ fontFamily: "var(--font-body)" }}
        >
          لەگەڵ خێزانەکانیاندا
        </p>

        <h1
          ref={titleRef}
          className="mb-4 flex flex-col items-center justify-center leading-none"
        >
          <span className="block font-script text-7xl sm:text-8xl md:text-9xl text-charcoal select-none">
            دییە
          </span>
          <span className="block font-script text-3xl sm:text-4xl md:text-5xl text-gold-dark my-1 select-none">
            و
          </span>
          <span className="block font-script text-7xl sm:text-8xl md:text-9xl text-charcoal select-none">
            کاردۆ
          </span>
        </h1>

        <div className="w-12 h-[1px] bg-gold/30 my-4" />

        <p
          ref={dateRef}
          className="text-base sm:text-lg md:text-xl text-charcoal-light tracking-wide font-light"
          style={{ fontFamily: "var(--font-elegant)" }}
        >
          پێنجشەممە، ٩ی تەممووزی ٢٠٢٦
        </p>

        <p
          className="mt-1 text-[10px] sm:text-xs text-charcoal-light/70 tracking-widest uppercase font-medium"
          style={{ fontFamily: "var(--font-body)" }}
        >
          دەستپێدەکات لە کاتژمێر ٨ی شەو
        </p>
        <p
          className="mt-1 text-[10px] sm:text-xs text-gold-dark/80 tracking-widest uppercase font-semibold"
          style={{ fontFamily: "var(--font-body)" }}
        >
          سلێمانی
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
      >
        <p
          className="text-[10px] tracking-[0.25em] uppercase text-gold-dark/40"
          style={{ fontFamily: "var(--font-body)" }}
        >
          بخشێنە
        </p>
        <div className="w-[1px] h-6 bg-gradient-to-b from-gold/40 to-transparent relative">
          <div
            className="absolute top-0 w-full h-2 bg-gold/60"
            style={{
              animation: "scrollDown 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDown {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(16px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
