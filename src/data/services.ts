/**
 * Service catalogue. Each entry generates its own page at /services/<slug>.
 *
 * - `enabled: false` hides a service everywhere (pages, menus, sitemap, schema).
 * - `visual` picks the animated illustration (see src/components/visuals/ServiceVisual.tsx).
 * - No prices are published on purpose: final cost depends on inspection.
 */

export type VisualKey =
  | "scanner" | "engine" | "injector" | "catalytic" | "hybrid" | "ac" | "piston"
  | "suspension" | "brake" | "oil" | "battery" | "inspection" | "electrical" | "gear" | "tow";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  visual: VisualKey;
  featured?: boolean;
  enabled: boolean;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  intro: string[];
  signs: string[];
  benefits: string[];
  included: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

const all: Service[] = [
  {
    slug: "efi-specialist",
    name: "EFI Specialist Services",
    shortName: "EFI Specialist",
    visual: "injector",
    featured: true,
    enabled: true,
    seoTitle: "EFI Specialist in Wah Cantt — Fuel Injection Diagnosis & Repair",
    seoDescription:
      "EFI (electronic fuel injection) diagnosis and repair in Wah Cantt: sensors, throttle body, injectors and fuel pressure. Book via WhatsApp.",
    summary: "Diagnosis and repair of electronic fuel injection systems, sensors and throttle bodies.",
    intro: [
      "Almost every petrol car on Pakistani roads today uses electronic fuel injection (EFI). A network of sensors tells the engine computer how much air is coming in, how hot the engine is and how hard you are pressing the accelerator, and the computer decides exactly how much fuel each injector should spray.",
      "When one sensor reports a wrong value, the whole mixture goes off balance. Our EFI work starts with a computerized scan and live-data check so we can find the real cause instead of replacing parts by guesswork.",
    ],
    signs: [
      "Check-engine light is on or flashing",
      "Rough or unstable idle, especially when the AC is on",
      "Hard starting when the engine is cold or hot",
      "Hesitation or jerking when you accelerate",
      "Fuel average has dropped noticeably",
    ],
    benefits: [
      "Smoother idle and more responsive acceleration",
      "Better fuel economy when the mixture is correct",
      "Fault found with data, which avoids unnecessary part replacement",
      "Lower emissions and less strain on the catalytic converter",
    ],
    included: [
      "Computerized fault-code scan and live sensor data review",
      "Testing of MAF/MAP, oxygen, coolant temperature and throttle position sensors",
      "Throttle body inspection and cleaning where required",
      "Fuel pressure and injector operation checks",
      "Clear report of findings and a quote before any repair",
    ],
    faqs: [
      {
        q: "Can you work on EFI systems of Japanese and Korean cars?",
        a: "Yes. We work on the EFI systems of common petrol cars in Pakistan, including popular Japanese and Korean models. Please share your car's make, model and year on WhatsApp so we can confirm before your visit.",
      },
      {
        q: "Will clearing the check-engine light fix the problem?",
        a: "No. Clearing a code only switches the light off. If the underlying fault is still there, the light will return. We find and repair the cause first.",
      },
    ],
    related: ["computerized-scanning", "fuel-injector-cleaning", "engine-tuning"],
  },
  {
    slug: "computerized-scanning",
    name: "Computerized Vehicle Scanning",
    shortName: "Computerized Scanning",
    visual: "scanner",
    featured: true,
    enabled: true,
    seoTitle: "Car Computerized Scanning in Wah Cantt — OBD Diagnostic Scan",
    seoDescription:
      "Computerized OBD car scanning in Wah Cantt. Read fault codes, live data and warning lights explained in plain language.",
    summary: "OBD diagnostic scan to read fault codes and live data from your car's computer.",
    intro: [
      "Modern cars constantly monitor themselves. When something goes wrong, the engine control unit stores a fault code — often before you notice any symptom. A computerized scan connects our diagnostic equipment to your car's OBD port to read those codes and watch live sensor data while the engine runs.",
      "A code tells us where to look, not always what to replace. We combine the scan with a physical check so you get an accurate explanation and a sensible repair plan.",
    ],
    signs: [
      "Any warning light on the dashboard",
      "The car feels weaker than usual or uses more fuel",
      "You are buying a used car and want to check its condition",
      "An intermittent fault that comes and goes",
      "Before a long trip, as a health check",
    ],
    benefits: [
      "Finds faults early, before they cause bigger damage",
      "Reduces guesswork and unnecessary part replacement",
      "Gives you clear information before paying for repairs",
      "Useful evidence when buying or selling a used car",
    ],
    included: [
      "Connection to the OBD-II port with professional diagnostic equipment",
      "Reading stored, pending and permanent fault codes",
      "Live data review of key engine sensors",
      "Explanation of results in plain language",
      "Repair recommendations and an estimate on request",
    ],
    faqs: [
      {
        q: "How long does a scan take?",
        a: "A basic scan is usually quick. If the scan reveals a fault that needs deeper testing, we will tell you how long that is likely to take before we continue.",
      },
    ],
    related: ["engine-diagnostics", "efi-specialist", "general-inspection"],
  },
  {
    slug: "engine-tuning",
    name: "Computerized Engine Tuning",
    shortName: "Computerized Tuning",
    visual: "engine",
    featured: true,
    enabled: true,
    seoTitle: "Computerized Engine Tuning in Wah Cantt — Car Tune-Up",
    seoDescription:
      "Computerized engine tuning in Wah Cantt: spark plugs, ignition, idle and air-fuel checks with diagnostic equipment for smoother running and better average.",
    summary: "A data-led tune-up covering ignition, air-fuel mixture, idle and throttle adaptation.",
    intro: [
      "A tune-up used to mean adjusting the carburettor by ear. On a modern car, tuning means checking every part that affects combustion — spark plugs, ignition coils, air intake, throttle and sensors — and using diagnostic equipment to confirm the engine is running within its designed values.",
      "Where supported by the vehicle, we also perform relearn and adaptation procedures (such as idle or throttle relearn) after cleaning or part replacement, so the engine computer works with accurate information.",
    ],
    signs: [
      "Engine vibrates at idle or when stopped at signals",
      "Poor pick-up and sluggish overtaking",
      "Fuel consumption higher than usual",
      "Engine misfires or feels uneven",
      "It has been a long time since the last tune-up",
    ],
    benefits: [
      "Smoother, quieter engine operation",
      "Improved throttle response",
      "Fuel economy restored toward normal levels",
      "Early detection of weak coils, plugs or sensors",
    ],
    included: [
      "Pre-tune computerized scan and live-data check",
      "Spark plug inspection and replacement if due",
      "Ignition coil and misfire testing",
      "Air filter and throttle body check and cleaning",
      "Idle/throttle relearn where the vehicle supports it",
      "Post-tune scan to confirm results",
    ],
    faqs: [
      {
        q: "Does computerized tuning increase horsepower?",
        a: "Our tuning service restores the engine to healthy factory operation. It is not ECU remapping for extra power. Any improvement you feel comes from fixing what had worn out or drifted.",
      },
      {
        q: "How often should I get my car tuned?",
        a: "Follow your owner's manual for spark plug and filter intervals. If you notice rough running or a drop in average, a scan and tune-up is a sensible first step.",
      },
    ],
    related: ["computerized-scanning", "engine-decarbonization", "fuel-injector-cleaning"],
  },
  {
    slug: "catalytic-converter-cleaning",
    name: "Catalytic Converter Cleaning",
    shortName: "Catalytic Converter Cleaning",
    visual: "catalytic",
    featured: true,
    enabled: true,
    seoTitle: "Catalytic Converter Cleaning in Wah Cantt",
    seoDescription:
      "Catalytic converter cleaning in Wah Cantt for cars with restricted exhaust flow, low power or catalyst efficiency codes. Inspection first, honest advice.",
    summary: "Restores exhaust flow in partially clogged converters after the root cause is fixed.",
    intro: [
      "The catalytic converter sits in the exhaust and turns harmful gases into less harmful ones. Over time, carbon and oil deposits can coat the inside, restricting exhaust flow and reducing its efficiency — especially if the engine has been running rich or burning oil.",
      "Cleaning can help a converter that is partially clogged but still physically intact. If the internal honeycomb is broken or melted, cleaning will not help and we will tell you so. We also check why the converter clogged in the first place, so the problem does not return.",
    ],
    signs: [
      "Noticeable loss of power, especially uphill or at higher speeds",
      "Rotten-egg (sulphur) smell from the exhaust",
      "Check-engine light with catalyst efficiency codes (e.g. P0420)",
      "Engine feels choked or struggles to rev",
      "Rattling from under the car",
    ],
    benefits: [
      "Improved exhaust flow and engine breathing",
      "Can restore lost performance in partially clogged converters",
      "Cleaner emissions",
      "A lower-cost option to try before replacement, where suitable",
    ],
    included: [
      "Computerized scan for catalyst and oxygen sensor codes",
      "Inspection for physical damage and rattling",
      "Check of root causes such as misfires, oil burning or rich mixture",
      "Cleaning procedure suited to the converter's condition",
      "Post-service scan and road-test check",
    ],
    faqs: [
      {
        q: "Will cleaning fix every catalytic converter?",
        a: "No. Cleaning helps converters with deposits, not ones that are cracked, melted or broken inside. We inspect first and only recommend cleaning when it is likely to help.",
      },
      {
        q: "Why did my catalytic converter clog?",
        a: "Common causes are misfires, a rich fuel mixture, or oil and coolant entering the combustion chamber. We check these so the converter is not damaged again.",
      },
    ],
    related: ["engine-decarbonization", "efi-specialist", "engine-diagnostics"],
  },
  {
    slug: "fuel-injector-cleaning",
    name: "Fuel Injector Cleaning",
    shortName: "Fuel Injectors Cleaning",
    visual: "injector",
    featured: true,
    enabled: true,
    seoTitle: "Fuel Injector Cleaning in Wah Cantt",
    seoDescription:
      "Fuel injector cleaning and testing in Wah Cantt to restore spray pattern, smooth idle and fuel average. Diagnosis first, then cleaning.",
    summary: "Cleaning and testing of injectors to restore a proper fuel spray pattern.",
    intro: [
      "Fuel injectors spray a fine, precisely timed mist of fuel into the engine. Fuel quality, deposits and age can partially block the tiny nozzles, so the spray becomes uneven or drips instead of atomising.",
      "Dirty injectors make the engine run lean on some cylinders and rich on others. Cleaning restores the spray so each cylinder receives the fuel it needs.",
    ],
    signs: [
      "Rough idle or engine shaking",
      "Misfires on one or more cylinders",
      "Hesitation when pressing the accelerator",
      "Higher fuel consumption",
      "Fuel smell or difficult starting",
    ],
    benefits: [
      "More even fuel delivery across cylinders",
      "Smoother idle and better throttle response",
      "Can help restore fuel average",
      "Reduces carbon build-up caused by poor atomisation",
    ],
    included: [
      "Computerized scan for misfire and fuel-trim data",
      "Injector electrical and operation checks",
      "Cleaning method chosen to suit the vehicle and condition",
      "Seal/O-ring inspection where injectors are removed",
      "Post-cleaning scan and test drive",
    ],
    faqs: [
      {
        q: "Are fuel additives enough to clean injectors?",
        a: "Additives can help with light deposits as ongoing maintenance, but heavily clogged injectors usually need professional cleaning and testing.",
      },
      {
        q: "Does injector cleaning suit diesel vehicles?",
        a: "Diesel injection systems are different and some require specialist equipment. Please message us your vehicle details and we will advise honestly whether we can help.",
      },
    ],
    related: ["efi-specialist", "engine-tuning", "engine-decarbonization"],
  },
  {
    slug: "hybrid-car-repair",
    name: "Hybrid Car Repair & Maintenance",
    shortName: "Hybrid Car Repair",
    visual: "hybrid",
    featured: true,
    enabled: true,
    seoTitle: "Hybrid Car Repair & Maintenance in Wah Cantt",
    seoDescription:
      "Hybrid car diagnosis, maintenance and repair in Wah Cantt: hybrid system scans, battery health checks, inverter cooling and routine servicing.",
    summary: "Diagnosis and servicing of hybrid systems, batteries, cooling and routine maintenance.",
    intro: [
      "Hybrid cars combine a petrol engine with an electric motor and a high-voltage battery. They are efficient and reliable, but they have systems a regular workshop may not be equipped to diagnose — the hybrid battery, inverter, its separate cooling circuit and the software that manages them.",
      "We scan hybrid-specific modules, check battery and cooling health, and carry out the regular maintenance hybrids still need, such as oil, filters and brakes. High-voltage components are handled only with correct safety procedures.",
    ],
    signs: [
      "Hybrid system warning or 'check hybrid system' message",
      "Fuel average has dropped significantly",
      "Engine runs more often than it used to",
      "Battery charge level swings quickly up and down",
      "Cooling fan noise from the hybrid battery area",
    ],
    benefits: [
      "Hybrid faults diagnosed with appropriate scan tools",
      "Early warning of battery or cooling problems",
      "Helps protect costly hybrid components",
      "Routine maintenance done with hybrid-specific care",
    ],
    included: [
      "Hybrid system and module scan",
      "Hybrid battery health check",
      "Battery cooling fan and filter inspection and cleaning",
      "Inverter coolant level check",
      "Routine service items: oil, filters, brakes and 12V battery",
    ],
    faqs: [
      {
        q: "Can a weak hybrid battery be repaired instead of replaced?",
        a: "Sometimes. It depends on the cause and the condition of the battery. We test first and explain the options before recommending anything.",
      },
      {
        q: "Do hybrids need regular servicing?",
        a: "Yes. Hybrids still need engine oil, filters, brake checks and coolant maintenance, plus care for the battery cooling system.",
      },
    ],
    related: ["computerized-scanning", "battery-charging", "preventive-maintenance"],
  },
  {
    slug: "ac-heater-maintenance",
    name: "Air Conditioner & Heater Maintenance",
    shortName: "AC & Heater Maintenance",
    visual: "ac",
    featured: true,
    enabled: true,
    seoTitle: "Car AC Repair & Heater Maintenance in Wah Cantt",
    seoDescription:
      "Car AC repair, gas check, leak testing and heater maintenance in Wah Cantt. Stay cool in summer and warm in winter. Inspection before repair.",
    summary: "AC cooling checks, leak testing, gas service and heater system maintenance.",
    intro: [
      "Wah Cantt and Taxila summers put car air conditioning under heavy load, and winter mornings demand a heater and demister that actually work. Both systems share components like the blower, cabin filter and controls.",
      "We check the full system — not just the gas — because weak cooling can come from a leak, a clogged condenser, a failing compressor clutch, electrical faults or a blocked cabin filter.",
    ],
    signs: [
      "AC blows warm or only slightly cool air",
      "Weak airflow from the vents",
      "Bad smell when the AC is switched on",
      "Unusual noise when the compressor engages",
      "Heater takes too long to warm up or windscreen fogs easily",
    ],
    benefits: [
      "Comfortable cabin in summer and winter",
      "Better air quality with a clean cabin filter",
      "Leaks found before repeated gas top-ups waste money",
      "Clear demisting for safer winter driving",
    ],
    included: [
      "Vent temperature and system pressure check",
      "Leak inspection",
      "Refrigerant service where needed",
      "Condenser, fan and compressor clutch check",
      "Cabin filter inspection and blower check",
      "Heater core flow and thermostat check",
    ],
    faqs: [
      {
        q: "Why does my car AC need gas again and again?",
        a: "A properly sealed AC system should not keep losing gas. Repeated top-ups usually point to a leak. We look for the leak before refilling.",
      },
      {
        q: "Can a dirty cabin filter affect cooling?",
        a: "Yes. A clogged cabin filter reduces airflow, which makes the AC feel weak and can cause odours.",
      },
    ],
    related: ["electrical-diagnosis", "preventive-maintenance", "general-inspection"],
  },
  {
    slug: "engine-decarbonization",
    name: "Engine Decarbonization",
    shortName: "Engine Decarbonization",
    visual: "piston",
    featured: true,
    enabled: true,
    seoTitle: "Engine Decarbonization (Carbon Cleaning) in Wah Cantt",
    seoDescription:
      "Engine decarbonization in Wah Cantt to remove carbon deposits from intake, valves and combustion chambers. Inspection first to confirm suitability.",
    summary: "Removal of carbon deposits from intake, valves and combustion chambers.",
    intro: [
      "Short trips, traffic and fuel quality all leave carbon deposits inside the engine — on the valves, pistons, intake and throttle body. Heavy carbon can reduce airflow, cause knocking and lower efficiency.",
      "Decarbonization cleans these deposits. We first check the engine's condition, because carbon is often a symptom of another issue such as oil burning or a rich mixture that should be fixed too.",
    ],
    signs: [
      "Engine knocking or pinging under load",
      "Loss of power and slow pick-up",
      "Rough idle",
      "Increased fuel consumption",
      "Black smoke or sooty exhaust",
    ],
    benefits: [
      "Improved airflow and combustion",
      "Smoother running and reduced knocking",
      "Can help restore fuel economy",
      "Less stress on catalytic converter and sensors",
    ],
    included: [
      "Pre-service scan and engine condition check",
      "Intake and throttle body cleaning",
      "Decarbonization process suited to the engine",
      "Spark plug inspection",
      "Post-service scan and road test",
    ],
    faqs: [
      {
        q: "Is decarbonization safe for my engine?",
        a: "When the right method is used on a suitable engine, yes. We inspect first and will not recommend it if the engine's condition makes it unsuitable.",
      },
      {
        q: "How often is decarbonization needed?",
        a: "It depends on driving style and fuel quality. Cars driven mainly in slow city traffic tend to build carbon faster.",
      },
    ],
    related: ["engine-tuning", "catalytic-converter-cleaning", "fuel-injector-cleaning"],
  },
  {
    slug: "suspension-repair",
    name: "Complete Suspension Repair",
    shortName: "Complete Suspension",
    visual: "suspension",
    featured: true,
    enabled: true,
    seoTitle: "Car Suspension Repair in Wah Cantt — Shocks, Bushes & Links",
    seoDescription:
      "Complete suspension inspection and repair in Wah Cantt: shock absorbers, struts, bushes, ball joints, links and steering components.",
    summary: "Shocks, struts, bushes, ball joints, links and steering component repair.",
    intro: [
      "Your suspension keeps the tyres in contact with the road and the ride comfortable. Speed breakers, potholes and heavy loads gradually wear out shock absorbers, bushes, ball joints and links.",
      "Worn suspension is not only uncomfortable — it affects braking distance, steering control and tyre life. We inspect the complete system and replace only what is worn.",
    ],
    signs: [
      "Knocking or clunking over speed breakers",
      "Car bounces or floats after bumps",
      "Pulling to one side or loose-feeling steering",
      "Uneven tyre wear",
      "Nose dives heavily when braking",
    ],
    benefits: [
      "More comfortable, quieter ride",
      "Better steering control and stability",
      "Shorter, more stable braking",
      "Longer tyre life",
    ],
    included: [
      "Lift inspection of shocks, struts and springs",
      "Check of bushes, ball joints, tie rods and stabiliser links",
      "Steering play check",
      "Replacement of worn parts after your approval",
      "Recommendation for wheel alignment where needed",
    ],
    faqs: [
      {
        q: "Do I need to replace shock absorbers in pairs?",
        a: "It is generally recommended to replace shocks on the same axle in pairs for balanced handling. We will explain the reasoning for your car.",
      },
      {
        q: "Do you do wheel alignment?",
        a: "Please ask us on WhatsApp. If alignment is needed after suspension work, we will advise you on the next step.",
      },
    ],
    related: ["brake-service", "general-inspection", "preventive-maintenance"],
  },
  {
    slug: "brake-service",
    name: "Brake Inspection & Service",
    shortName: "Brakes Service",
    visual: "brake",
    featured: true,
    enabled: true,
    seoTitle: "Brake Repair & Service in Wah Cantt — Pads, Discs & Fluid",
    seoDescription:
      "Brake inspection and service in Wah Cantt: brake pads, discs, drums, fluid and ABS warning diagnosis. Safety-first checks before every repair.",
    summary: "Pads, discs, drums, brake fluid and ABS warning diagnosis.",
    intro: [
      "Brakes are your car's most important safety system. Pads and discs wear gradually, brake fluid absorbs moisture over time, and ABS sensors can fail — sometimes without an obvious warning until it matters.",
      "Our brake service measures wear, checks the hydraulic system and scans ABS faults so you know exactly what condition your brakes are in.",
    ],
    signs: [
      "Squealing or grinding when braking",
      "Brake pedal feels soft, spongy or goes too low",
      "Car pulls to one side under braking",
      "Vibration through the pedal or steering",
      "ABS or brake warning light is on",
    ],
    benefits: [
      "Confident, predictable stopping",
      "Worn pads replaced before they damage discs",
      "Fresh fluid for a firm pedal",
      "ABS faults diagnosed with scan tools",
    ],
    included: [
      "Pad and shoe thickness measurement",
      "Disc and drum condition check",
      "Brake fluid level and condition check",
      "Caliper, hose and line inspection",
      "ABS fault scan where a warning is present",
      "Replacement of worn parts with your approval",
    ],
    faqs: [
      {
        q: "How often should brake fluid be changed?",
        a: "Follow your vehicle manual — many manufacturers recommend every two years. Old fluid absorbs moisture, which reduces braking performance.",
      },
      {
        q: "Can I drive with the brake warning light on?",
        a: "It is not safe to ignore it. Please have the brakes checked as soon as possible.",
      },
    ],
    related: ["suspension-repair", "general-inspection", "preventive-maintenance"],
  },
  {
    slug: "oil-filter-change",
    name: "Engine Oil & Filter Replacement",
    shortName: "Oils & Filters",
    visual: "oil",
    featured: true,
    enabled: true,
    seoTitle: "Car Oil Change & Filter Replacement in Wah Cantt",
    seoDescription:
      "Engine oil and filter replacement in Wah Cantt with the correct oil grade for your car, plus air and cabin filter checks.",
    summary: "Correct-grade engine oil with oil, air, fuel and cabin filter replacement.",
    intro: [
      "Engine oil lubricates, cools and cleans the inside of your engine. As it ages it breaks down and collects contaminants, and a clogged filter can no longer trap dirt effectively.",
      "We use the oil viscosity recommended for your vehicle and check the other filters at the same time, so a routine visit also becomes a quick health check.",
    ],
    signs: [
      "Service interval reached (by kilometres or time)",
      "Oil looks dark, gritty or the level is low",
      "Oil pressure warning light",
      "Engine sounds noisier than usual",
      "Burning oil smell",
    ],
    benefits: [
      "Protects the engine from wear",
      "Keeps the engine running cooler and cleaner",
      "Helps maintain fuel efficiency",
      "Quick visual inspection of other components during the visit",
    ],
    included: [
      "Drain and refill with the recommended oil grade",
      "Oil filter replacement",
      "Air filter and cabin filter check (replacement if required)",
      "Leak check around the sump and filter",
      "Fluid level top-up check",
    ],
    faqs: [
      {
        q: "Which oil should I use?",
        a: "Use the viscosity and specification in your owner's manual. If you are unsure, tell us your car's model and engine and we will advise.",
      },
      {
        q: "Can I bring my own oil?",
        a: "Please ask us on WhatsApp before your visit so we can confirm.",
      },
    ],
    related: ["preventive-maintenance", "general-inspection", "engine-tuning"],
  },
  {
    slug: "battery-charging",
    name: "Battery Testing & Charging",
    shortName: "Battery Charging",
    visual: "battery",
    featured: true,
    enabled: true,
    seoTitle: "Car Battery Testing & Charging in Wah Cantt",
    seoDescription:
      "Car battery testing, charging and charging-system checks in Wah Cantt. Find out whether your battery, alternator or a drain is the real problem.",
    summary: "Battery health test, charging and alternator/charging-system check.",
    intro: [
      "A car that will not start is often blamed on the battery — but the cause can also be a weak alternator, a corroded terminal or something draining power while the car is parked.",
      "We test the battery's health, charge it where appropriate, and check the charging system so you do not replace a good battery unnecessarily.",
    ],
    signs: [
      "Slow cranking or clicking when starting",
      "Dim headlights at idle",
      "Battery warning light on the dashboard",
      "Car does not start after being parked for a few days",
      "Corrosion around battery terminals",
    ],
    benefits: [
      "Know whether the battery can be saved or needs replacing",
      "Charging faults found before you get stranded",
      "Clean, secure connections",
      "Fewer surprise non-starts, especially in winter",
    ],
    included: [
      "Battery voltage and load/health test",
      "Controlled battery charging facility",
      "Alternator output and charging-system check",
      "Terminal cleaning and tightening",
      "Parasitic drain check where required",
    ],
    faqs: [
      {
        q: "How long does a car battery last?",
        a: "It varies with climate, usage and battery type. Heat and frequent short trips shorten battery life. A test tells you its actual condition.",
      },
      {
        q: "Can every flat battery be recharged?",
        a: "Many can, but a battery with a damaged cell or that has been deeply discharged many times may no longer hold a charge. Testing shows which it is.",
      },
    ],
    related: ["electrical-diagnosis", "hybrid-car-repair", "general-inspection"],
  },
  {
    slug: "general-inspection",
    name: "General Vehicle Inspection",
    shortName: "General Inspection",
    visual: "inspection",
    enabled: true,
    seoTitle: "General Car Inspection in Wah Cantt — Pre-Purchase & Health Check",
    seoDescription:
      "General vehicle inspection in Wah Cantt: fluids, brakes, suspension, tyres, lights, battery and computerized scan. Ideal before buying a used car.",
    summary: "A structured health check of your car's key systems with a written summary.",
    intro: [
      "A general inspection is a structured look over your car's main systems. It is a sensible step before a long journey, before buying a used car, or simply when you are not sure what condition your car is in.",
      "We combine a visual and physical check with a computerized scan and give you a clear list of what is fine, what needs watching and what needs attention now.",
    ],
    signs: [
      "You are planning to buy a used car",
      "Long road trip coming up",
      "You have just bought a car and want a baseline",
      "Service history is unknown",
      "Something feels 'not quite right'",
    ],
    benefits: [
      "Clear picture of the car's condition",
      "Helps you plan and budget for maintenance",
      "Avoid surprises on long journeys",
      "Informed decisions when buying a used car",
    ],
    included: [
      "Computerized fault-code scan",
      "Fluids, belts and hoses check",
      "Brakes, suspension and steering check",
      "Tyres, lights and wipers check",
      "Battery and charging check",
      "Summary of findings with priorities",
    ],
    faqs: [
      {
        q: "Can you inspect a car I'm planning to buy?",
        a: "Yes. Bring the car to either of our Wah Cantt workshops with the seller's permission and we will inspect it and explain our findings.",
      },
    ],
    related: ["computerized-scanning", "preventive-maintenance", "brake-service"],
  },
  {
    slug: "preventive-maintenance",
    name: "Preventive Vehicle Maintenance",
    shortName: "Preventive Maintenance",
    visual: "gear",
    enabled: true,
    seoTitle: "Preventive Car Maintenance & Periodic Service in Wah Cantt",
    seoDescription:
      "Preventive car maintenance and periodic servicing in Wah Cantt based on your vehicle's schedule. Reduce breakdowns and plan costs.",
    summary: "Scheduled servicing that catches wear early and reduces breakdowns.",
    intro: [
      "Preventive maintenance means servicing parts before they fail. Following your manufacturer's schedule — oil, filters, plugs, fluids, belts and brakes — costs less over time than waiting for a breakdown.",
      "We tailor the service to your vehicle's age, mileage and how you drive, and keep you informed about upcoming items so you can plan ahead.",
    ],
    signs: [
      "Service is due by kilometres or months",
      "Service history is incomplete",
      "The car is used heavily in city traffic",
      "Seasonal change (summer heat or winter cold)",
      "Before selling the car",
    ],
    benefits: [
      "Fewer unexpected breakdowns",
      "Longer life for engine and transmission",
      "Predictable, planned maintenance costs",
      "Better resale value with a maintained car",
    ],
    included: [
      "Schedule-based service items for your vehicle",
      "Fluid checks and top-ups or replacement",
      "Filter and spark plug checks",
      "Brake and suspension inspection",
      "Computerized scan",
      "Advice on upcoming service items",
    ],
    faqs: [
      {
        q: "My car drives fine — does it still need servicing?",
        a: "Yes. Many wear items give no warning before they fail. Regular servicing catches them early.",
      },
      {
        q: "Do you keep a record of the service?",
        a: "Please ask us to note the work done so you can keep it with your car's service history.",
      },
    ],
    related: ["oil-filter-change", "general-inspection", "engine-tuning"],
  },
  {
    slug: "engine-diagnostics",
    name: "Engine Diagnostics & Repair",
    shortName: "Engine Diagnostics",
    visual: "engine",
    enabled: true,
    seoTitle: "Engine Diagnostics & Repair in Wah Cantt",
    seoDescription:
      "Engine diagnostics and repair in Wah Cantt: misfires, overheating, oil leaks, noises and power loss. Scan, test, explain — then repair with your approval.",
    summary: "Finding and fixing misfires, overheating, leaks, noises and power loss.",
    intro: [
      "Engine problems rarely have a single obvious cause. Misfires, overheating, noises and power loss can come from ignition, fuel, air, cooling or mechanical faults.",
      "Our approach is step-by-step: scan, test, confirm and then explain the repair with a quote before any work begins.",
    ],
    signs: [
      "Engine overheating or temperature gauge rising",
      "Knocking, ticking or unusual noises",
      "Oil or coolant leaks",
      "White, blue or black smoke from the exhaust",
      "Engine shuts off or will not start",
    ],
    benefits: [
      "Root cause found before parts are replaced",
      "Prevents minor faults from becoming major repairs",
      "Transparent explanation and quote",
      "Repairs done only with your approval",
    ],
    included: [
      "Computerized scan and live data analysis",
      "Ignition, fuel and air system tests",
      "Cooling system and leak inspection",
      "Mechanical checks where required",
      "Repair plan and estimate",
    ],
    faqs: [
      {
        q: "Should I keep driving if my car is overheating?",
        a: "No. Stop safely and switch off the engine. Driving an overheating engine can cause serious damage. Contact us for advice.",
      },
      {
        q: "How long does engine diagnosis take?",
        a: "Simple faults can be found quickly; intermittent problems can take longer. We will keep you updated.",
      },
    ],
    related: ["computerized-scanning", "efi-specialist", "electrical-diagnosis"],
  },
  {
    slug: "electrical-diagnosis",
    name: "Electrical Fault Diagnosis",
    shortName: "Electrical Diagnosis",
    visual: "electrical",
    enabled: true,
    seoTitle: "Car Electrical Fault Diagnosis in Wah Cantt",
    seoDescription:
      "Car electrical fault diagnosis in Wah Cantt: wiring, fuses, sensors, lights, power windows and battery drain problems traced methodically.",
    summary: "Tracing wiring, sensor, lighting, window and battery-drain faults.",
    intro: [
      "Cars now rely on dozens of sensors, modules and kilometres of wiring. Electrical faults can be intermittent and confusing — a light that flickers, a window that stops working or a battery that drains overnight.",
      "We trace faults methodically using scan tools, wiring checks and measurements, rather than swapping parts until something works.",
    ],
    signs: [
      "Dashboard warning lights appearing randomly",
      "Lights, horn, windows or central locking not working",
      "Battery drains when the car is parked",
      "Blown fuses that keep blowing",
      "Burning smell from wiring",
    ],
    benefits: [
      "Accurate fault tracing saves time and money",
      "Improved safety by fixing damaged wiring",
      "Reliable starting and charging",
      "Accessories working as intended",
    ],
    included: [
      "Module scan for electrical fault codes",
      "Fuse and relay checks",
      "Wiring and connector inspection",
      "Voltage and continuity testing",
      "Repair quote after the fault is located",
    ],
    faqs: [
      {
        q: "Why do electrical faults take longer to diagnose?",
        a: "Some faults only appear under certain conditions, such as heat or vibration. Tracing them methodically can take time, and we'll keep you informed.",
      },
      {
        q: "Can aftermarket accessories cause electrical problems?",
        a: "Yes. Poorly installed alarms, trackers, lights or audio systems are a common cause of drains and faults.",
      },
    ],
    related: ["battery-charging", "engine-diagnostics", "computerized-scanning"],
  },
  {
    slug: "emergency-breakdown-assistance",
    name: "Emergency Breakdown Assistance",
    shortName: "Breakdown Assistance",
    visual: "tow",
    // Hidden until the business confirms this service is offered (see client checklist).
    enabled: false,
    seoTitle: "Emergency Car Breakdown Assistance in Wah Cantt",
    seoDescription: "Emergency breakdown assistance in Wah Cantt and Taxila. Call or WhatsApp for help.",
    summary: "Help when your car breaks down in Wah Cantt or Taxila.",
    intro: [
      "If your car breaks down, call or WhatsApp us with your location and the problem you are experiencing. We will advise on the safest next step.",
    ],
    signs: ["Car will not start", "Car stopped while driving", "Flat battery", "Overheating on the road"],
    benefits: ["Advice when you need it", "Help getting your car to the workshop"],
    included: ["Phone/WhatsApp advice", "On-site help or recovery where available"],
    faqs: [],
    related: ["battery-charging", "engine-diagnostics"],
  },
];

export const services = all.filter((s) => s.enabled);
export const featuredServices = services.filter((s) => s.featured);
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const relatedServices = (s: Service) =>
  s.related.map(getService).filter((x): x is Service => Boolean(x));
