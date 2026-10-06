/**
 * Blog posts. Add a new object to `posts` to publish an article — the page,
 * table of contents, reading time, schema and sitemap entry are generated.
 * All articles here are original content written for My Mechanic.pk.
 */
import type { VisualKey } from "./services";

export const blogCategories = [
  "Car Maintenance",
  "Engine Diagnostics",
  "Hybrid Vehicles",
  "Fuel Efficiency",
  "Brake & Suspension Care",
  "Seasonal Car Maintenance",
  "Air-Conditioning Maintenance",
  "Driving & Vehicle Safety",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogSection = { id: string; heading: string; paragraphs: string[]; list?: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  author: string;
  published: string;
  updated: string;
  visual: VisualKey;
  imageAlt: string;
  sections: BlogSection[];
  faqs: { q: string; a: string }[];
  relatedServices: string[];
};

const author = "My Mechanic.pk Workshop Team";

export const posts: BlogPost[] = [
  {
    slug: "check-engine-light-meaning",
    title: "Check Engine Light On? What It Means and What to Do Next",
    description:
      "A plain-language guide to the check-engine light: steady vs flashing, common causes, and why a computerized scan is the right first step.",
    category: "Engine Diagnostics",
    author,
    published: "2026-09-23",
    updated: "2026-09-23",
    visual: "scanner",
    imageAlt: "Illustration of a diagnostic scanner displaying a live engine data waveform",
    sections: [
      {
        id: "what-it-is",
        heading: "What the check-engine light actually is",
        paragraphs: [
          "The amber engine symbol on your dashboard is officially called the malfunction indicator lamp. It switches on when your car's engine computer detects a reading outside its expected range and stores a fault code.",
          "It does not always mean something serious — but it always means something has been recorded, and ignoring it can turn a small fix into a costly one.",
        ],
      },
      {
        id: "steady-or-flashing",
        heading: "Steady or flashing: why it matters",
        paragraphs: [
          "A steady light usually indicates a fault that should be checked soon. A flashing light typically signals an active misfire, which can send unburnt fuel into the exhaust and overheat the catalytic converter.",
          "If the light is flashing, reduce speed, avoid heavy acceleration and have the car checked as soon as possible.",
        ],
      },
      {
        id: "common-causes",
        heading: "Common causes we see in Wah Cantt and Taxila",
        paragraphs: ["Some of the most frequent reasons the light comes on include:"],
        list: [
          "A loose or faulty fuel cap causing an evaporative system code",
          "Worn spark plugs or a failing ignition coil",
          "A dirty or faulty mass airflow (MAF) or oxygen sensor",
          "Vacuum leaks from cracked hoses",
          "Catalytic converter efficiency below threshold",
        ],
      },
      {
        id: "why-scan",
        heading: "Why a computerized scan is the right first step",
        paragraphs: [
          "A diagnostic scan reads the exact code stored in the engine computer along with live sensor data. That tells a technician where to look, which is far better than replacing parts by guesswork.",
          "Keep in mind that a code points to a system, not always to a specific failed part. A good diagnosis combines the scan with physical testing.",
        ],
      },
      {
        id: "what-not-to-do",
        heading: "What not to do",
        paragraphs: [
          "Avoid simply clearing the code with a cheap reader and hoping for the best. If the fault is real, the light will return, and meanwhile you lose the stored information that helps diagnosis.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is it safe to drive with the check-engine light on?",
        a: "If the light is steady and the car drives normally, you can usually drive carefully to a workshop. If it is flashing or the car feels different, reduce driving and get it checked promptly.",
      },
      {
        q: "Can a scan tell me exactly which part has failed?",
        a: "A scan identifies the system and fault type. Further testing confirms which part is responsible.",
      },
    ],
    relatedServices: ["computerized-scanning", "engine-diagnostics", "efi-specialist"],
  },
  {
    slug: "improve-car-fuel-average",
    title: "7 Practical Ways to Improve Your Car's Fuel Average",
    description:
      "Simple maintenance and driving habits that help your car use less fuel on Wah Cantt and GT Road traffic — no gimmicks.",
    category: "Fuel Efficiency",
    author,
    published: "2026-09-23",
    updated: "2026-09-23",
    visual: "injector",
    imageAlt: "Illustration of a fuel injector spraying an even mist of fuel",
    sections: [
      {
        id: "tyre-pressure",
        heading: "1. Keep tyres at the correct pressure",
        paragraphs: [
          "Under-inflated tyres increase rolling resistance, so the engine works harder. Check pressure monthly using the figures on the sticker inside the driver's door, and check when tyres are cold.",
        ],
      },
      {
        id: "air-filter",
        heading: "2. Replace a dirty air filter",
        paragraphs: [
          "Dusty conditions clog air filters quickly. A restricted filter can affect performance, and it is one of the cheapest items to check at every service.",
        ],
      },
      {
        id: "spark-plugs",
        heading: "3. Replace spark plugs on schedule",
        paragraphs: [
          "Worn plugs cause weak combustion and misfires, which waste fuel. Follow your manual's interval rather than waiting for symptoms.",
        ],
      },
      {
        id: "injectors-sensors",
        heading: "4. Keep injectors and sensors healthy",
        paragraphs: [
          "Clogged injectors or a faulty oxygen sensor can push the engine into a rich mixture. A computerized scan shows fuel-trim data that reveals these problems.",
        ],
      },
      {
        id: "driving-style",
        heading: "5. Drive smoothly",
        paragraphs: [
          "Hard acceleration and late braking burn fuel. Anticipate traffic, accelerate gradually and maintain a steady speed on roads like the GT Road or the motorway.",
        ],
      },
      {
        id: "weight-and-ac",
        heading: "6. Reduce unnecessary load and use the AC wisely",
        paragraphs: [
          "Extra weight in the boot adds up. The AC also uses engine power; a well-maintained AC cools efficiently and doesn't have to work as hard.",
        ],
      },
      {
        id: "servicing",
        heading: "7. Stay on top of servicing",
        paragraphs: [
          "Fresh oil of the correct grade reduces friction. Regular servicing keeps every system working together as designed.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why did my fuel average suddenly drop?",
        a: "A sudden drop often points to a fault — a sensor, injector, dragging brake or low tyre pressure. A scan and inspection is the fastest way to find out.",
      },
    ],
    relatedServices: ["fuel-injector-cleaning", "engine-tuning", "efi-specialist"],
  },
  {
    slug: "hybrid-car-maintenance-guide",
    title: "Hybrid Car Maintenance: What Owners in Pakistan Should Know",
    description:
      "How hybrid maintenance differs from a regular car — battery cooling, inverter coolant, brakes and the checks that protect expensive parts.",
    category: "Hybrid Vehicles",
    author,
    published: "2026-09-23",
    updated: "2026-09-23",
    visual: "hybrid",
    imageAlt: "Illustration of a hybrid battery pack with energy flowing to an electric motor",
    sections: [
      {
        id: "how-hybrids-work",
        heading: "How a hybrid differs from a regular car",
        paragraphs: [
          "A hybrid combines a petrol engine with one or more electric motors powered by a high-voltage battery. The car's computer constantly decides which to use, which is why hybrids are so efficient in stop-start traffic.",
        ],
      },
      {
        id: "battery-cooling",
        heading: "The hybrid battery needs clean cooling air",
        paragraphs: [
          "Many hybrids cool the battery with a fan that draws air from the cabin. Dust and pet hair can block the intake or filter, and a hot battery ages faster.",
          "Having the cooling fan and filter inspected and cleaned is a simple step that helps protect one of the most expensive parts of the car.",
        ],
      },
      {
        id: "inverter-coolant",
        heading: "Don't forget the inverter coolant",
        paragraphs: [
          "The inverter, which controls the electric motor, often has its own cooling circuit separate from the engine. Its coolant level and pump should be checked as part of routine service.",
        ],
      },
      {
        id: "regular-items",
        heading: "Regular maintenance still matters",
        paragraphs: ["Hybrids still need:"],
        list: [
          "Engine oil and filter changes at the recommended interval",
          "Air and cabin filters",
          "Brake fluid changes and brake inspections",
          "12V battery checks — a weak 12V battery can stop a hybrid from starting",
        ],
      },
      {
        id: "warning-signs",
        heading: "Warning signs to watch",
        paragraphs: [
          "A drop in fuel average, the engine running more often, rapidly changing battery charge levels or a hybrid system warning are all reasons to have the car scanned.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do hybrid brakes wear out slower?",
        a: "Often yes, because regenerative braking does part of the work. But the brakes still need inspection and brake fluid still needs changing.",
      },
      {
        q: "Is it safe for a regular workshop to work on a hybrid?",
        a: "High-voltage components require correct safety procedures and suitable scan tools. Ask the workshop about their hybrid experience before booking.",
      },
    ],
    relatedServices: ["hybrid-car-repair", "battery-charging", "computerized-scanning"],
  },
  {
    slug: "brake-warning-signs",
    title: "5 Brake Warning Signs You Should Never Ignore",
    description:
      "Squealing, grinding, a soft pedal or pulling to one side — what these brake symptoms mean and when to get your car checked.",
    category: "Brake & Suspension Care",
    author,
    published: "2026-09-23",
    updated: "2026-09-23",
    visual: "brake",
    imageAlt: "Illustration of a ventilated brake disc and caliper",
    sections: [
      {
        id: "squealing",
        heading: "1. High-pitched squealing",
        paragraphs: [
          "Many brake pads have a small metal wear indicator that squeals when the pad is getting thin. It is designed to warn you early — get the pads checked soon.",
        ],
      },
      {
        id: "grinding",
        heading: "2. Grinding or scraping",
        paragraphs: [
          "Grinding often means the pad material is gone and metal is contacting the disc. This damages the disc quickly and reduces braking ability. Stop driving as much as possible and have it inspected.",
        ],
      },
      {
        id: "soft-pedal",
        heading: "3. Soft or sinking pedal",
        paragraphs: [
          "A spongy pedal can indicate air or moisture in the brake fluid or a leak. It is a safety issue that should be checked immediately.",
        ],
      },
      {
        id: "pulling",
        heading: "4. Car pulls to one side while braking",
        paragraphs: [
          "Uneven braking can come from a sticking caliper, contaminated pads or a suspension problem. It makes emergency stops less predictable.",
        ],
      },
      {
        id: "vibration",
        heading: "5. Vibration through the pedal or steering",
        paragraphs: [
          "Vibration under braking often indicates uneven disc surfaces. Long downhill stretches — such as the roads toward Murree — can heat brakes significantly, so good brakes matter.",
        ],
      },
    ],
    faqs: [
      {
        q: "How often should I have my brakes checked?",
        a: "At every service, and any time you notice a change in noise, feel or stopping distance.",
      },
    ],
    relatedServices: ["brake-service", "suspension-repair", "general-inspection"],
  },
  {
    slug: "car-ac-summer-checklist",
    title: "Car AC Not Cooling? A Summer Checklist for Wah Cantt Drivers",
    description:
      "Why your car AC loses its chill, what you can check yourself, and when to visit a workshop for leak testing and servicing.",
    category: "Air-Conditioning Maintenance",
    author,
    published: "2026-09-23",
    updated: "2026-09-23",
    visual: "ac",
    imageAlt: "Illustration of a car AC condenser fan with cool airflow lines",
    sections: [
      {
        id: "why-ac-weakens",
        heading: "Why car AC loses its cooling",
        paragraphs: [
          "Weak cooling can come from low refrigerant due to a leak, a condenser blocked by dust and insects, a failing cooling fan, a slipping compressor clutch, or simply a clogged cabin filter.",
        ],
      },
      {
        id: "diy-checks",
        heading: "Quick checks you can do yourself",
        paragraphs: ["Before booking, try these:"],
        list: [
          "Check that the condenser fan runs when the AC is switched on",
          "Look at the condenser in front of the radiator for heavy dirt or debris",
          "Make sure the recirculation mode works in very hot weather",
          "Notice whether airflow is weak (possible cabin filter) or air is warm (possible refrigerant or compressor issue)",
        ],
      },
      {
        id: "gas-top-up",
        heading: "The problem with repeated gas top-ups",
        paragraphs: [
          "An AC system is sealed. If it needs gas every season, it is leaking. Finding and fixing the leak is usually better value than repeated refills.",
        ],
      },
      {
        id: "winter-too",
        heading: "Don't forget the heater and demister",
        paragraphs: [
          "The same blower and controls also power your heater and windscreen demisting in winter. Checking both together keeps the car comfortable and safe year-round.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why does my AC smell bad?",
        a: "Odours are often caused by moisture and bacteria on the evaporator or a dirty cabin filter. Cleaning and replacing the filter usually helps.",
      },
    ],
    relatedServices: ["ac-heater-maintenance", "electrical-diagnosis", "preventive-maintenance"],
  },
  {
    slug: "winter-car-care-wah-cantt",
    title: "Winter Car Care: Preparing Your Car for Cold Mornings",
    description:
      "Battery, coolant, tyres and visibility checks to prepare your car for winter in Wah Cantt, Taxila and trips to the northern areas.",
    category: "Seasonal Car Maintenance",
    author,
    published: "2026-09-23",
    updated: "2026-09-23",
    visual: "battery",
    imageAlt: "Illustration of a car battery being tested with a charging indicator",
    sections: [
      {
        id: "battery",
        heading: "Test the battery before it lets you down",
        paragraphs: [
          "Cold weather reduces a battery's ability to deliver current, while a cold engine needs more to start. A battery that was fine in summer can struggle on a foggy December morning. A quick health test tells you where it stands.",
        ],
      },
      {
        id: "coolant",
        heading: "Check coolant concentration",
        paragraphs: [
          "Coolant protects against overheating and also against freezing if you travel north toward Murree or beyond. Use the correct coolant and mix recommended for your car.",
        ],
      },
      {
        id: "visibility",
        heading: "Make sure you can see and be seen",
        paragraphs: ["Winter fog reduces visibility, so check:"],
        list: [
          "Headlights, tail lights and fog lights",
          "Wiper blades and washer fluid",
          "Heater and demister performance",
        ],
      },
      {
        id: "tyres",
        heading: "Look at tyre tread and pressure",
        paragraphs: [
          "Tyre pressure drops in cold weather. Worn tread also reduces grip on wet roads. Check both before winter travel.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I warm up my engine for a long time in winter?",
        a: "Modern fuel-injected engines need only a short idle before gentle driving. Long idling wastes fuel.",
      },
    ],
    relatedServices: ["battery-charging", "ac-heater-maintenance", "preventive-maintenance"],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export function readingMinutes(p: BlogPost) {
  const words = p.sections
    .flatMap((s) => [s.heading, ...s.paragraphs, ...(s.list ?? [])])
    .concat(p.faqs.flatMap((f) => [f.q, f.a]))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
}

export function relatedPosts(p: BlogPost, count = 3) {
  const shared = (o: BlogPost) => o.relatedServices.filter((s) => p.relatedServices.includes(s)).length;
  return posts
    .filter((o) => o.slug !== p.slug)
    .sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category) || shared(b) - shared(a))
    .slice(0, count);
}
