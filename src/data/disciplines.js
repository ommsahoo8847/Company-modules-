export const DISCIPLINE_DATA = {
  'Aerodynamics & CFD': {
    icon: '🌬️',
    category: 'Simulation & Flow',
    tagline: 'Shaping air into performance — the invisible force that defines speed limits.',
    overview: `Aerodynamics is the science of managing airflow around and through a vehicle body to maximize downforce, minimize drag, and optimize cooling. In modern hypercars and endurance prototypes, aerodynamic development now consumes the majority of engineering budgets — often more than the powertrain itself.

Computational Fluid Dynamics (CFD) allows engineers to simulate millions of airflow scenarios digitally before physical prototypes are built, massively reducing development time and cost. Tools like ANSYS Fluent, OpenFOAM, and proprietary factory solvers model turbulent flow, boundary layer separation, and wake structures with extraordinary accuracy.`,
    keyFacts: [
      'Modern LMP1 cars generate over 5,000 kg of downforce at 300 km/h — exceeding the car\'s own weight by 3×',
      'Bugatti Tourbillon\'s active rear wing can switch between low-drag "highway" and high-downforce "track" profiles in milliseconds',
      'Peugeot 908\'s Le Mans aerodynamics were optimized for a 13.6 km circuit combining 200 km/h hairpins with 370 km/h straights',
      'CFD simulations can model 300 million mesh cells in a single run — each cell representing a tiny parcel of air',
      'A 1% reduction in Cd (drag coefficient) typically yields a 0.4–0.6% improvement in top speed at the same power',
    ],
    metrics: [
      { label: 'LMP1 Downforce', value: '>5,000 kg @ 300 km/h' },
      { label: 'Typical Hypercar Cd', value: '0.28 – 0.36' },
      { label: 'CFD Mesh Resolution', value: 'Up to 300M cells' },
      { label: 'Wind Tunnel Speed', value: 'Up to Mach 0.4' },
    ],
    relatedCars: ['Peugeot 908 HDi FAP', 'Bugatti Tourbillon', 'Ferrari HC25'],
    color: '#06b6d4',
  },

  'Carbon Composite Monocoques': {
    icon: '⬡',
    category: 'Structural Engineering',
    tagline: 'The skeleton of speed — impossibly strong, impossibly light.',
    overview: `A monocoque (French: "single shell") is a structural chassis design where the outer skin carries structural loads rather than an internal frame. Carbon fibre reinforced polymer (CFRP) monocoques combine the tensile strength of carbon fibres with an epoxy resin matrix, producing structures that are 5× stronger than steel at a fraction of the weight.

The autoclave curing process — baking composite layups at high temperature and pressure — aligns carbon fibres precisely, eliminating voids and maximising fibre-to-resin ratios. Modern hypercar tubs integrate fuel tanks, suspension pickups, and crash structure as part of the monocoque, further reducing parts count and mass.`,
    keyFacts: [
      'McLaren 12C Spider\'s MonoCell tub weighs just 75 kg yet withstands 5G crash loads in all directions',
      'Carbon fibre has a tensile strength of ~3,500 MPa — versus ~400 MPa for high-strength steel',
      'Bugatti Tourbillon\'s T800 carbon monocoque incorporates the 25 kWh battery pack as an integral structural load-bearing element',
      'Ferrari HC25 uses a bespoke carbon-aluminium hybrid structure not shared with any production model',
      'FIA regulations require Le Mans prototypes to survive a 12G frontal impact with zero intrusion into the survival cell',
    ],
    metrics: [
      { label: 'MonoCell Weight (12C)', value: '75 kg' },
      { label: 'CFRP Tensile Strength', value: '3,500 MPa' },
      { label: 'Autoclave Temperature', value: '120 – 180 °C' },
      { label: 'Torsional Rigidity', value: '>50,000 Nm/degree' },
    ],
    relatedCars: ['McLaren 12C Spider', 'Bugatti Tourbillon', 'Ferrari HC25'],
    color: '#8b5cf6',
  },

  'Hybrid Powertrains': {
    icon: '⚡',
    category: 'Powertrain Engineering',
    tagline: 'Internal combustion meets instant electric torque — the apex of performance engineering.',
    overview: `Hybrid powertrains combine an internal combustion engine with one or more electric motor-generator units (MGUs), enabling energy recovery, torque-fill, and torque vectoring strategies impossible with combustion alone. In performance applications, the electric system eliminates turbo lag, fills torque valleys between combustion pulses, and can instantaneously vector torque between individual wheels.

The Bugatti Tourbillon represents the current pinnacle: an 8.3-litre naturally aspirated V16 paired with three electric motors, delivering a combined 1,800 HP with an 800V electrical architecture — the same voltage standard as cutting-edge Formula E.`,
    keyFacts: [
      'Bugatti Tourbillon delivers 800 HP from its three electric motors alone — enough to shame most supercars',
      'The 800V system allows charging at up to 270 kW — filling the 25 kWh battery in under 7 minutes',
      'Electric motors provide instant torque from 0 RPM — eliminating the "dead zone" before ICE power builds',
      'Torque vectoring via individual front electric motors can transfer 100% of torque to one wheel in <10ms',
      'Regenerative braking can recover up to 400 kW of kinetic energy during hard braking — like having a 536 HP motor running backwards',
    ],
    metrics: [
      { label: 'Peak Combined Output', value: '1,800 HP' },
      { label: 'EV-only Range', value: '>60 km' },
      { label: 'Battery Voltage', value: '800V' },
      { label: 'Electric Torque Delivery', value: '<10ms' },
    ],
    relatedCars: ['Bugatti Tourbillon', 'Kalmar 9X9'],
    color: '#f59e0b',
  },

  'V16 & V12 Combustion': {
    icon: '🔥',
    category: 'Engine Architecture',
    tagline: 'The symphony of cylinders — engineering theatre at 9,000 RPM.',
    overview: `V16 and V12 engines represent the pinnacle of naturally aspirated combustion engineering — configurations where cylinder count is chosen not for efficiency, but for ultimate smoothness, high-RPM capability, and the acoustic character that defines automotive legend.

A 90° V16 like the Bugatti Tourbillon's Cosworth-developed unit fires every 45° of crankshaft rotation, producing 8 firing events per revolution — resulting in near-perfect primary and secondary balance without balance shafts, enabling the engine to rev to 9,000 RPM with extraordinary refinement. The firing interval is so frequent that it produces an almost turbine-like smoothness.`,
    keyFacts: [
      'The Bugatti Tourbillon\'s 8.3L V16 fires 8 times per crankshaft revolution — creating turbine-like smoothness',
      'V16 engines have a primary and secondary balance that no V8 or V12 can match without balance shafts',
      'Cosworth developed the V16 to rev to 9,000 RPM without forced induction — a landmark in NA engine engineering',
      'At 9,000 RPM, each piston travels ~25 metres per second and endures ~7,000G of acceleration',
      'The Peugeot 908\'s 5.5L V12 diesel produced 1,200 Nm of torque — more than a semi-truck engine',
    ],
    metrics: [
      { label: 'Bugatti V16 Displacement', value: '8.3 Litres' },
      { label: 'Maximum RPM', value: '9,000 RPM' },
      { label: 'Firing Frequency @ 9k', value: '1,200 Hz (V16)' },
      { label: 'Peugeot V12 Diesel Torque', value: '1,200 Nm' },
    ],
    relatedCars: ['Bugatti Tourbillon', 'Peugeot 908 HDi FAP'],
    color: '#ef4444',
  },

  'Sequential & DCT Gearboxes': {
    icon: '⚙️',
    category: 'Transmission Engineering',
    tagline: 'Millisecond shifts that make every gear change invisible — and inevitable.',
    overview: `Sequential and Dual-Clutch Transmission (DCT) gearboxes represent two distinct solutions to the problem of transmitting extreme power without losing momentum during gear changes.

Sequential gearboxes use a drum mechanism to engage gears one-at-a-time in order, with shifts executed by a pneumatic or hydraulic actuator in under 50ms. DCT systems pre-select the next gear on a second clutch pack while the first clutch delivers drive, enabling seamless power shifts in as little as 8ms — faster than a human blink.

The Bugatti Tourbillon uses an 8-speed longitudinal DCT co-developed with Ricardo, while the Peugeot 908's 6-speed sequential was designed for the brutal thermal and torque loads of 24-hour Le Mans racing.`,
    keyFacts: [
      'DCT gearboxes can execute a power-on upshift in as little as 8 milliseconds — 25× faster than a human can blink',
      'The Bugatti Tourbillon\'s 8-speed DCT handles 1,000 Nm from the ICE alone, plus instantaneous electric torque',
      'PDK (Porsche-style DCT) pre-selects the next gear while the current gear delivers power — eliminating torque interruption',
      'Le Mans sequential gearboxes must endure 24 hours of ~4,000 gear changes under extreme heat and vibration',
      'Modern sequential actuators use nitrogen gas at 40–60 bar to complete shifts faster than the ECU can register',
    ],
    metrics: [
      { label: 'DCT Shift Time', value: '8 – 50 ms' },
      { label: 'Bugatti DCT Torque Capacity', value: '>1,200 Nm' },
      { label: 'Le Mans Race Gear Changes', value: '~4,000 over 24h' },
      { label: 'Pneumatic Actuator Pressure', value: '40–60 bar' },
    ],
    relatedCars: ['Bugatti Tourbillon', 'Kalmar 9X9', 'Peugeot 908 HDi FAP'],
    color: '#10b981',
  },

  'Active Aero Telemetry': {
    icon: '📡',
    category: 'Control Systems',
    tagline: 'Real-time aerodynamic adjustment — the car that reshapes itself at speed.',
    overview: `Active aerodynamic systems use electronically controlled surfaces — wings, flaps, diffusers, and ride height actuators — to continuously optimize the vehicle's aerodynamic profile in real-time based on speed, lateral acceleration, steering angle, and driver inputs.

Unlike passive aerodynamics that must compromise between drag at high speed and downforce in corners, active systems can maximize downforce in corners and retract to low-drag configuration on straights, all within a single lap. Combined with telemetry systems that stream 1,000+ channels of sensor data at 1kHz, modern hypercars effectively "fly" themselves aerodynamically.`,
    keyFacts: [
      'The Bugatti Tourbillon\'s active wing adjusts its angle of attack in <100ms — faster than driver perception',
      'Active systems can generate full aerodynamic braking force — adding the equivalent of a second disc brake system',
      'F1 DRS systems reduce drag by up to 10 drag counts (roughly 12 km/h on long straights) by opening the rear wing slot',
      'Peugeot 908 telemetry streamed over 1,200 sensor channels simultaneously during Le Mans qualification',
      'Modern active suspension and aero work together — the car lowers at speed to reduce drag and increases ride height on rough surfaces',
    ],
    metrics: [
      { label: 'Wing Actuation Speed', value: '<100 ms' },
      { label: 'Telemetry Channels', value: '>1,200 @ 1 kHz' },
      { label: 'DRS Drag Reduction', value: '~10 drag counts' },
      { label: 'Active Suspension Travel', value: '±25 mm at speed' },
    ],
    relatedCars: ['Bugatti Tourbillon', 'Peugeot 908 HDi FAP', 'BMW M4 GT4'],
    color: '#06b6d4',
  },

  'Motorsport Homologation': {
    icon: '🏁',
    category: 'Regulatory Engineering',
    tagline: 'Engineering within the rulebook — where constraints breed innovation.',
    overview: `Homologation is the formal process of certifying that a road car or race car meets the technical regulations of a sanctioning body (FIA, ACO, SRO, etc.) to compete in a specific racing class. It is both a regulatory hurdle and a creative constraint that has driven some of the most radical road car engineering in history.

GT4 homologation (like the BMW M4 GT4) requires a production-derived car with specific safety equipment, weight minimums, and power restrictions. LMP1 homologation (Peugeot 908's era) required fuel flow limits and minimum car weights. Each ruleset creates a unique engineering puzzle.`,
    keyFacts: [
      'BMW submitted 30+ volumes of technical documentation to achieve BMW M4 GT4 SRO GT4 homologation',
      'FIA GT3 regulations require a minimum weight of 1,300 kg — manufacturers engineer ballast systems to fine-tune balance',
      'The 908\'s diesel hybrid system was specifically engineered to satisfy ACO\'s "alternative energy" homologation pathway',
      'Homologated rollcage designs must survive a 75 kJ roof crush and a 200G side impact without cabin intrusion',
      'Balance of Performance (BoP) adjustments can add/remove up to 80 kg of ballast and alter boost pressure between events',
    ],
    metrics: [
      { label: 'GT3 Minimum Weight', value: '1,300 kg' },
      { label: 'Roof Crush Requirement', value: '75 kJ' },
      { label: 'BoP Weight Range', value: '±80 kg' },
      { label: 'Homologation Period', value: 'Typically 3–5 years' },
    ],
    relatedCars: ['BMW M4 GT4', 'Peugeot 908 HDi FAP'],
    color: '#f97316',
  },

  'Horological Instrumentation': {
    icon: '⌚',
    category: 'Precision Craftsmanship',
    tagline: 'Where watchmaking meets the cockpit — engineering time itself.',
    overview: `Horological instrumentation brings the ultra-precision engineering of Swiss watchmaking into the automotive instrument cluster. Rather than digital displays, the instruments use mechanical complications — miniaturized escapements, gear trains, and jewelled bearings — to display vehicle data with analogue artisanship.

The Bugatti Tourbillon's instrument cluster is the most extreme example ever produced for a road car: a fully mechanical, skeletonized cluster developed in collaboration with Swiss horologists, featuring over 600 individual parts crafted from titanium, sapphire crystal, and precious metals, with zero electrical power required to operate the core gauges.`,
    keyFacts: [
      'Bugatti Tourbillon\'s cluster has 600+ individual parts — more than many complete Swiss mechanical watches',
      'The RPM indicator uses a traditional watch escapement mechanism, not an electronic sensor readout',
      'Sapphire crystal panels allow visual inspection of the mechanical movement from the driver\'s seat',
      'The "tourbillon" in the car\'s name directly references the watchmaking complication that counters gravity errors',
      'Mechanical instruments require zero calibration drift over the car\'s lifespan — unlike digital displays that can fail',
    ],
    metrics: [
      { label: 'Instrument Parts Count', value: '>600 individual parts' },
      { label: 'Material', value: 'Titanium, Sapphire, Gold' },
      { label: 'Power Required', value: 'Zero (fully mechanical)' },
      { label: 'Accuracy', value: '±0.5% (watch grade)' },
    ],
    relatedCars: ['Bugatti Tourbillon'],
    color: '#d97706',
  },

  'Bespoke Coachbuilding': {
    icon: '🏛️',
    category: 'Artisan Fabrication',
    tagline: 'One car, one vision — where sculpture becomes 720 CV engineering.',
    overview: `Coachbuilding is the ancient art of crafting bespoke vehicle bodies on an existing mechanical platform. Originally referring to horse-drawn carriage body makers, today's coachbuilders create unique automotive sculptures for individual clients — one car at a time, by hand, over hundreds or thousands of hours.

Ferrari's Special Projects division (responsible for the HC25) represents the pinnacle of factory coachbuilding: clients commission unique designs from Ferrari's Centro Stile, which are then developed with full factory engineering support, crash-tested, and homologated as distinct models. The HC25 celebrates Ferrari's 25th anniversary with a body unlike any other Ferrari.`,
    keyFacts: [
      'Ferrari HC25 took approximately 3 years from client brief to delivery — matching some aircraft development timelines',
      'Coachbuilt Ferraris from Maranello receive the same powertrain warranty as production models',
      'Each HC25 body panel is hand-formed, fitted, checked for aerodynamic consistency, and finished by a dedicated craftsperson',
      'The body is aerodynamically validated in Ferrari\'s wind tunnel in Maranello — same facility used for F1 development',
      'Ferrari Special Projects clients typically commit to a 5-year confidentiality agreement before the car is revealed',
    ],
    metrics: [
      { label: 'Development Time', value: '~3 years per car' },
      { label: 'Typical Production Run', value: '1 unit' },
      { label: 'HC25 Output', value: '720 CV (710 HP)' },
      { label: 'Base Platform', value: 'Ferrari SF90 Stradale' },
    ],
    relatedCars: ['Ferrari HC25'],
    color: '#dc2626',
  },

  'Kinematic Suspension': {
    icon: '🔩',
    category: 'Chassis Dynamics',
    tagline: 'Geometry in motion — the invisible architecture of grip.',
    overview: `Kinematic suspension engineering defines the precise geometric motion of a wheel relative to the chassis as it travels through its range of motion. Unlike static geometry that only measures a single position, kinematic analysis tracks how camber, toe, caster, and scrub radius change dynamically as the suspension compresses, extends, and rolls — optimizing grip at every instant.

The Kalmar 9X9's pushrod suspension system (an F1-derived architecture) positions the springs and dampers inboard, connected to the wishbones via pushrods, lowering the centre of gravity and allowing more sophisticated geometry control. The suspension geometry itself becomes a tuning dimension as powerful as spring rate.`,
    keyFacts: [
      'Kalmar 9X9 uses pushrod suspension derived directly from Formula 1 practice — positioning mass inboard for lower CG',
      'At 200 km/h on a 100m radius corner, wheels must resist ~1.2G of lateral acceleration — requiring precise toe and camber control',
      'Modern F1 suspension geometry changes camber by up to 4° from full droop to full bump — all engineered mathematically',
      'Anti-dive and anti-squat geometry control how the nose dips under braking and the rear squats under acceleration',
      'McLaren 12C Spider\'s Proactive Chassis Control reads road inputs 1,000 times per second to adjust damping',
    ],
    metrics: [
      { label: 'Suspension Control Rate', value: '1,000 Hz (active systems)' },
      { label: 'Camber Change (full travel)', value: 'Up to 4°' },
      { label: '9X9 Suspension Type', value: 'F1-derived Pushrod' },
      { label: 'Lateral Load @ 200 km/h', value: '~1.2G' },
    ],
    relatedCars: ['Kalmar 9X9', 'McLaren 12C Spider', 'Bugatti Tourbillon'],
    color: '#7c3aed',
  },

  'Traction Control Systems': {
    icon: '🧠',
    category: 'Electronic Control Systems',
    tagline: 'The brain behind the brawn — millisecond decisions that separate fast from crashed.',
    overview: `Traction Control Systems (TCS) monitor wheel spin in real-time and modulate engine torque, individual brake pressure, and in modern systems electric motor output, to maintain the optimal slip ratio at each tyre contact patch. The goal is to maximize the traction force transferred to the road without wasting energy as wheelspin or destabilizing the vehicle.

Modern TCS systems are so sophisticated they can distinguish between wheelspin caused by excessive torque, a slippery patch, a fast direction change, or intentional driver oversteer input — responding differently to each scenario within the same tyre's contact patch.`,
    keyFacts: [
      'Bugatti Tourbillon\'s TCS can vector torque between 4 wheels individually — creating a "virtual limited slip differential" at each corner',
      'BMW M4 GT4\'s racing TCS has 12 configurable levels — from full intervention to complete driver control',
      'Modern TCS samples wheel speed at 4,000 Hz — updating torque demands every 0.25 milliseconds',
      'McLaren\'s Variable Drift Control allows drivers to dial in a precise yaw angle and maintain it at speed',
      'Electric motor TCS response time is ~3ms — versus ~80ms for a combustion engine throttle response',
    ],
    metrics: [
      { label: 'Wheel Speed Sample Rate', value: '4,000 Hz' },
      { label: 'Electric TCS Response', value: '3 ms' },
      { label: 'ICE Throttle Response', value: '~80 ms' },
      { label: 'BMW GT4 TCS Levels', value: '12 configurable' },
    ],
    relatedCars: ['Bugatti Tourbillon', 'BMW M4 GT4', 'McLaren 12C Spider'],
    color: '#0891b2',
  },

  'Weight Optimization': {
    icon: '⚖️',
    category: 'Mass Engineering',
    tagline: 'Every gram is a vote against performance — subtract relentlessly.',
    overview: `Weight optimization is the discipline of systematically eliminating mass from every component of a vehicle without compromising structural integrity, safety, or function. In extreme performance engineering, 1 kg of mass reduction is worth roughly 0.01s per lap at a typical circuit — and lightness improves acceleration, braking, cornering, fuel consumption, and tyre longevity simultaneously.

Modern weight optimization uses topology optimization algorithms to calculate the minimum material needed to bear a specific load, then manufactures the result using additive manufacturing (3D metal printing) which can produce organic, bone-like structures impossible with traditional machining.`,
    keyFacts: [
      'Bugatti Tourbillon\'s T800 monocoque uses AI-topology-optimized 3D-printed suspension mounts — saving 40% mass vs. machined parts',
      'McLaren 12C Spider\'s MonoCell saves ~15 kg over a conventional steel space frame equivalent',
      'Carbon fibre has a specific strength (strength-to-weight ratio) 5× higher than high-tensile steel',
      'Titanium wheel bolts on race cars can save 200g per corner — 800g total — a meaningful number at that level',
      'The Kalmar 9X9 weighs under 1,200 kg despite 930 HP — a power-to-weight ratio rivaling a Bugatti Veyron',
    ],
    metrics: [
      { label: 'Topology Optimization Mass Save', value: 'Up to 40%' },
      { label: 'CFRP Specific Strength vs Steel', value: '5× higher' },
      { label: 'Kalmar 9X9 Weight', value: '<1,200 kg' },
      { label: 'McLaren MonoCell Saving', value: '~15 kg vs steel' },
    ],
    relatedCars: ['Bugatti Tourbillon', 'McLaren 12C Spider', 'Kalmar 9X9'],
    color: '#16a34a',
  },
}
