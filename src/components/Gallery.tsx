"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  {
    src: "/gallery/couple-sunset.png",
    alt: "هاوسەرەکان لە کاتی ئاوابوونی خۆر لە ڕیاز لە مەراکش",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/gallery/garden-venue.png",
    alt: "شوێنی ڕێوڕەسمی باخچەی جوانی مەغریبی",
    span: "",
  },
  {
    src: "/gallery/bouquet-detail.png",
    alt: "چەپکە گوڵی بووکی شیک",
    span: "",
  },
  {
    src: "/gallery/moroccan-arch.png",
    alt: "کەوانەی تەلارسازی ڕازاوەی مەغریبی",
    span: "md:col-span-2",
  },
  {
    src: "/gallery/rings-detail.png",
    alt: "ئەڵقەی هاوسەرگیری لەسەر پەڕەی گوڵەباخ",
    span: "",
  },
  {
    src: "/gallery/venue-table.png",
    alt: "ڕێکخستنی مێزی پێشوازی لوکس",
    span: "",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [lightbox, setLightbox] = useState<number | null>(null);

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

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.from(item, {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, var(--color-cream) 0%, var(--color-parchment) 50%, var(--color-cream) 100%)
        `,
      }}
    >
      {/* Header */}
      <div ref={titleRef} className="text-center mb-16 sm:mb-20 px-6">
        <p
          className="text-xs sm:text-sm tracking-[0.4em] uppercase text-gold-dark/50 mb-3"
          style={{ fontFamily: "var(--font-body)" }}
        >
          ساتە بەنرخەکان
        </p>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl text-charcoal font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          پێشانگای ئێمە
        </h2>
        <div className="ornamental-divider !my-4">
          <span className="text-gold">✦</span>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 auto-rows-[200px] sm:auto-rows-[250px]">
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className={`gallery-item cursor-pointer relative ${photo.span}`}
              onClick={() => setLightbox(i)}
              role="button"
              tabIndex={0}
              aria-label={`View ${photo.alt}`}
              onKeyDown={(e) => {
                if (e.key === "Enter") setLightbox(i);
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="پێشانگای وێنەکان"
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl z-10 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="داخستنی پێشانگا"
          >
            ✕
          </button>
          <div className="relative w-full max-w-4xl max-h-[85vh] aspect-[4/3]">
            <Image
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              fill
              className="object-contain rounded-lg"
              sizes="90vw"
              priority
            />
          </div>
          {/* Navigation */}
          {lightbox > 0 && (
            <button
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(lightbox - 1);
              }}
              aria-label="وێنەی پێشوو"
            >
              ‹
            </button>
          )}
          {lightbox < photos.length - 1 && (
            <button
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(lightbox + 1);
              }}
              aria-label="وێنەی داهاتوو"
            >
              ›
            </button>
          )}
        </div>
      )}
    </section>
  );
}
