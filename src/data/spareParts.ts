/**
 * Products shown on the /spare-parts page — real stock photographed at the workshop
 * (supplied by the client, October 2026).
 *
 * No prices or stock levels are published: grades and pack sizes vary, so every card has an
 * "Ask availability" button that opens WhatsApp with the product name filled in.
 *
 * To add a product: put a photo in assets/media/parts/, save a ~1200px .webp copy in
 * public/parts/, and add an entry below with its `image` size.
 */
export type PartCategory =
  | "Engine oils"
  | "Transmission fluids"
  | "Brake fluids"
  | "Coolants & radiator care"
  | "Fuel & engine treatments"
  | "Catalytic converter cleaners";

export type SparePart = {
  id: string;
  name: string;
  category: PartCategory;
  /** Short description shown on the card. */
  note: string;
  image: { src: string; width: number; height: number };
};

/** Category order for the filter chips. */
export const partCategories: PartCategory[] = [
  "Engine oils",
  "Transmission fluids",
  "Brake fluids",
  "Coolants & radiator care",
  "Fuel & engine treatments",
  "Catalytic converter cleaners",
];

const img = (file: string, width: number, height: number) => ({ src: `/parts/${file}.webp`, width, height });

export const spareParts: SparePart[] = [
  // Engine oils
  {
    id: "toyota-motor-oil",
    name: "Toyota Genuine Motor Oil",
    category: "Engine oils",
    note: "Toyota-branded engine oils in several grades, made for Corolla, Yaris, Prius and other Toyota petrol and hybrid engines.",
    image: img("toyota-motor-oil", 1200, 900),
  },
  {
    id: "honda-engine-oil",
    name: "Honda Genuine Engine Oil",
    category: "Engine oils",
    note: "Honda genuine oils in 0W-20, 5W-30 and 10W-30 — the grades Honda specifies for Civic, City, Fit and Vezel engines.",
    image: img("honda-engine-oil", 1200, 900),
  },
  {
    id: "kixx-g1",
    name: "Kixx G1 Engine Oil",
    category: "Engine oils",
    note: "Kixx G1 synthetic-technology oils in 5W-30, 10W-40 and 20W-50 for everyday petrol cars.",
    image: img("kixx-g1", 1200, 900),
  },
  {
    id: "shell-helix",
    name: "Shell Helix HX6 & HX3",
    category: "Engine oils",
    note: "Shell Helix HX6 10W-40 semi-synthetic and HX3 20W-50 mineral oils — dependable protection for local and older engines.",
    image: img("shell-helix", 1200, 900),
  },
  {
    id: "zic-x5-x7",
    name: "ZIC X5 & X7 Engine Oil",
    category: "Engine oils",
    note: "SK ZIC X5 and fully synthetic X7 oils for smooth running, good fuel economy and long drain intervals.",
    image: img("zic-x5-x7", 1200, 900),
  },
  {
    id: "liqui-moly-car-oil",
    name: "Liqui Moly Car Engine Oils",
    category: "Engine oils",
    note: "German-made Liqui Moly oils, including Molygen 0W-20 and 5W-30 and 10W-40 — premium protection for modern engines.",
    image: img("liqui-moly-car-oil", 1200, 900),
  },
  {
    id: "liqui-moly-motorbike-oil",
    name: "Liqui Moly Motorbike 4T Street",
    category: "Engine oils",
    note: "Liqui Moly 4-stroke motorbike oils in 10W-40 and 20W-50, made for bikes with a wet clutch.",
    image: img("liqui-moly-motorbike-oil", 1200, 900),
  },

  // Transmission fluids
  {
    id: "honda-transmission-fluids",
    name: "Honda Transmission Fluids",
    category: "Transmission fluids",
    note: "Honda genuine CVTF, MTF, ATF DW-1 and HCF-2 (for hybrid gearboxes) — the correct fluid for each Honda transmission.",
    image: img("honda-transmission-fluids", 1200, 900),
  },
  {
    id: "toyota-transmission-fluids",
    name: "Toyota Transmission Fluids",
    category: "Transmission fluids",
    note: "Toyota genuine CVT Fluid TC and FE, ATF WS and T-IV, and GL-4 75W-90 manual gear oil.",
    image: img("toyota-transmission-fluids", 1200, 900),
  },

  // Brake fluids
  {
    id: "brake-fluids",
    name: "Brake & Clutch Fluids",
    category: "Brake fluids",
    note: "Seiken BF3 (DOT 3) and BF4 (DOT 4), Honda brake & clutch fluid and Liqui Moly DOT 4 — for a firm, safe pedal.",
    image: img("brake-fluids", 1200, 900),
  },

  // Coolants & radiator care
  {
    id: "long-life-coolant",
    name: "Long Life Coolant (VIC & Aisin)",
    category: "Coolants & radiator care",
    note: "Japanese long life coolants from VIC and Aisin, ready to use — protect against overheating and corrosion.",
    image: img("long-life-coolant", 1200, 900),
  },
  {
    id: "carrera-radiator-coolant",
    name: "Carrera Radiator Coolant",
    category: "Coolants & radiator care",
    note: "Carrera radiator coolant in red and green, for year-round engine cooling.",
    image: img("carrera-radiator-coolant", 900, 1200),
  },
  {
    id: "flamingo-radiator-flush",
    name: "Flamingo Radiator Flush",
    category: "Coolants & radiator care",
    note: "Cleans rust, scale and sludge from the cooling system before fresh coolant goes in.",
    image: img("flamingo-radiator-flush", 900, 1200),
  },

  // Fuel & engine treatments
  {
    id: "flamingo-injector-cleaner",
    name: "Flamingo Fuel Injector Cleaner",
    category: "Fuel & engine treatments",
    note: "Add to the fuel tank to clear injector deposits, smooth the idle and help restore fuel economy.",
    image: img("flamingo-injector-cleaner", 900, 1200),
  },
  {
    id: "motul-fuel-system-clean",
    name: "Motul Fuel System Clean",
    category: "Fuel & engine treatments",
    note: "Professional petrol additive (300 ml) that cleans injectors, valves and combustion chambers.",
    image: img("motul-fuel-system-clean", 900, 1200),
  },
  {
    id: "7cf-injector-cleaner",
    name: "7CF Injector Cleaner Spray",
    category: "Fuel & engine treatments",
    note: "Aerosol cleaner for injectors and the throttle body — removes gum and varnish to smooth out rough idling.",
    image: img("7cf-injector-cleaner", 900, 1200),
  },
  {
    id: "flamingo-motor-flush",
    name: "Flamingo Motor Flush",
    category: "Fuel & engine treatments",
    note: "Engine flush used just before an oil change to dissolve sludge, so the new oil starts clean.",
    image: img("flamingo-motor-flush", 900, 1200),
  },
  {
    id: "us-petroleum-treatment",
    name: "U.S. Premium Petroleum Treatment",
    category: "Fuel & engine treatments",
    note: "Concentrated oil treatment added to engine oil to reduce friction, wear and oil burning in older engines.",
    image: img("us-petroleum-treatment", 900, 1200),
  },

  // Catalytic converter cleaners
  {
    id: "silverstone-catawash",
    name: "Silverstone Catawash",
    category: "Catalytic converter cleaners",
    note: "Catalytic converter cleaner that helps clear carbon build-up and restore exhaust flow.",
    image: img("silverstone-catawash", 900, 1200),
  },
  {
    id: "klenzer-rx2",
    name: "Klenzer Rx-2 Catalytic Cleaner",
    category: "Catalytic converter cleaners",
    note: "Fuel-tank additive that cleans the catalytic converter and fuel system to help cut emissions and restore power.",
    image: img("klenzer-rx2", 900, 1200),
  },
];
