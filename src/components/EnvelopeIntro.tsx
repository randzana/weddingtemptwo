"use client";

import { useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import ParticleField from "./ParticleField";

interface EnvelopeIntroProps {
  onComplete: () => void;
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    if (isAnimating.current || isOpen) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        setIsOpen(true);
        // Fade the CTA text back in to invite the user to enter the site
        gsap.to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });

    // Step 1: Hide CTA text
    tl.to(ctaRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: "power2.in",
    });

    // Step 2: Crack and fade the wax seal
    tl.to(
      sealRef.current,
      {
        scale: 1.3,
        opacity: 0,
        rotation: 15,
        duration: 0.5,
        ease: "back.in(2)",
      },
      "-=0.1"
    );

    // Step 3: Open the flap (3D rotation)
    tl.to(
      flapRef.current,
      {
        rotateX: -180,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.2"
    );

    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const slideY = isMobile ? -130 : -190;
    const targetScale = isMobile ? 1.08 : 1.12;

    // Step 4: Slide the letter card up out of the envelope and scale it up for readability
    tl.to(
      letterRef.current,
      {
        y: slideY,
        scale: targetScale,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.3"
    );

    // Bring letter card to front of the envelope body
    tl.set(letterRef.current, { zIndex: 10 });
  }, [isOpen]);

  const handleEnterSite = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    // Fade out the entering CTA text first
    gsap.to(ctaRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.2,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Step 5: Scale up the whole envelope + letter to fill screen
    tl.to(
      envelopeRef.current,
      {
        scale: 6,
        opacity: 0,
        duration: 1.0,
        ease: "power2.in",
      },
    );

    // Step 6: Fade out the entire envelope screen
    tl.to(
      screenRef.current,
      {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      },
      "-=0.6"
    );
  }, [onComplete]);

  // Subtle floating animation on mount
  const handleEnvelopeMount = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    envelopeRef.current = el;
    gsap.to(el, {
      y: -10,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <div ref={screenRef} className="envelope-screen">
      <ParticleField />

      {/* Decorative text above envelope */}
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2 text-center z-10 sm:top-[15%]">
        <p
          className="text-sm tracking-[0.35em] uppercase text-gold-dark/70 mb-3"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          بانگهێشت کراون
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl text-charcoal font-light leading-tight"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          دییە{" "}
          <span className="text-shimmer text-3xl sm:text-4xl md:text-5xl italic">
            و
          </span>{" "}
          کاردۆ
        </h1>
      </div>

      {/* The Envelope */}
      <div
        ref={handleEnvelopeMount}
        className="envelope-wrapper z-10"
        onClick={isOpen ? handleEnterSite : handleOpen}
        role="button"
        tabIndex={0}
        aria-label={isOpen ? "چوونە ناوەوەی سایتی دەستنیشانکردن" : "کردنەوەی بانگهێشتنامەی دەستنیشانکردن"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            if (isOpen) {
              handleEnterSite();
            } else {
              handleOpen();
            }
          }
        }}
      >
        {/* Envelope liner (inside visible pattern) */}
        <div className="envelope-liner" />

        {/* Letter Card (sits inside the envelope) */}
        <div ref={letterRef} className="letter-card">
          {/* Gold Seal Header Emblem */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 mb-1.5 rounded-full overflow-hidden border border-gold/30 shadow-[0_2px_8px_rgba(201,168,76,0.15)] relative flex items-center justify-center bg-white/80">
            <img src="/wax-seal.png" alt="Royal Seal" className="w-full h-full object-cover scale-105" />
          </div>
          <p
            className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-gold-dark/70 mb-0.5"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            ڕێکەوتەکە تۆمار بکە
          </p>
          <h2
            className="text-xl sm:text-2xl text-charcoal mb-0.5 font-semibold"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            دییە و کاردۆ
          </h2>
          <p
            className="text-xs sm:text-sm text-charcoal-light font-medium"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            ٩ی تەممووزی ٢٠٢٦
          </p>
          <p
            className="text-[10px] sm:text-xs text-charcoal-light/70 mt-0.5 mb-1.5"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            سلێمانی
          </p>

          {/* Action Button inside the card */}
          {isOpen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEnterSite();
              }}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-gold-dark to-gold text-white text-[10px] sm:text-xs font-semibold tracking-wider hover:scale-105 active:scale-95 transition-transform duration-300 shadow-md hover:shadow-lg mt-1 relative z-20 cursor-pointer"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              چوونە ژوورەوە
            </button>
          )}
        </div>

        {/* Envelope body (front face) */}
        <div className="envelope-body">
          {/* Inner fold lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 380 200"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="0"
              x2="190"
              y2="120"
              stroke="rgba(201,168,76,0.08)"
              strokeWidth="1"
            />
            <line
              x1="380"
              y1="0"
              x2="190"
              y2="120"
              stroke="rgba(201,168,76,0.08)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Envelope flap (opens on click) */}
        <div ref={flapRef} className="envelope-flap">
          <div className="envelope-flap-front" />
          <div className="envelope-flap-back" />
        </div>

        {/* Wax Seal */}
        <div ref={sealRef} className="wax-seal" />
      </div>

      {/* Call to action */}
      <div
        ref={ctaRef}
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center z-10 sm:bottom-[12%]"
      >
        {!isOpen ? (
          <p
            className="text-sm tracking-[0.2em] text-gold-dark/60 pulse-gentle"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            کلیک بکە بۆ کردنەوە
          </p>
        ) : (
          <p
            className="text-sm tracking-[0.2em] text-gold-dark/80 font-medium pulse-gentle"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            کلیک بکە بۆ چوونە ژوورەوە
          </p>
        )}
      </div>
    </div>
  );
}
