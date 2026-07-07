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
        <div className="absolute inset-x-[8%] top-[15%] bottom-[15%] flex flex-col items-center justify-between z-10 text-center py-4">
          {/* Bismillah & Quranic Verse */}
          <div className="w-full">
            <br />
            <h3 className="font-arabic text-sm sm:text-base text-gold-dark font-medium select-none leading-none mb-1">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </h3>
            <br />

            <h2 className="font-arabic text-[10px] sm:text-[12px] text-gold-dark font-medium select-none leading-relaxed tracking-normal max-w-[95%] mx-auto">
              ﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا <br />إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً﴾
            </h2>

            {/* Elegant Ornament Divider */}
            <div className="flex items-center justify-center gap-3 my-1 sm:my-1.5">
              <div className="h-[1px] w-8 bg-gold/25" />
              <span className="text-gold text-xs select-none">❦</span>
              <div className="h-[1px] w-8 bg-gold/25" />
            </div>
          </div>

          {/* Invitation Text (Traditional Formal Kurdish Sorani) */}
          <div className="font-arabic text-charcoal flex flex-col gap-1 sm:gap-1.5 leading-relaxed text-[10px] sm:text-xs max-w-[95%] mx-auto">
            <p className="text-gold-dark/95 font-medium tracking-wide text-[10px] sm:text-[11px]">
              بە ناوی خودای بەخشندە و میهرەبان،
            </p>
            <p className="font-light text-[10px] sm:text-[11px] leading-normal">
              بە ڕەزامەندی و فەرمانی خودای گەورە، دڵەکانمان بە پەیمانی
              <br /> هاوسەرگیری و عەشقێکی پاک ئاوێتەی یەکتر بوون.
            </p>

            {/* Names */}
            <div className="my-1 sm:my-1.5 flex flex-col items-center">
              <h3 className="text-lg sm:text-xl text-gold-dark font-semibold select-none leading-none">
                دییە
              </h3>
              <span className="text-[10px] sm:text-xs text-charcoal-light/60 my-0.5 leading-none">و</span>
              <h3 className="text-lg sm:text-xl text-gold-dark font-semibold select-none leading-none">
                کاردۆ
              </h3>
            </div>

            <p className="font-light text-[10px] sm:text-[11px] leading-normal">
              ئامادەبوونی ئێوەی بەڕێز و خۆشەویست لە مەراسیمی <br />(دەستنیشانکردنی هاوسەرگیری و ئەڵقە گۆڕینەوەمان)،<br /> کاتەکانمان پڕ دەکات لە بەرەکەت و دڵخۆشی. بە شانازییەوە<br /> چاوەڕێی تەشریفهێنانتانین.
            </p>

            <p className="font-light mt-1 text-[10px] sm:text-[11px]">
              ئەمەش لە ڕۆژی پێنجشەممە <span className="font-semibold text-gold-dark">٩ی تەممووزی ٢٠٢٦</span>
            </p>
            <p className="font-light text-[10px] sm:text-[11px]">
              لە کاتژمێر ٨ی شەو
            </p>
          </div>

          {/* Venue Section in Kurdish Sorani */}
          <div className="w-full max-w-[280px] flex flex-col items-center pt-1.5 sm:pt-2.5 border-t border-gold/15">


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
