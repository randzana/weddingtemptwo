"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VenueLocation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const detailsCardRef = useRef<HTMLDivElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Staggered columns entrance
      gsap.from(detailsCardRef.current, {
        opacity: 0,
        x: -40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: detailsCardRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(mapCardRef.current, {
        opacity: 0,
        x: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapCardRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="location"
      className="relative py-24 sm:py-32 overflow-hidden bg-cream"
      style={{
        background: `
          radial-gradient(ellipse at 80% 50%, rgba(201, 168, 76, 0.07) 0%, transparent 60%),
          radial-gradient(ellipse at 20% 30%, rgba(156, 175, 136, 0.05) 0%, transparent 60%),
          var(--color-cream)
        `,
      }}
    >
      {/* Header */}
      <div ref={headerRef} className="text-center mb-16 sm:mb-20 px-6">
        <p
          className="text-xs sm:text-sm tracking-[0.4em] uppercase text-gold-dark/60 mb-3"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          شوێنی مەبەست
        </p>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl text-charcoal font-light"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          شوێن
        </h2>
        <div className="ornamental-divider !my-4">
          <span className="text-gold">✦</span>
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* Left Column: Venue Details */}
        <div ref={detailsCardRef} className="lg:col-span-5 flex flex-col justify-between">
          <div className="glass-card p-8 sm:p-10 flex-1 flex flex-col justify-center border border-gold/15 shadow-[0_10px_30px_rgba(160,125,46,0.04)] relative">
            <div className="absolute inset-2 border border-gold/5 pointer-events-none rounded-lg" />
            
            <div className="space-y-8 relative z-10">
              {/* Ceremony Venue */}
              <div className="flex gap-4">
                <span className="text-2xl text-gold-dark select-none mt-1">💒</span>
                <div>
                  <h3
                    className="text-xl sm:text-2xl text-charcoal font-medium mb-1"
                    style={{ fontFamily: "var(--font-doran)" }}
                  >
                    ڕێوڕەسمی دەستنیشانکردن
                  </h3>
                  <p
                    className="text-xs sm:text-sm text-gold-dark font-semibold tracking-wide"
                    style={{ fontFamily: "var(--font-doran)" }}
                  >
                    ٨:٠٠ی شەو — ماڵی بووک
                  </p>
                  <p className="text-xs text-charcoal-light/75 mt-1 leading-relaxed">
                    سلێمانی
                  </p>
                  <p className="text-xs text-charcoal-light mt-2 leading-relaxed font-light">
                    خۆشحاڵ دەبین بە ئامادەبوون و بەشداریکردنتان لە ئاهەنگەکەماندا.
                  </p>
                </div>
              </div>
            </div>

            {/* Directions Action Button */}
            <div className="mt-8 relative z-10 flex justify-center">
              <a
                href="https://maps.app.goo.gl/YgEG5nmV1Ya95hrK8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-dark to-gold text-white font-medium text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform duration-300 shadow-md hover:shadow-lg"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                <span>نەخشە و ڕێگا</span>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Google Maps Embed */}
        <div ref={mapCardRef} className="lg:col-span-7">
          <div className="glass-card p-3 h-full flex flex-col border border-gold/15 shadow-[0_10px_30px_rgba(160,125,46,0.04)] overflow-hidden rounded-xl bg-white/70 min-h-[350px] lg:min-h-0">
            <iframe
              src="https://maps.google.com/maps?q=35.6026944,45.4268056&z=15&output=embed"
              className="w-full h-full flex-1 rounded-lg border-0 min-h-[350px] opacity-90 hover:opacity-100 transition-opacity duration-300"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="نەخشەی کارلێککاری سلێمانی"
            />
          </div>
        </div>
        
      </div>
    </section>
  );
}
