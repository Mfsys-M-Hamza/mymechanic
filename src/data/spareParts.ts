/**
 * Spare parts catalogue for the /spare-parts page.
 *
 * No prices or stock levels are published — availability depends on the vehicle, so
 * every part has an "Ask on WhatsApp" button that pre-fills the part name.
 *
 * Images: until real photos are supplied each part shows a placeholder illustration for
 * its category. To add a photo, put the optimised file in public/parts/ (e.g. a 1200px
 * wide .webp) and set `image: { src: "/parts/front-bumper.webp", width, height }`.
 */
export type PartCategory = "Body parts" | "Lights" | "Engine" | "Brakes" | "Suspension & steering" | "Oils & filters" | "Electrical" | "Cooling & AC";

export type SparePart = {
  id: string;
  name: string;
  category: PartCategory;
  /** One short line shown under the name. */
  note: string;
  image?: { src: string; width: number; height: number };
};

/** Category order for the filter chips, with the placeholder artwork each one uses. */
export const partCategories: { name: PartCategory; art: PartArtKey }[] = [
  { name: "Body parts", art: "body" },
  { name: "Lights", art: "light" },
  { name: "Engine", art: "engine" },
  { name: "Brakes", art: "brake" },
  { name: "Suspension & steering", art: "suspension" },
  { name: "Oils & filters", art: "oil" },
  { name: "Electrical", art: "battery" },
  { name: "Cooling & AC", art: "cooling" },
];

export type PartArtKey = "body" | "light" | "engine" | "brake" | "suspension" | "oil" | "battery" | "cooling";

export const spareParts: SparePart[] = [
  // Body parts
  { id: "front-bumper", name: "Front bumper", category: "Body parts", note: "Bumpers, grilles and brackets" },
  { id: "rear-bumper", name: "Rear bumper", category: "Body parts", note: "Including reinforcement bars" },
  { id: "bonnet", name: "Bonnet (hood)", category: "Body parts", note: "With hinges and latch" },
  { id: "fender", name: "Fender / wing", category: "Body parts", note: "Front and rear panels" },
  { id: "side-mirror", name: "Side mirror", category: "Body parts", note: "Manual and power-folding" },
  { id: "door-handle", name: "Door handles & locks", category: "Body parts", note: "Inner and outer handles" },

  // Lights
  { id: "headlight", name: "Headlight assembly", category: "Lights", note: "Halogen, projector and LED units" },
  { id: "tail-light", name: "Tail light", category: "Lights", note: "Left and right assemblies" },
  { id: "fog-lamp", name: "Fog lamps", category: "Lights", note: "With covers and wiring" },
  { id: "bulbs", name: "Bulbs & LED upgrades", category: "Lights", note: "Headlamp, indicator and interior" },

  // Engine
  { id: "spark-plugs", name: "Spark plugs", category: "Engine", note: "Standard and iridium" },
  { id: "ignition-coils", name: "Ignition coils", category: "Engine", note: "Coil packs and leads" },
  { id: "timing-kit", name: "Timing belt / chain kit", category: "Engine", note: "With tensioners and pulleys" },
  { id: "gaskets", name: "Gaskets & seals", category: "Engine", note: "Head, valve cover and oil seals" },
  { id: "engine-mounts", name: "Engine mounts", category: "Engine", note: "Engine and gearbox mounts" },
  { id: "fuel-injectors", name: "Fuel injectors", category: "Engine", note: "EFI injectors and O-rings" },

  // Brakes
  { id: "brake-pads", name: "Brake pads", category: "Brakes", note: "Front and rear sets" },
  { id: "brake-discs", name: "Brake discs (rotors)", category: "Brakes", note: "Solid and ventilated" },
  { id: "brake-shoes", name: "Brake shoes", category: "Brakes", note: "For drum brakes" },
  { id: "brake-fluid", name: "Brake fluid", category: "Brakes", note: "DOT 3 and DOT 4" },

  // Suspension & steering
  { id: "shock-absorbers", name: "Shock absorbers", category: "Suspension & steering", note: "Front struts and rear shocks" },
  { id: "ball-joints", name: "Ball joints & links", category: "Suspension & steering", note: "Stabiliser links included" },
  { id: "bushes", name: "Control arm bushes", category: "Suspension & steering", note: "Rubber and poly bushes" },
  { id: "tie-rods", name: "Tie-rod ends", category: "Suspension & steering", note: "Inner and outer" },

  // Oils & filters
  { id: "engine-oil", name: "Engine oil", category: "Oils & filters", note: "Including Liqui Moly oils" },
  { id: "oil-filter", name: "Oil filters", category: "Oils & filters", note: "For most local and Japanese cars" },
  { id: "air-filter", name: "Air filters", category: "Oils & filters", note: "Engine and cabin filters" },
  { id: "coolant", name: "Coolant", category: "Oils & filters", note: "Ready-mix and concentrate" },
  { id: "additives", name: "Additives & car care", category: "Oils & filters", note: "Fuel system and engine treatments" },

  // Electrical
  { id: "battery", name: "Batteries", category: "Electrical", note: "Tested and fitted on site" },
  { id: "alternator", name: "Alternators & starters", category: "Electrical", note: "New and reconditioned" },
  { id: "sensors", name: "Sensors", category: "Electrical", note: "O2, MAF, temperature and ABS" },
  { id: "fuses-relays", name: "Fuses & relays", category: "Electrical", note: "All common ratings" },

  // Cooling & AC
  { id: "radiator", name: "Radiators", category: "Cooling & AC", note: "With caps and hoses" },
  { id: "ac-compressor", name: "AC compressors", category: "Cooling & AC", note: "Compressors and clutches" },
  { id: "condenser", name: "AC condensers", category: "Cooling & AC", note: "And receiver-driers" },
  { id: "cooling-fan", name: "Cooling fans", category: "Cooling & AC", note: "Radiator and condenser fans" },
];
