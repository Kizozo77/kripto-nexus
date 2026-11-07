"use client";

import React, { useEffect, useRef, useState } from "react";

export default function RevealOnScroll({ children, delay = 0, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Berhenti mengamati setelah elemen muncul agar animasi tidak berulang-ulang
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12, // Muncul saat 12% bagian elemen terlihat di layar
        rootMargin: "0px 0px -40px 0px", // Memicu sebelum mencapai batas bawah viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible
          ? "opacity-100 translate-y-0 blur-none scale-100"
          : "opacity-0 translate-y-8 blur-sm scale-[0.98]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
