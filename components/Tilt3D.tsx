"use client";

import { useRef, useCallback, useState, useEffect, ReactNode } from "react";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  shine?: boolean;
  perspective?: number;
  scale?: number;
}

export default function Tilt3D({
  children,
  className = "",
  intensity = 14,
  shine = true,
  perspective = 900,
  scale = 1.03,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - y) * intensity;
        const ry = (x - 0.5) * intensity;

        el.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${scale}, ${scale}, ${scale})`;
        setShinePos({ x: x * 100, y: y * 100 });
      });
    },
    [intensity, perspective, scale]
  );

  const onMouseEnter = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transition = "box-shadow 0.3s ease";
    setHovered(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setHovered(false);
    el.style.transition =
      "transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease";
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 650);
  }, [perspective]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: isTouch ? "auto" : "transform" }}
      onMouseMove={isTouch ? undefined : onMouseMove}
      onMouseEnter={isTouch ? undefined : onMouseEnter}
      onMouseLeave={isTouch ? undefined : onMouseLeave}
    >
      {children}

      {/* Specular shine that follows cursor */}
      {shine && (
        <div
          aria-hidden
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-20"
          style={{
            background: `radial-gradient(ellipse 55% 45% at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 65%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.25s ease",
            mixBlendMode: "screen",
          }}
        />
      )}
    </div>
  );
}
