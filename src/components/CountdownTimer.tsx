"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const WEDDING_DATE = new Date("2026-07-09T20:00:00+03:00"); // Sulaymaniyah time (UTC+3)

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass-card countdown-ring w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center mb-3">
        <span
          className="text-3xl sm:text-4xl md:text-5xl text-gold-dark tabular-nums"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        className="text-xs sm:text-sm tracking-[0.2em] uppercase text-charcoal-light/60"
        style={{ fontFamily: "var(--font-doran)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const unitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(unitsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: unitsRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="countdown"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 50% 50%, rgba(201, 168, 76, 0.06) 0%, transparent 60%),
          var(--color-cream)
        `,
      }}
    >
      {/* Header */}
      <div ref={titleRef} className="text-center mb-12 sm:mb-16 px-6">
        <p
          className="text-xs sm:text-sm tracking-[0.4em] uppercase text-gold-dark/50 mb-3"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          ڕێکەوتەکە تۆمار بکە
        </p>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl text-charcoal font-light"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          کاتی ماوە بۆ دەستپێکردن
        </h2>
        <div className="ornamental-divider !my-4">
          <span className="text-gold">✦</span>
        </div>

      </div>

      {/* Countdown Units */}
      <div
        ref={unitsRef}
        className="flex justify-center items-start gap-4 sm:gap-8 md:gap-12 px-6"
      >
        <CountdownUnit value={timeLeft.days} label="ڕۆژ" />
        <div
          className="text-2xl sm:text-3xl text-gold/40 mt-6 sm:mt-8 md:mt-10"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          :
        </div>
        <CountdownUnit value={timeLeft.hours} label="کاتژمێر" />
        <div
          className="text-2xl sm:text-3xl text-gold/40 mt-6 sm:mt-8 md:mt-10"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          :
        </div>
        <CountdownUnit value={timeLeft.minutes} label="خولەک" />
        <div
          className="text-2xl sm:text-3xl text-gold/40 mt-6 sm:mt-8 md:mt-10 hidden sm:block"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          :
        </div>
        <div className="hidden sm:block">
          <CountdownUnit value={timeLeft.seconds} label="چرکە" />
        </div>
      </div>
    </section>
  );
}
