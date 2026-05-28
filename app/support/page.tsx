import ScrollReveal3D from "@/components/ScrollReveal3D";
import Link from "next/link";

const faqs = [
  {
    q: "Do your products come with an official Apple warranty?",
    a: "Yes. Every product sold at iDesire includes the standard Apple International Limited Warranty — 1 year for most devices, 90 days for accessories. AppleCare+ is also available at purchase.",
  },
  {
    q: "Can I get my device repaired at iDesire?",
    a: "We offer diagnosis and minor servicing. For hardware repairs requiring Apple-authorised parts, we coordinate with certified service partners and will keep you updated throughout the process.",
  },
  {
    q: "How does nationwide delivery work?",
    a: "We deliver across all 20 dzongkhags via our courier network. Thimphu and Paro orders typically arrive next day; other regions take 2–4 business days. You'll receive a tracking link via SMS.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cash, m-BOB, BOB e-banking, BNB mobile banking, and all major credit/debit cards. EMI options are available for purchases above Nu. 50,000.",
  },
  {
    q: "Can I trade in my old Apple device?",
    a: "Yes. Bring your device in-store for a free assessment. Trade-in credit is applied immediately toward your new purchase. We accept iPhones, iPads, and MacBooks in any condition.",
  },
  {
    q: "How do I transfer data to my new device?",
    a: "Our in-store team can guide you through Quick Start or iCloud transfer at no charge. For complete managed migration (contacts, photos, apps), we offer a premium setup service.",
  },
  {
    q: "Is there a return or exchange policy?",
    a: "Unopened products may be returned within 7 days with original receipt for a full refund or exchange. Opened products are eligible for exchange within 3 days if found to be defective.",
  },
  {
    q: "Do you offer student or education discounts?",
    a: "Yes — students and educators with valid ID receive a 5% discount on Mac and iPad. Visit us in-store or mention this at checkout when ordering online.",
  },
];

const categories = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: "iPhone",
    topics: ["Setup & transfer", "Battery & charging", "Screen & display", "iCloud & backup", "Face ID"],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Mac",
    topics: ["macOS setup", "Migration Assistant", "Performance & storage", "Display & external", "Boot Camp"],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: "iPad",
    topics: ["Apple Pencil", "Keyboard & covers", "Apps & multitasking", "iCloud sync", "Stage Manager"],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Apple Watch",
    topics: ["Pairing & setup", "Health & fitness", "Bands & cases", "watchOS update", "Battery life"],
  },
];

const contactOptions = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.14h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
      </svg>
    ),
    title: "Call Us",
    detail: "+975 2 333 444",
    sub: "Mon–Sat, 9am–6pm",
    action: "tel:+97523334444",
    actionLabel: "Call now",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Email Us",
    detail: "support@idesire.bt",
    sub: "Reply within 24 hours",
    action: "mailto:support@idesire.bt",
    actionLabel: "Send email",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Visit In-Store",
    detail: "Wangchhu Lam, Thimphu",
    sub: "Walk-ins welcome",
    action: "/contact",
    actionLabel: "Get directions",
  },
];

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-28 pb-16 px-4 sm:px-6 border-b border-white/08">
        <div className="max-w-7xl mx-auto">
          <p className="font-syne text-[11px] uppercase tracking-[0.3em] text-apple-blue mb-4">
            Support
          </p>
          <h1 className="font-bebas text-white leading-none mb-4" style={{ fontSize: "clamp(3.5rem,10vw,8rem)" }}>
            HOW CAN WE<br />HELP YOU?
          </h1>
          <p className="font-syne text-white/50 max-w-lg text-sm leading-relaxed">
            Expert help for every Apple device. Find answers below or reach our team directly.
          </p>
        </div>
      </section>

      {/* Contact options */}
      <section className="bg-black py-14 px-4 sm:px-6 border-b border-white/08">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-4">
          {contactOptions.map((opt) => (
            <ScrollReveal3D key={opt.title}>
              <div className="border border-white/10 p-5 sm:p-8 flex flex-col gap-4 hover:border-apple-blue/40 transition-colors">
                <span className="text-apple-blue">{opt.icon}</span>
                <div>
                  <p className="font-bebas text-white text-2xl">{opt.title}</p>
                  <p className="font-syne text-white/70 text-sm mt-1">{opt.detail}</p>
                  <p className="font-syne text-white/30 text-xs mt-0.5">{opt.sub}</p>
                </div>
                <Link
                  href={opt.action}
                  className="mt-auto font-syne text-[11px] uppercase tracking-widest text-apple-blue hover:text-white transition-colors"
                >
                  {opt.actionLabel} →
                </Link>
              </div>
            </ScrollReveal3D>
          ))}
        </div>
      </section>

      {/* Browse by product */}
      <section className="bg-black py-16 px-4 sm:px-6 border-b border-white/08">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bebas text-white text-4xl mb-10">Browse by Product</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <ScrollReveal3D key={cat.title}>
                <div className="border border-white/10 p-7 hover:border-white/25 transition-colors">
                  <span className="text-white/50 mb-5 block">{cat.icon}</span>
                  <p className="font-bebas text-white text-xl mb-4">{cat.title}</p>
                  <ul className="space-y-2">
                    {cat.topics.map((t) => (
                      <li key={t} className="font-syne text-white/40 text-xs hover:text-white/70 transition-colors cursor-pointer">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-black py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bebas text-white text-4xl mb-10">Frequently Asked Questions</h2>
          <div className="divide-y divide-white/08">
            {faqs.map((faq, i) => (
              <ScrollReveal3D key={i}>
                <details className="group py-7 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <summary className="flex items-start justify-between gap-6">
                    <span className="font-syne font-semibold text-white/80 group-open:text-white text-sm leading-snug transition-colors">
                      {faq.q}
                    </span>
                    <span className="shrink-0 mt-0.5 text-white/30 group-open:text-apple-blue transition-colors text-lg leading-none select-none">
                      +
                    </span>
                  </summary>
                  <p className="font-syne text-white/45 text-sm leading-relaxed mt-4 pr-8">
                    {faq.a}
                  </p>
                </details>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
