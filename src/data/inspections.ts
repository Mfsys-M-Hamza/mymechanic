/**
 * Content for the /car-inspection page: inspection service cards, the process steps and FAQs.
 * No prices are published — the cost depends on the vehicle and the inspection chosen.
 */
import type { VisualKey } from "./services";

export type Inspection = {
  id: string;
  title: string;
  text: string;
  /** Three short check points shown on the card. */
  checks: string[];
  visual: VisualKey;
  /** Related service page, if any. */
  service?: string;
};

export const inspections: Inspection[] = [
  {
    id: "general",
    title: "General Car Inspection",
    text: "A complete health check of your car, so you know what needs attention now and what can wait.",
    checks: ["Fluids, belts & hoses", "Tyres, lights & battery", "Clear list of priorities"],
    visual: "inspection",
    service: "general-inspection",
  },
  {
    id: "pre-purchase",
    title: "Pre-Purchase Used Car Inspection",
    text: "Buying a used car? Bring it to us before you pay — we check it top to bottom so you know exactly what you are buying.",
    checks: ["Engine, gearbox & scan", "Body, paint & accident signs", "Findings to help you negotiate"],
    visual: "scanner",
    service: "general-inspection",
  },
  {
    id: "new-car",
    title: "New Car Pre-Delivery Inspection",
    text: "Collecting a new car? We check it before you accept delivery, so any fault, damage or missing item is caught early.",
    checks: ["Paint, panels & glass", "Electrics, AC & features", "Fluids, tyres & accessories"],
    visual: "inspection",
  },
  {
    id: "scan",
    title: "Computerized Scan & Diagnostics",
    text: "OBD scan of the engine and supported modules to read stored and pending fault codes and live sensor data.",
    checks: ["Engine & transmission codes", "ABS & airbag warnings", "Live data explained"],
    visual: "scanner",
    service: "computerized-scanning",
  },
  {
    id: "body",
    title: "Body, Paint & Accident Check",
    text: "A careful look for repainted panels, uneven gaps and signs of past accident or structural repair.",
    checks: ["Repainted & replaced panels", "Panel gaps & alignment", "Signs of structural repair"],
    visual: "inspection",
  },
  {
    id: "engine",
    title: "Engine & Transmission Check",
    text: "We listen, look and test for the faults that cost the most to fix later — before they become expensive.",
    checks: ["Leaks, smoke & noises", "Idle, power & misfires", "Gear shifts & clutch"],
    visual: "engine",
    service: "engine-diagnostics",
  },
  {
    id: "chassis",
    title: "Brakes, Suspension & Steering",
    text: "Safety-critical parts checked for wear, play and noise, so the car stops and handles the way it should.",
    checks: ["Brake pads & discs", "Shocks, bushes & joints", "Steering play & alignment"],
    visual: "suspension",
    service: "suspension-repair",
  },
  {
    id: "hybrid",
    title: "Hybrid System Check",
    text: "For Aqua, Prius, Vezel, Fit and other hybrids — the hybrid battery and system checked by hybrid specialists.",
    checks: ["Hybrid battery health", "Hybrid warning codes", "Battery cooling system"],
    visual: "hybrid",
    service: "hybrid-car-repair",
  },
  {
    id: "electrical",
    title: "Electrical & AC Check",
    text: "Everything electrical that you use every day, plus the air conditioning that matters in a Pakistani summer.",
    checks: ["Battery & charging", "Lights, windows & controls", "AC cooling & blower"],
    visual: "electrical",
    service: "electrical-diagnosis",
  },
  {
    id: "road-test",
    title: "Road Test",
    text: "A test drive with a mechanic to feel what a stationary check can't — how the car really drives.",
    checks: ["Engine & gearbox on the move", "Brakes & steering feel", "Rattles, knocks & vibration"],
    visual: "gear",
  },
];

export const inspectionSteps = [
  { title: "Book", text: "Use the booking form at the top of this page, or message us on WhatsApp with your car's details and a time that suits you." },
  { title: "Confirm", text: "Our team confirms your slot at Laiq Ali Chowk or New City Phase-1 by WhatsApp or phone." },
  { title: "Inspect", text: "Bring the car to the branch. Our mechanics carry out the inspection you chose — you're welcome to watch." },
  { title: "Explain", text: "We walk you through every finding in plain language, and give an estimate for anything that needs fixing." },
];

export const inspectionFaqs = [
  {
    q: "Should I get a used car inspected before buying?",
    a: "Yes. Many faults — accident repairs, engine or gearbox problems, worn suspension — aren't visible on a test drive. An inspection tells you what you're really buying and gives you facts to negotiate the price.",
  },
  {
    q: "How long does a car inspection take?",
    a: "Most inspections take around an hour. A full pre-purchase inspection with a road test can take longer — we'll give you an idea of timing when we confirm your booking.",
  },
  {
    q: "Can you inspect the car at the seller's location?",
    a: "Inspections are carried out at our two Wah Cantt branches, where we have the right equipment. Bring the car to Laiq Ali Chowk or New City Phase-1 with the seller's permission.",
  },
  {
    q: "Do you inspect hybrid and imported cars?",
    a: "Yes — we are EFI and hybrid specialists. We regularly work on Japanese imports and hybrids such as the Aqua, Prius, Vezel and Fit, including the hybrid battery and its warning codes.",
  },
  {
    q: "What is a new car pre-delivery inspection?",
    a: "A check of a brand-new car before you accept delivery — paint and panels, electrics, AC, features, fluids, tyres and accessories — so any problem is raised with the dealer before you sign.",
  },
  {
    q: "Does an inspection guarantee the car's condition?",
    a: "No. An inspection reports the car's condition at the time we check it, based on what can be tested without dismantling parts. It is not a warranty against future faults.",
  },
  {
    q: "Can I reschedule my appointment?",
    a: "Yes. Just message us on WhatsApp at 0312-5045678 and we'll move your booking to another available slot.",
  },
  {
    q: "What if the car is sold before the inspection?",
    a: "No problem — let us know on WhatsApp and we'll cancel the booking, or move it to the next car you want checked.",
  },
];
