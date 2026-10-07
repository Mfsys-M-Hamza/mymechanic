import {
  siAudi, siBmw, siChevrolet, siHonda, siHyundai, siKia, siMazda, siMg, siMitsubishi,
  siNissan, siProton, siSubaru, siSuzuki, siToyota, siVolkswagen,
} from "simple-icons";

/**
 * Endless scrolling strip of the car makes the workshop services (home page, below the hero).
 *
 * Logos come from Simple Icons (CC0 SVG data, https://simpleicons.org). Brands not in that set
 * are shown as plain text wordmarks rather than copied logo artwork. All logos are trademarks
 * of their owners, shown only to identify the vehicles we work on (see the Disclaimer page).
 */
type Brand = { name: string; path?: string };
const BRANDS: Brand[] = [
  { name: "Toyota", path: siToyota.path },
  { name: "Honda", path: siHonda.path },
  { name: "Suzuki", path: siSuzuki.path },
  { name: "Lexus" },
  { name: "Nissan", path: siNissan.path },
  { name: "Mitsubishi", path: siMitsubishi.path },
  { name: "Daihatsu" },
  { name: "Mazda", path: siMazda.path },
  { name: "Hyundai", path: siHyundai.path },
  { name: "Kia", path: siKia.path },
  { name: "Mercedes-Benz" },
  { name: "BMW", path: siBmw.path },
  { name: "Audi", path: siAudi.path },
  { name: "Changan" },
  { name: "Haval" },
  { name: "MG", path: siMg.path },
  { name: "Proton", path: siProton.path },
  { name: "Subaru", path: siSubaru.path },
  { name: "Volkswagen", path: siVolkswagen.path },
  { name: "Chevrolet", path: siChevrolet.path },
];

function BrandItem({ brand }: { brand: Brand }) {
  return (
    <li className="flex h-16 shrink-0 items-center px-7 text-metal transition-colors duration-300 hover:text-brand sm:px-10">
      {brand.path ? (
        <svg viewBox="0 0 24 24" className="h-10 w-10 sm:h-12 sm:w-12" fill="currentColor" role="img" aria-label={brand.name}>
          <path d={brand.path} />
        </svg>
      ) : (
        <span className="whitespace-nowrap font-display text-xl font-semibold uppercase tracking-[.14em] sm:text-2xl">{brand.name}</span>
      )}
    </li>
  );
}

export function BrandMarquee() {
  return (
    <section aria-labelledby="brands-title" className="border-y border-white/8 bg-coal py-8">
      <h2 id="brands-title" className="container-x mb-5 text-center text-xs font-bold uppercase tracking-[.2em] text-metal">
        We service all makes — Japanese, Korean, European &amp; local
      </h2>
      <div className="marquee group relative overflow-hidden">
        <div className="marquee-track flex w-max">
          <ul className="flex" aria-label="Car makes we service">
            {BRANDS.map((b) => <BrandItem key={b.name} brand={b} />)}
          </ul>
          {/* Second copy makes the loop seamless; hidden from screen readers. */}
          <ul className="flex" aria-hidden="true">
            {BRANDS.map((b) => <BrandItem key={b.name} brand={b} />)}
          </ul>
        </div>
      </div>
    </section>
  );
}
