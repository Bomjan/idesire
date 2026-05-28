import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/08">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-14">
          <div className="col-span-2 md:col-span-1">
            <span className="font-bebas text-white text-3xl tracking-wider block mb-4">
              iDesire
            </span>
            <p className="font-syne text-[13px] text-white/35 leading-relaxed max-w-44">
              Bhutan&apos;s premier Apple experience. Thimphu&apos;s best.
            </p>
          </div>

          <div>
            <p className="font-syne text-[10px] font-semibold text-white/30 tracking-[0.2em] uppercase mb-5">
              Shop
            </p>
            <ul className="space-y-3">
              {["iPhone", "Mac", "iPad", "Accessories"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/products?category=${item}`}
                    className="font-syne text-[13px] text-white/50 hover:text-white uppercase tracking-wide transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-syne text-[10px] font-semibold text-white/30 tracking-[0.2em] uppercase mb-5">
              Company
            </p>
            <ul className="space-y-3">
              {[
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-syne text-[13px] text-white/50 hover:text-white uppercase tracking-wide transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-syne text-[10px] font-semibold text-white/30 tracking-[0.2em] uppercase mb-5">
              Visit
            </p>
            <address className="not-italic font-syne text-[13px] text-white/50 space-y-2">
              <p>Wangchhu Lam</p>
              <p>Thimphu, Bhutan</p>
              <a href="https://wa.me/97517000000" className="block mt-3 hover:text-white transition-colors">+975 17 000 000</a>
              <a href="mailto:hello@idesire.bt" className="block hover:text-white transition-colors">hello@idesire.bt</a>
            </address>
          </div>
        </div>

        <div className="border-t border-white/08 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-syne text-[12px] text-white/20">
            © {year} iDesire Bhutan. All rights reserved.
          </p>
          <p className="font-syne text-[12px] text-white/20 uppercase tracking-widest">
            Authorised Apple Reseller
          </p>
        </div>
      </div>
    </footer>
  );
}
