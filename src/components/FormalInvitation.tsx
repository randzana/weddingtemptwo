"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FormalInvitation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.98,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="formal-invitation"
      className="relative py-20 px-4 bg-cream flex items-center justify-center overflow-hidden"
    >
      {/* Decorative background curves */}
      <div className="absolute top-10 left-10 w-40 h-40 border border-gold/5 rounded-full opacity-40 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-40 h-40 border border-gold/5 rounded-full opacity-40 pointer-events-none" />

      {/* The Moorish Arch Card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-[460px] aspect-[682/1024] bg-cover bg-center rounded-2xl shadow-xl border border-gold/15 overflow-hidden filter drop-shadow-[0_12px_32px_rgba(160,125,46,0.12)]"
        style={{ backgroundImage: "url('/invitation-bg.jpg')" }}
      >
        {/* Content container positioned precisely inside the template's gold arch */}
        <div className="absolute inset-x-[10%] top-[16%] bottom-[16%] flex flex-col items-center justify-between z-10 text-center py-6">
          {/* Bismillah Calligraphy */}
          <div className="w-full">
            <h2 className="font-arabic text-2xl sm:text-3xl text-gold-dark font-medium select-none leading-relaxed tracking-wide">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </h2>

            {/* Elegant Ornament Divider */}
            <div className="flex items-center justify-center gap-3 my-2 sm:my-3">
              <div className="h-[1px] w-8 bg-gold/25" />
              <span className="text-gold text-sm select-none">❦</span>
              <div className="h-[1px] w-8 bg-gold/25" />
            </div>
          </div>

          {/* Invitation Text (Traditional Formal Arabic) */}
          <div className="font-arabic text-charcoal flex flex-col gap-1 sm:gap-1.5 leading-relaxed text-xs sm:text-[15px] max-w-[90%] mx-auto">
            <p className="text-gold-dark/95 font-medium tracking-wide text-[10px] sm:text-xs uppercase">
              بمشيئة الله تعالى
            </p>
            <p className="font-light">
              تتشرف عائلاتنا بدعوتكم لحضور حفل زفاف
            </p>
            <p className="font-light">
              ابنتنا المصونة
            </p>
            <h3 className="text-xl sm:text-2xl text-gold-dark font-semibold select-none">
              إيمان
            </h3>
            <p className="font-light text-charcoal/70">
              بالسيد
            </p>
            <h3 className="text-xl sm:text-2xl text-gold-dark font-semibold select-none">
              المهدي
            </h3>
            <p className="font-light mt-1 text-xs sm:text-[14px]">
              وذلك يوم السبت <span className="font-semibold text-gold-dark">15 غشت 2026</span>
            </p>
            <p className="font-light">
              على الساعة الرابعة مساءً
            </p>
          </div>

          {/* Venue Section in French/English Style matching Himmi Palace */}
          <div className="w-full max-w-[280px] flex flex-col items-center pt-2 sm:pt-4 border-t border-gold/15">
            <p className="font-arabic text-[9px] sm:text-[11px] text-charcoal-light/70 mb-0.5">
              بقاعة
            </p>
            <h4 className="font-script text-2xl sm:text-3xl text-gold-dark leading-snug tracking-wide select-none">
              La Mamounia & Royal Mansour
            </h4>
            <p className="text-[8px] sm:text-[10px] tracking-[0.2em] text-charcoal-light/60 uppercase mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Marrakech, Morocco
            </p>
          </div>

          {/* Bottom Ornament */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-gold/45 text-xs select-none">⚜</span>
          </div>
        </div>
      </div>
    </section>
  );
}
