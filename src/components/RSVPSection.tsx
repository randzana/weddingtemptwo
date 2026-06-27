"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RSVPSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "1",
    attending: "yes",
    dietary: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      gsap.from(formRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 30% 40%, rgba(244, 194, 194, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 60%, rgba(156, 175, 136, 0.08) 0%, transparent 50%),
          var(--color-parchment)
        `,
      }}
    >
      {/* Header */}
      <div ref={titleRef} className="text-center mb-12 sm:mb-16 px-6">
        <p
          className="text-xs sm:text-sm tracking-[0.4em] uppercase text-gold-dark/50 mb-3"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Will You Join Us?
        </p>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl text-charcoal font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          RSVP
        </h2>
        <div className="ornamental-divider !my-4">
          <span className="text-gold">✦</span>
        </div>
        <p
          className="text-base sm:text-lg text-charcoal-light mt-4 max-w-lg mx-auto"
          style={{ fontFamily: "var(--font-elegant)", fontWeight: 300 }}
        >
          Kindly respond by July 15, 2026
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6">
        {submitted ? (
          <div className="glass-card p-10 sm:p-14 text-center">
            <div className="text-5xl mb-6">💌</div>
            <h3
              className="text-2xl sm:text-3xl text-charcoal mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Thank You!
            </h3>
            <p
              className="text-base text-charcoal-light leading-relaxed"
              style={{ fontFamily: "var(--font-elegant)", fontWeight: 400 }}
            >
              We have received your RSVP and cannot wait to celebrate with you.
              <br />
              See you in Marrakech! ✨
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card p-8 sm:p-12 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="rsvp-name"
                  className="block text-xs tracking-[0.15em] uppercase text-charcoal-light/70 mb-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Full Name *
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="rsvp-email"
                  className="block text-xs tracking-[0.15em] uppercase text-charcoal-light/70 mb-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Email Address *
                </label>
                <input
                  id="rsvp-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="rsvp-attending"
                  className="block text-xs tracking-[0.15em] uppercase text-charcoal-light/70 mb-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Will you attend?
                </label>
                <select
                  id="rsvp-attending"
                  name="attending"
                  value={formData.attending}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="yes">Joyfully Accept ♥</option>
                  <option value="no">Regretfully Decline</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="rsvp-guests"
                  className="block text-xs tracking-[0.15em] uppercase text-charcoal-light/70 mb-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Number of Guests
                </label>
                <select
                  id="rsvp-guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="form-input"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={String(n)}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="rsvp-dietary"
                className="block text-xs tracking-[0.15em] uppercase text-charcoal-light/70 mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Dietary Requirements
              </label>
              <input
                id="rsvp-dietary"
                type="text"
                name="dietary"
                value={formData.dietary}
                onChange={handleChange}
                className="form-input"
                placeholder="Any allergies or dietary needs"
              />
            </div>

            <div>
              <label
                htmlFor="rsvp-message"
                className="block text-xs tracking-[0.15em] uppercase text-charcoal-light/70 mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                A Message for the Couple
              </label>
              <textarea
                id="rsvp-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="form-input resize-none"
                placeholder="Share your wishes..."
              />
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light text-white text-sm tracking-[0.15em] uppercase font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send RSVP"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
