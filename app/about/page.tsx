import Image from "next/image";
import Link from "next/link";
import ScrollReveal3D from "@/components/ScrollReveal3D";

const milestones = [
  { year: "2015", event: "iDesire opens in Thimphu" },
  { year: "2018", event: "Authorised Apple reseller status" },
  { year: "2021", event: "Nationwide delivery across all 20 dzongkhags" },
  { year: "2024", event: "Bhutan's highest-rated Apple store" },
];

const values = [
  { n: "01", title: "AUTHENTICITY", body: "Every product is 100% genuine Apple. We never compromise on this — your trust means everything." },
  { n: "02", title: "EXPERTISE", body: "Our staff are trained Apple specialists. Whether first iPhone or a Pro upgrade, we'll guide you right." },
  { n: "03", title: "COMMUNITY", body: "We're proud to be part of Bhutan's growing tech scene. iDesire is a place for Apple enthusiasts." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-black min-h-[60vh] sm:min-h-[70vh] flex items-end pb-14 px-4 sm:pb-20 sm:px-6 pt-24 sm:pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=85"
            alt="About iDesire"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto w-full">
          <p className="font-syne text-[10px] font-semibold text-apple-blue uppercase tracking-[0.25em] mb-6 animate-fade-up">
            Our Story
          </p>
          <h1
            className="font-bebas text-white animate-fade-up-1 leading-[0.9] max-w-4xl"
            style={{ fontSize: "clamp(4rem, 10vw, 8.5rem)" }}
          >
            BHUTAN&apos;S FINEST
            <br />
            APPLE EXPERIENCE.
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-16 px-4 sm:py-24 sm:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <ScrollReveal3D>
            <h2
              className="font-bebas text-black leading-[0.92] mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              A DECADE OF BRINGING
              <br />
              APPLE TO BHUTAN.
            </h2>
            <div className="space-y-5 font-syne text-[15px] text-black/50 leading-relaxed">
              <p>
                iDesire was founded in 2015 by a team of Apple enthusiasts who saw a gap in Bhutan&apos;s technology market. At the time, Apple products were hard to come by — and when you found them, you had no guarantee of authenticity or support.
              </p>
              <p>
                We started small, with a single storefront on Norzin Lam, Thimphu. Over the years we grew into the most trusted Apple destination in the kingdom, earning authorised reseller status in 2018.
              </p>
              <p>
                Today, iDesire serves thousands of customers across all 20 dzongkhags. Our mission remains the same: bring the best of Apple to every corner of Bhutan.
              </p>
            </div>
          </ScrollReveal3D>
          <ScrollReveal3D delay={100}>
            <div className="relative aspect-[4/5] overflow-hidden bg-black">
              <Image
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=85"
                alt="iDesire store"
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal3D>
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-black py-16 px-4 sm:py-24 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal3D className="mb-16">
            <h2
              className="font-bebas text-white/08"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 0.9 }}
            >
              TIMELINE
            </h2>
          </ScrollReveal3D>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-white/08">
            {milestones.map((m, i) => (
              <ScrollReveal3D key={m.year} delay={i * 90} rotateX={18}>
                <div className="border-b sm:border-b-0 border-r-0 sm:border-r border-white/08 last:border-r-0 py-10 sm:px-8 first:sm:pl-0 last:sm:pr-0 group">
                  <span
                    className="font-bebas text-white/15 group-hover:text-apple-blue block mb-4 transition-colors duration-300"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
                  >
                    {m.year}
                  </span>
                  <p className="font-syne text-[13px] text-white/40 leading-relaxed">{m.event}</p>
                </div>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 px-4 sm:py-24 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal3D className="mb-16">
            <h2
              className="font-bebas text-black leading-[0.9]"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              WHAT WE
              <br />
              STAND FOR.
            </h2>
          </ScrollReveal3D>
          <div className="grid md:grid-cols-3 gap-0 border-t border-black/08">
            {values.map((v, i) => (
              <ScrollReveal3D key={v.n} delay={i * 100} rotateX={20}>
                <div className="border-b md:border-b-0 md:border-r border-black/08 last:border-r-0 py-10 md:px-10 first:md:pl-0 last:md:pr-0 group">
                  <span className="font-bebas text-black/08 text-6xl block mb-6 group-hover:text-apple-blue transition-colors duration-300">
                    {v.n}
                  </span>
                  <h3
                    className="font-bebas text-black mb-4"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", lineHeight: 1 }}
                  >
                    {v.title}
                  </h3>
                  <p className="font-syne text-[13px] text-black/40 leading-relaxed">{v.body}</p>
                </div>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 px-4 sm:py-24 sm:px-6 text-center">
        <ScrollReveal3D>
          <div className="max-w-xl mx-auto">
            <h2
              className="font-bebas text-white mb-6 leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
            >
              FIND YOUR NEXT APPLE DEVICE.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-white text-black text-[12px] font-bold uppercase tracking-widest px-8 py-4 hover:bg-apple-gray active:scale-[0.97] transition-all font-syne"
              >
                Shop Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto border border-white/25 text-white text-[12px] font-semibold uppercase tracking-widest px-8 py-4 hover:border-white active:scale-[0.97] transition-all font-syne"
              >
                Find the Store
              </Link>
            </div>
          </div>
        </ScrollReveal3D>
      </section>
    </>
  );
}
