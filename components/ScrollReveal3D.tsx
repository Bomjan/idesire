"use client";

import { useRef, useEffect, ReactNode } from "react";

interface ScrollReveal3DProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  rotateX?: number;
  translateY?: number;
}

export default function ScrollReveal3D({
  children,
  className = "",
  delay = 0,
  rotateX = 22,
  translateY = 48,
}: ScrollReveal3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial 3D state
    el.style.opacity = "0";
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) translateY(${translateY}px)`;
    el.style.transformStyle = "preserve-3d";
    el.style.backfaceVisibility = "hidden";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = [
              "opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
              "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
            ].join(", ");
            el.style.opacity = "1";
            el.style.transform =
              "perspective(1000px) rotateX(0deg) translateY(0px)";
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, rotateX, translateY]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
