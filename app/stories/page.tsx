import Image from "next/image";
import ScrollReveal3D from "@/components/ScrollReveal3D";

const stories = [
  {
    id: 1,
    category: "CUSTOMER STORY",
    title: "How Tenzin Built His Photography Career With an iPhone 15 Pro",
    excerpt:
      "From Paro valleys to international galleries — a Bhutanese photographer's journey with Apple.",
    image:
      "https://images.unsplash.com/photo-1499336315816-097655dcfbda?w=900&q=80",
    date: "May 2026",
    readTime: "4 min read",
  },
  {
    id: 2,
    category: "IN THE COMMUNITY",
    title: "iDesire Sponsors Bhutan's First Student App Development Camp",
    excerpt:
      "Forty young coders from across the dzongkhags spent five days building apps on MacBook Airs.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=80",
    date: "April 2026",
    readTime: "3 min read",
  },
  {
    id: 3,
    category: "PRODUCT DEEP DIVE",
    title: "M4 MacBook Pro — A Monk's Unexpected Creative Tool",
    excerpt:
      "Gyeltshen Dorji never expected a laptop to transform his traditional Thangka documentation work.",
    image:
      "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=900&q=80",
    date: "March 2026",
    readTime: "5 min read",
  },
  {
    id: 4,
    category: "BEHIND THE STORE",
    title: "A Day in the Life at iDesire Thimphu",
    excerpt:
      "From morning setup to the last customer — what it takes to run Bhutan's favourite Apple store.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
    date: "February 2026",
    readTime: "6 min read",
  },
  {
    id: 5,
    category: "TECH & CULTURE",
    title: "GNH Meets Silicon — Apple's Philosophy in a Bhutanese Context",
    excerpt:
      "Exploring how Apple's human-centred design resonates with Gross National Happiness values.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80",
    date: "January 2026",
    readTime: "7 min read",
  },
  {
    id: 6,
    category: "CUSTOMER STORY",
    title: "Running a Dragon Kingdom Business on iPad Pro",
    excerpt:
      "How a Phuentsholing trader manages inventory, orders, and staff entirely from a single device.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80",
    date: "December 2025",
    readTime: "4 min read",
  },
];

const featured = stories[0];
const rest = stories.slice(1);

export default function StoriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-black min-h-[50vh] flex items-end pb-14 px-4 sm:pb-20 sm:px-6 pt-24 sm:pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=85"
            alt="iDesire Stories"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto w-full">
          <p className="font-syne text-[11px] uppercase tracking-[0.3em] text-apple-blue mb-4">
            iDesire Stories
          </p>
          <h1 className="font-bebas text-white leading-none" style={{ fontSize: "clamp(3.5rem,10vw,8rem)" }}>
            REAL PEOPLE.<br />REAL APPLE.
          </h1>
          <p className="mt-4 font-syne text-white/50 max-w-md text-sm leading-relaxed">
            Experiences, perspectives, and moments from our community across Bhutan.
          </p>
        </div>
      </section>

      {/* Featured story */}
      <section className="bg-black py-16 px-4 sm:px-6 border-b border-white/08">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal3D>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div>
                <p className="font-syne text-[10px] uppercase tracking-[0.3em] text-apple-blue mb-4">
                  {featured.category} &mdash; Featured
                </p>
                <h2 className="font-bebas text-white leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
                  {featured.title}
                </h2>
                <p className="font-syne text-white/50 text-sm leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-white/30 font-syne text-[11px] uppercase tracking-widest">
                  <span>{featured.date}</span>
                  <span className="w-4 h-px bg-white/20" />
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </div>
          </ScrollReveal3D>
        </div>
      </section>

      {/* Story grid */}
      <section className="bg-black py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((story) => (
              <ScrollReveal3D key={story.id}>
                <article className="group cursor-pointer">
                  <div className="relative aspect-[3/2] overflow-hidden mb-5">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <p className="font-syne text-[10px] uppercase tracking-[0.3em] text-apple-blue mb-2">
                    {story.category}
                  </p>
                  <h3 className="font-bebas text-white text-2xl leading-tight mb-2 group-hover:text-apple-blue transition-colors">
                    {story.title}
                  </h3>
                  <p className="font-syne text-white/40 text-xs leading-relaxed mb-4">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-white/25 font-syne text-[10px] uppercase tracking-widest">
                    <span>{story.date}</span>
                    <span className="w-3 h-px bg-white/15" />
                    <span>{story.readTime}</span>
                  </div>
                </article>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
