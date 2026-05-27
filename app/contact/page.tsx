"use client";

import { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello iDesire!\n\nName: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`;
    window.open(`https://wa.me/97517000000?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <>
      {/* Header */}
      <section className="bg-black pt-32 pb-20 px-6">
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
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Store info */}
          <ScrollReveal3D className="space-y-0 border-t border-black/08">
            {/* Address */}
            <div className="py-8 border-b border-black/08">
              <p className="font-syne text-[10px] uppercase tracking-[0.2em] text-black/30 mb-3">Address</p>
              <p className="font-syne text-[15px] text-black font-medium">
                Norzin Lam, Chang Lam Square
                <br />
                Thimphu, Bhutan 11001
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

      {/* Map strip */}
      <section className="h-64 bg-black relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative h-full flex flex-col items-center justify-center gap-3">
          <p className="font-syne text-[11px] uppercase tracking-[0.25em] text-white/25">
            Norzin Lam, Thimphu, Bhutan
          </p>
          <a
            href="https://maps.google.com/?q=Thimphu+Bhutan"
            target="_blank"
            rel="noopener noreferrer"
            className="font-syne text-[12px] font-bold uppercase tracking-widest text-apple-blue hover:underline"
          >
            Open in Google Maps →
          </a>
        </div>
      </section>
    </>
  );
}
