"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

import EnvelopeIntro from "@/components/EnvelopeIntro";
import SmoothScroll from "@/components/SmoothScroll";
import AudioPlayer from "@/components/AudioPlayer";

// Lazy-load wedding sections so they only render after envelope opens
const HeroSection = dynamic(() => import("@/components/HeroSection"), {
  ssr: false,
});
const FormalInvitation = dynamic(() => import("@/components/FormalInvitation"), {
  ssr: false,
});
const VenueLocation = dynamic(() => import("@/components/VenueLocation"), {
  ssr: false,
});
const CountdownTimer = dynamic(() => import("@/components/CountdownTimer"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleEnvelopeComplete = useCallback(() => {
    setIsOpen(true);
    // Scroll to top when wedding site appears
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Envelope Intro — fixed overlay that disappears after animation */}
      {!isOpen && <EnvelopeIntro onComplete={handleEnvelopeComplete} />}

      {/* Wedding Website — revealed after envelope opens */}
      {isOpen && (
        <>
          <SmoothScroll enabled={isOpen}>
            <main>
              <HeroSection />
              <FormalInvitation />
              <VenueLocation />
              <CountdownTimer />
              <Footer />
            </main>
          </SmoothScroll>
          <AudioPlayer playTrigger={isOpen} />
        </>
      )}
    </>
  );
}
