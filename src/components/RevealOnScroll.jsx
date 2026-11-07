"use client";

import React, { useEffect, useRef, useState } from "react";

export default function RevealOnScroll({ children, delay = 0, className = "" }) {
  const [revealed, setRevealed] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const node = domRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`scroll-item ${revealed ? "is-revealed" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
