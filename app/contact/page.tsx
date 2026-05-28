"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import ScrollReveal3D from "@/components/ScrollReveal3D";

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
  { day: "Saturday", time: "9:00 AM – 6:00 PM" },
  { day: "Sunday", time: "10:00 AM – 4:00 PM" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [mapHint, setMapHint] = useState(false);
  const [mapActive, setMapActive] = useState(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const activeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function handleMapWheel(e: React.WheelEvent) {
    if (mapActive) return;
    if (!e.ctrlKey) {
      setMapHint(true);
      clearTimeout(hintTimer.current);
      hintTimer.current = setTimeout(() => setMapHint(false), 1800);
    }
  }

  function handleMapClick() {
    setMapActive(true);
    setMapHint(false);
    clearTimeout(activeTimer.current);
    activeTimer.current = setTimeout(() => setMapActive(false), 4000);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello iDesire!\n\nName: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`;
    window.open(`https://wa.me/97517000000?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <>
      {/* Header */}
      <section className="bg-black pt-24 pb-14 px-4 sm:pt-32 sm:pb-20 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="font-syne text-[10px] font-semibold text-apple-blue uppercase tracking-[0.25em] mb-6 animate-fade-up">
            Get in Touch
          </p>
          <h1
            className="font-bebas text-white animate-fade-up-1 leading-[0.9] mb-6"
            style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
          >
            WE&apos;D LOVE TO
            <br />
            HEAR FROM YOU.
          </h1>
          <p className="font-syne text-white/35 text-[14px] animate-fade-up-2 max-w-sm">
            Questions, orders, or just stopping by — we&apos;re here.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-14 px-4 sm:py-20 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Store info */}
          <ScrollReveal3D className="space-y-0 border-t border-black/08">
            {/* Address */}
            <div className="py-8 border-b border-black/08">
              <p className="font-syne text-[10px] uppercase tracking-[0.2em] text-black/30 mb-3">Address</p>
              <p className="font-syne text-[15px] text-black font-medium">
                Wangchhu Lam
                <br />
                Thimphu, Bhutan
              </p>
            </div>

            {/* WhatsApp */}
            <div className="py-8 border-b border-black/08">
              <p className="font-syne text-[10px] uppercase tracking-[0.2em] text-black/30 mb-3">WhatsApp (fastest)</p>
              <a
                href="https://wa.me/97517000000"
                target="_blank"
                rel="noopener noreferrer"
                className="font-syne text-[15px] font-medium text-black hover:text-apple-blue transition-colors"
              >
                +975 17 000 000
              </a>
            </div>

            {/* Email */}
            <div className="py-8 border-b border-black/08">
              <p className="font-syne text-[10px] uppercase tracking-[0.2em] text-black/30 mb-3">Email</p>
              <a
                href="mailto:hello@idesire.bt"
                className="font-syne text-[15px] font-medium text-black hover:text-apple-blue transition-colors"
              >
                hello@idesire.bt
              </a>
            </div>

            {/* Hours */}
            <div className="py-8 border-b border-black/08">
              <p className="font-syne text-[10px] uppercase tracking-[0.2em] text-black/30 mb-4">Store Hours</p>
              <div className="space-y-2">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between items-center font-syne text-[14px]">
                    <span className="text-black/50">{h.day}</span>
                    <span className="font-medium text-black">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="pt-8">
              <a
                href="https://wa.me/97517000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-black text-white text-[12px] font-bold uppercase tracking-widest px-8 py-4 hover:bg-black/80 active:scale-[0.97] transition-all font-syne w-full justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.126 1.532 5.86L.057 23.804a.5.5 0 0 0 .614.666l6.184-1.62A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.93 9.93 0 0 1-5.163-1.445l-.371-.22-3.843 1.007 1.027-3.746-.242-.386A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </ScrollReveal3D>

          {/* Form */}
          <ScrollReveal3D delay={100}>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-12 h-12 border-2 border-black flex items-center justify-center mb-6">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-bebas text-3xl text-black mb-2">Message Sent</h3>
                <p className="font-syne text-[13px] text-black/40 mb-8">Opened in WhatsApp. We&apos;ll reply shortly.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="font-syne text-[12px] uppercase tracking-widest text-black/40 hover:text-black transition-colors"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-0 border-t border-black/08">
                <h2 className="font-bebas text-black py-6 border-b border-black/08" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", lineHeight: 0.95 }}>
                  SEND A MESSAGE
                </h2>

                {[
                  { label: "Your Name", key: "name", type: "text", placeholder: "Dorji Wangchuk" },
                  { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
                  { label: "Subject", key: "subject", type: "text", placeholder: "Inquiry about iPhone 16 Pro" },
                ].map((field) => (
                  <div key={field.key} className="py-5 border-b border-black/08">
                    <label className="font-syne text-[10px] uppercase tracking-[0.2em] text-black/30 block mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent font-syne text-[14px] text-black placeholder-black/20 focus:outline-none"
                    />
                  </div>
                ))}

                <div className="py-5 border-b border-black/08">
                  <label className="font-syne text-[10px] uppercase tracking-[0.2em] text-black/30 block mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-transparent font-syne text-[14px] text-black placeholder-black/20 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    className="w-full bg-black text-white text-[12px] font-bold uppercase tracking-widest py-4 hover:bg-black/80 active:scale-[0.97] transition-all font-syne"
                  >
                    Send via WhatsApp →
                  </button>
                  <p className="font-syne text-[11px] text-black/25 text-center mt-4">
                    Opens in WhatsApp for instant delivery.
                  </p>
                </div>
              </form>
            )}
          </ScrollReveal3D>
        </div>
      </section>

      {/* Map */}
      <section className="relative bg-black overflow-hidden" style={{ height: "520px" }}>
        {/* Dark-filtered map iframe */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.10255512468!2d89.64841661155377!3d27.434914437354948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e193302ed9c349%3A0x3f6d66d054ac25ac!2siDesire%2C%20Thimphu!5e0!3m2!1sen!2sbt!4v1779964305488!5m2!1sen!2sbt"
          width="100%"
          height="100%"
          style={{
            border: 0,
            display: "block",
            filter: "invert(90%) hue-rotate(180deg) saturate(0.35) brightness(0.75) contrast(1.1)",
            position: "absolute",
            inset: 0,
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="iDesire Thimphu location"
        />

        {/* Scroll / click capture overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{ pointerEvents: mapActive ? "none" : "auto", cursor: mapActive ? "default" : "pointer" }}
          onWheel={handleMapWheel}
          onClick={handleMapClick}
        >
          {/* Scroll hint */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: mapHint ? 1 : 0, pointerEvents: "none" }}
          >
            <div className="bg-black/80 border border-white/10 backdrop-blur-xl px-6 py-4 flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-apple-blue shrink-0">
                <rect x="8" y="2" width="8" height="14" rx="4" />
                <line x1="12" y1="6" x2="12" y2="9" />
                <path d="M6 18a6 6 0 0 0 12 0" />
              </svg>
              <p className="font-syne text-white/70 text-xs uppercase tracking-widest">
                Use <span className="text-white font-semibold">Ctrl + scroll</span> to zoom
              </p>
            </div>
          </div>

          {/* Click-to-activate hint (idle state) */}
          {!mapHint && !mapActive && (
            <div className="absolute bottom-10 right-6 sm:right-10 flex items-center gap-2 opacity-40 hover:opacity-80 transition-opacity">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span className="font-syne text-white text-[10px] uppercase tracking-widest">Click to interact</span>
            </div>
          )}
        </div>

        {/* Edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Top + bottom fades */}
        <div className="absolute inset-x-0 top-0 h-20 pointer-events-none bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none bg-gradient-to-t from-black to-transparent" />

        {/* Floating info card */}
        <div className="absolute bottom-10 left-6 sm:left-10 pointer-events-none">
          <div
            className="bg-black/80 border border-white/10 backdrop-blur-xl px-7 py-6 flex flex-col gap-4"
            style={{ minWidth: "260px" }}
          >
            {/* Store label */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-apple-blue animate-pulse shrink-0" />
              <p className="font-syne text-[10px] uppercase tracking-[0.3em] text-apple-blue">
                iDesire — Thimphu
              </p>
            </div>

            {/* Address */}
            <div>
              <p className="font-bebas text-white text-xl leading-tight">
                Wangchhu Lam
              </p>
              <p className="font-syne text-white/40 text-xs mt-1">Thimphu, Bhutan</p>
            </div>

            {/* Hours */}
            <div className="flex items-center gap-2 font-syne text-[11px] text-white/40">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Mon–Fri 9am–7pm &nbsp;·&nbsp; Sat 9am–6pm &nbsp;·&nbsp; Sun 10am–4pm</span>
            </div>

            {/* Directions link — re-enable pointer events just for this */}
            <a
              href="https://maps.google.com/?q=iDesire+Thimphu"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex items-center gap-2 font-syne text-[11px] uppercase tracking-widest text-white/50 hover:text-apple-blue transition-colors mt-1"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>

        {/* Subtle grid overlay for texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </section>
    </>
  );
}
