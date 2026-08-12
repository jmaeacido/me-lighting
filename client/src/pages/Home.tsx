/**
 * Design direction: reference-matched contemporary architectural luxury.
 * Cinematic low-key imagery, warm-white editorial bands, precise linework, and restrained ME Gold accents.
 */
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  BadgeDollarSign,
  BadgeCheck,
  Bath,
  Bed,
  BookOpen,
  Building2,
  Car,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Clock3,
  DoorOpen,
  Droplets,
  Flower2,
  Gem,
  GlassWater,
  Headphones,
  House,
  Instagram,
  Laptop,
  Layers,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MoveUpRight,
  Phone,
  Route,
  Ruler,
  Scissors,
  ShieldCheck,
  Shirt,
  Smartphone,
  Sofa,
  Sparkles,
  Upload,
  Users,
  Utensils,
  UtensilsCrossed,
  WashingMachine,
  X,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";

const HERO_IMAGE = "/manus-storage/me-lighting-hero_05467120.jpg";
const OUTDOOR_IMAGE = "/site-draft/outdoor.png";
const KITCHEN_IMAGE = "/site-draft/kitchen.png";
const BATHROOM_IMAGE = "/site-draft/bathroom.png";
const FEATURE_LIGHTING_IMAGE = "/site-draft/feature-lighting.png";
const NEW_HOME_IMAGE = "/site-draft/new-home.png";
const WHOLE_HOME_IMAGE = "/site-draft/whole-home.png";
const PLANS_IMAGE = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2200&q=90";
const LOGO_IMAGE = "/manus-storage/me-lighting-clean-logo-final_a9a591ff.png";
const TEAM_PORTRAIT_ONE = "/manus-storage/me-lighting-team-portrait-01_86017722.png";
const TEAM_PORTRAIT_TWO = "/manus-storage/me-lighting-team-portrait-02_0534ac31.png";

const modImage = (filename: string) => `/modification/${encodeURIComponent(filename)}`;

const solutions = [
  {
    name: "Kitchen Lighting",
    description: "Functional, beautiful and practical for everyday living.",
    image: modImage("Kitchen.png"),
    icon: Utensils,
  },
  {
    name: "Bathroom Lighting",
    description: "The perfect balance of light, clarity and mood.",
    image: modImage("Bathroom.png"),
    icon: Bath,
  },
  {
    name: "Living Room Lighting",
    description: "Layered light for relaxed evenings and everyday comfort.",
    image: modImage("Living Room.png"),
    icon: Sofa,
  },
  {
    name: "Dining Room Lighting",
    description: "Warm, flattering light for meals and gatherings.",
    image: modImage("Dinning Room.png"),
    icon: UtensilsCrossed,
  },
  {
    name: "Bedroom Lighting",
    description: "Soft, restful illumination with practical task light.",
    image: modImage("Bedroom.png"),
    icon: Bed,
  },
  {
    name: "Walk-In Robe Lighting",
    description: "Clear, even light for dressing and organisation.",
    image: modImage("Walk In.png"),
    icon: Shirt,
  },
  {
    name: "Stair Lighting",
    description: "Safe, subtle guidance through vertical circulation.",
    image: modImage("Stair Lighting.png"),
    icon: Layers,
  },
  {
    name: "Hallway Lighting",
    description: "Connected pathways with calm, consistent light.",
    image: modImage("Hall Way Lighting.png"),
    icon: DoorOpen,
  },
  {
    name: "Home Office Lighting",
    description: "Focused, comfortable light for productive work.",
    image: modImage("Architectural Linear Lighting.png"),
    icon: Laptop,
  },
  {
    name: "Laundry Lighting",
    description: "Bright, practical illumination for utility spaces.",
    image: modImage("Laundry Lighting.png"),
    icon: WashingMachine,
  },
  {
    name: "Garage Lighting",
    description: "Reliable, high-output light for storage and access.",
    image: modImage("Garage Lighting.png"),
    icon: Car,
  },
  {
    name: "Outdoor Entertaining",
    description: "Atmospheric light for alfresco dining and gatherings.",
    image: modImage("Outdoor Entertaining.png"),
    icon: GlassWater,
  },
  {
    name: "Garden Lighting",
    description: "Reveal planting, texture and landscape after dark.",
    image: modImage("Garden Lighting.png"),
    icon: Flower2,
  },
  {
    name: "Pool & Water Feature Lighting",
    description: "Dramatic, safe illumination around water elements.",
    image: modImage("Pool Lighting.png"),
    icon: Droplets,
  },
  {
    name: "Driveway & Pathway Lighting",
    description: "Welcoming guidance from street to front door.",
    image: modImage("Drive Way and Pathway Lighting.png"),
    icon: Route,
  },
  {
    name: "Front Facade Lighting",
    description: "Architectural presence and curb appeal after sunset.",
    image: modImage("Facade Lighting.png"),
    icon: Building2,
  },
  {
    name: "Feature Lighting",
    description: "Create impact with sculptural architectural light.",
    image: modImage("Featuer Lighting.png"),
    icon: Sparkles,
  },
  {
    name: "Smart Home Lighting",
    description: "App-based control for scenes, schedules and comfort.",
    image: modImage("App Based Control Systems.png"),
    icon: Smartphone,
  },
];

const replacementImage = (filename: string) => `/replacements/${encodeURIComponent(filename)}`;

const bestSellers = [
  {
    name: "Linear LED Profiles",
    eyebrow: "ARCHITECTURAL LINEAR",
    description: "Seamless lines of high-quality light for joinery, ceilings, retail and circulation spaces.",
    specs: ["Recessed, surface & suspended", "Low glare · High CRI"],
    image: replacementImage("Dural 3.png"),
  },
  {
    name: "LED Neon Flex",
    eyebrow: "FLEXIBLE LINEAR",
    description: "Dot-free illumination that follows tight curves across facades, signage and feature details.",
    specs: ["IP67 / IP68 rated", "Tight bend radius"],
    image: replacementImage("Forest Ville 2.png"),
  },
  {
    name: "DMX Pixel LED Systems",
    eyebrow: "DYNAMIC CONTROL",
    description: "Individually addressable lighting for expressive colour effects across venues and landmarks.",
    specs: ["DMX / SPI control", "Dynamic colour effects"],
    image: replacementImage("Forest Ville 3.png"),
  },
  {
    name: "Inground Uplights",
    eyebrow: "EXTERIOR UPLIGHT",
    description: "Precision in-ground fixtures for trees, columns, facades and high-traffic landscape zones.",
    specs: ["Drive-over rated", "IP67+ · Precision optics"],
    image: replacementImage("City Retreat 3.png"),
  },
  {
    name: "Surface Mounted Downlights",
    eyebrow: "ARCHITECTURAL CYLINDERS",
    description: "Clean surface-mounted forms that deliver high output without compromising the ceiling plane.",
    specs: ["High output", "Clean installation"],
    image: replacementImage("Geelong 3.png"),
  },
  {
    name: "Recessed Downlights",
    eyebrow: "TRIMLESS & DEEP-SET",
    description: "Comfortable, controlled downlighting with a refined finish for resolved architectural ceilings.",
    specs: ["Anti-glare optics", "High CRI"],
    image: replacementImage("Geelong 2.png"),
  },
  {
    name: "Track Lighting Systems",
    eyebrow: "ADJUSTABLE SYSTEMS",
    description: "Flexible high-performance lighting for retail, galleries, task zones and evolving interiors.",
    specs: ["DALI / 3-phase", "Adjustable heads"],
    image: replacementImage("Gold Coast 1.png"),
  },
  {
    name: "Wall Grazers & Washers",
    eyebrow: "FACADE LIGHTING",
    description: "Linear optical systems that reveal texture and wash feature walls or facades evenly.",
    specs: ["Uniform wash", "Linear solutions"],
    image: replacementImage("Dural 1.png"),
  },
  {
    name: "Outdoor Floodlights",
    eyebrow: "HIGH-OUTPUT EXTERIOR",
    description: "Dependable wide-beam illumination for car parks, facades and demanding outdoor applications.",
    specs: ["High-output LED", "Wide beam · IP-rated"],
    image: replacementImage("Perth Hills 1.png"),
  },
  {
    name: "Bollard Lighting",
    eyebrow: "PATHWAY LIGHTING",
    description: "Low-glare landscape fixtures that guide movement through pathways and public spaces.",
    specs: ["Controlled distribution", "Durable outdoor build"],
    image: replacementImage("Bonny Hills 1.png"),
  },
  {
    name: "Step & Marker Lights",
    eyebrow: "LOW-LEVEL GUIDANCE",
    description: "Subtle integrated lighting that supports safe, calm movement through stairs and walkways.",
    specs: ["Safety compliant", "Subtle integration"],
    image: replacementImage("Curl Curl 1.png"),
  },
  {
    name: "Pendant Lighting Systems",
    eyebrow: "FEATURE SYSTEMS",
    description: "Statement and functional pendant forms for offices, lobbies and expressive interiors.",
    specs: ["Linear & feature forms", "Acoustic options"],
    image: replacementImage("Greenarce 2.png"),
  },
  {
    name: "Architectural Feature Rings",
    eyebrow: "CUSTOM SUSPENDED",
    description: "Circular feature lighting engineered in custom diameters for confident spatial statements.",
    specs: ["Custom diameters", "DMX / dimmable"],
    image: replacementImage("Greenarce 3.png"),
  },
  {
    name: "Custom Fabrication Lighting",
    eyebrow: "BESPOKE ENGINEERING",
    description: "Project-specific lighting developed around architectural intent and complex integration needs.",
    specs: ["Bespoke builds", "Engineered solutions"],
    image: replacementImage("Dural 2.png"),
  },
  {
    name: "IP-Rated Strip Lighting",
    eyebrow: "WATERPROOF LINEAR",
    description: "Flexible, efficient linear light for joinery and robust indoor or outdoor detailing.",
    specs: ["Waterproof options", "High output & efficiency"],
    image: replacementImage("City Retreat 1.png"),
  },
  {
    name: "Smart Lighting Controls",
    eyebrow: "CONNECTED CONTROL",
    description: "A unified control layer for scene setting, wall interfaces and connected project automation.",
    specs: ["App + wall interface", "Automation ready"],
    image: replacementImage("Lane Cove 1.png"),
  },
  {
    name: "Cabinet & Joinery Lighting",
    eyebrow: "INTEGRATED DETAIL",
    description: "Concealed profile systems that produce clean, uniform light through cabinetry and interiors.",
    specs: ["Concealed profiles", "Uniform output"],
    image: replacementImage("Curl Curl 3.png"),
  },
  {
    name: "High Bay Lighting",
    eyebrow: "INDUSTRIAL PERFORMANCE",
    description: "Efficient high-lumen luminaires designed for warehouses and other large-volume spaces.",
    specs: ["High lumen output", "Long lifespan"],
    image: replacementImage("Geelong 1.png"),
  },
  {
    name: "LED Drivers & Power Systems",
    eyebrow: "POWER & CONTROL",
    description: "Reliable drivers and centralised power systems selected for stable, controllable operation.",
    specs: ["DALI / DMX / 0–10V", "Stable operation"],
    image: replacementImage("Lane Cove 2.png"),
  },
  {
    name: "Emergency Lighting Systems",
    eyebrow: "COMPLIANT SAFETY",
    description: "Integrated or standalone emergency solutions for compliant, dependable project safety.",
    specs: ["Battery backup systems", "Code-required installations"],
    image: replacementImage("Curl Curl 2.png"),
  },
];

const benefits = [
  {
    eyebrow: "PRICE MATCH PROMISE",
    emphasis: "We Beat",
    support: "Any Genuine Quote",
    description: "Bring us a comparable written quote and let our team sharpen the value.",
    icon: BadgeDollarSign,
    image: KITCHEN_IMAGE,
  },
  {
    eyebrow: "FAST TURNAROUND",
    emphasis: "2-Day",
    support: "Custom Cut Service",
    description: "Custom-cut lighting prepared quickly to keep your project moving.",
    icon: Scissors,
    image: WHOLE_HOME_IMAGE,
  },
  {
    eyebrow: "PRODUCT CONFIDENCE",
    emphasis: "5 Year",
    support: "Manufacturer Warranty",
    description: "Selected products are supported by a five-year manufacturer warranty.",
    icon: ShieldCheck,
    image: BATHROOM_IMAGE,
  },
  {
    eyebrow: "REAL GUIDANCE",
    emphasis: "Expert",
    support: "Advice",
    description: "Clear, practical guidance from people who understand lighting in real spaces.",
    icon: Headphones,
    image: FEATURE_LIGHTING_IMAGE,
  },
  {
    eyebrow: "PROVEN EXPERIENCE",
    emphasis: "22 Years",
    support: "Industry Experience",
    description: "More than two decades helping Australian customers make confident decisions.",
    icon: Award,
    image: NEW_HOME_IMAGE,
  },
  {
    eyebrow: "CUSTOMER TRUST",
    emphasis: "5,400",
    support: "Happy Customers",
    description: "A growing community of customers supported across homes and projects.",
    icon: Users,
    image: OUTDOOR_IMAGE,
  },
];

const articles = [
  {
    date: "12 MAY 2026",
    title: "How many downlights do I need?",
    excerpt: "A simple guide to getting comfortable, even light in every room.",
    image: KITCHEN_IMAGE,
  },
  {
    date: "8 MAY 2026",
    title: "What colour temperature belongs in a bathroom?",
    excerpt: "Warm white or cool white? Here is how to choose with confidence.",
    image: BATHROOM_IMAGE,
  },
  {
    date: "5 MAY 2026",
    title: "What wattage LED strip do I need?",
    excerpt: "Everything to know before selecting an architectural LED profile.",
    image: FEATURE_LIGHTING_IMAGE,
  },
  {
    date: "1 MAY 2026",
    title: "Best outdoor lighting ideas for your home",
    excerpt: "Transform entrances, paths and gardens with layered, low-glare light.",
    image: OUTDOOR_IMAGE,
  },
];

const reassurance = [
  { title: "We make it simple", copy: "No confusion. No guesswork.", icon: Lightbulb },
  { title: "Save time & money", copy: "Get it right the first time.", icon: Clock3 },
  { title: "Increase value", copy: "Great light elevates every room.", icon: House },
  { title: "Peace of mind", copy: "Expert advice you can trust.", icon: ShieldCheck },
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="ME Lighting home">
      <img src={LOGO_IMAGE} alt="ME Lighting" />
    </a>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [fileName, setFileName] = useState("");
  const [bestSellerIndex, setBestSellerIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );
    document.querySelectorAll(".motion-reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setBestSellerIndex((current) => (current + 1) % bestSellers.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, []);

  const getBestSellerOffset = (index: number) => {
    let offset = index - bestSellerIndex;
    if (offset > bestSellers.length / 2) offset -= bestSellers.length;
    if (offset < -bestSellers.length / 2) offset += bestSellers.length;
    return offset;
  };

  const closeMenu = () => setMobileOpen(false);

  const submitBrief = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Project brief prepared", {
      description: "This preview form is ready to connect to your preferred CRM or inbox.",
    });
  };

  return (
    <div id="top" className="site-shell">
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <div className="nav-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#top">Home</a>
            <a href="#solutions">Solutions <ChevronDown size={12} /></a>
            <a href="#knowledge">Knowledge centre</a>
            <a href="#projects">Projects</a>
            <a href="#team">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="nav-cta" href="#contact">Get expert advice <ArrowRight size={16} /></a>
          <button
            type="button"
            className="menu-button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
        <nav className={`mobile-nav ${mobileOpen ? "mobile-nav--open" : ""}`} aria-label="Mobile navigation">
          <a href="#top" onClick={closeMenu}>Home</a>
          <a href="#solutions" onClick={closeMenu}>Solutions</a>
          <a href="#knowledge" onClick={closeMenu}>Knowledge centre</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#team" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Get expert advice</a>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-image" src={HERO_IMAGE} alt="Contemporary home illuminated with layered architectural lighting" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">DESIGN · SUPPLY · INSTALL</p>
              <h1 id="hero-title">Lighting.<br />Solved<span>.</span></h1>
              <div className="hero-lead">
                <strong>Expert lighting advice.<br />Premium products.<br />Confidence in every decision.</strong>
                <p>Whether you’re building, renovating or upgrading, we’ll help you get it right—the first time.</p>
              </div>
              <div className="hero-actions">
                <a className="button button--gold" href="#contact">Get expert advice <ArrowRight size={18} /></a>
                <a className="button button--outline-light" href="tel:+611800411754"><Phone size={17} /> Call 1800 411 754</a>
              </div>
            </div>
            <form className="hero-brief-form" onSubmit={submitBrief}>
              <p className="eyebrow">FREE PLAN REVIEW</p>
              <h2>Tell us about your project.</h2>
              <p>Share the basics and a lighting specialist will help identify your next step.</p>
              <label><span>Your name</span><input name="hero-name" type="text" placeholder="Alex Morgan" required /></label>
              <label><span>Email address</span><input name="hero-email" type="email" placeholder="alex@example.com" required /></label>
              <label>
                <span>Project type</span>
                <select name="hero-project" defaultValue="" required>
                  <option value="" disabled>Select a project</option>
                  {solutions.map((solution) => <option key={solution.name} value={solution.name}>{solution.name}</option>)}
                </select>
              </label>
              <label className="hero-file-field">
                <span>Plans or inspiration</span>
                <input name="hero-plans" type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")} />
                <div><Upload size={17} /><span>{fileName || "Choose PDF or image"}</span></div>
              </label>
              <button className="button button--gold" type="submit">Request expert advice <ArrowRight size={17} /></button>
            </form>
          </div>
          <div id="about" className="hero-usp-grid" aria-label="Why choose ME Lighting">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <article className="hero-usp-card" key={benefit.support}>
                  <img src={benefit.image} alt="" />
                  <div className="hero-usp-shade" />
                  <div className="hero-usp-meta"><Icon aria-hidden="true" strokeWidth={1.4} /><span>0{index + 1}</span></div>
                  <div className="hero-usp-copy">
                    <p>{benefit.eyebrow}</p>
                    <h3><strong>{benefit.emphasis}</strong><span>{benefit.support}</span></h3>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="solutions" className="section solutions-section">
          <div className="solution-carousel-head motion-reveal">
            <div className="section-heading section-heading--center">
              <p className="eyebrow">WHAT ARE YOU WORKING ON?</p>
              <h2>Let’s find the right lighting for your project.</h2>
            </div>
            <p className="carousel-kicker"><span /> CONTINUOUSLY EXPLORING LIGHT</p>
          </div>
          <div className="solution-carousel-shell solution-marquee" aria-label="Continuously moving lighting solutions">
            <div className="solution-grid">
              {[0, 1].map((group) => (
                <div className="solution-marquee-group" key={group} aria-hidden={group === 1 ? "true" : undefined}>
                  {solutions.map((solution) => {
                    const Icon = solution.icon;
                    return (
                      <a className="solution-card" href="#contact" key={`${group}-${solution.name}`} tabIndex={group === 1 ? -1 : undefined}>
                        <div className="solution-visual">
                          <img src={solution.image} alt={group === 0 ? `${solution.name} lighting` : ""} />
                          <div className="solution-shade" />
                          <Icon className="solution-icon" strokeWidth={1.5} />
                        </div>
                        <div className="solution-copy">
                          <h3>{solution.name}</h3>
                          <p>{solution.description}</p>
                          <ArrowRight size={17} />
                        </div>
                      </a>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="section-cta-row motion-reveal">
            <p>Not sure which solution belongs in your project?</p>
            <a className="button button--ink" href="#contact">Get expert advice <ArrowRight size={17} /></a>
          </div>
        </section>

        <section id="best-sellers" className="best-sellers-section" aria-labelledby="best-sellers-title">
          <div className="best-sellers-heading motion-reveal">
            <p className="eyebrow">MOST SPECIFIED</p>
            <h2 id="best-sellers-title">Lighting Solutions Homeowners Love</h2>
            <p>A considered edit of architectural fixtures for layered, comfortable light.</p>
          </div>
          <div className="best-seller-stage">
            {bestSellers.map((product, index) => {
              const offset = getBestSellerOffset(index);
              const distance = Math.abs(offset);
              const isActive = offset === 0;
              return (
                <article
                  className={`best-seller-card ${isActive ? "is-active" : ""}`}
                  key={product.name}
                  aria-hidden={distance > 2 ? "true" : undefined}
                  style={{
                    "--x": `${offset * 390}px`,
                    "--mobile-x": `${offset * 86}vw`,
                    "--scale": distance === 0 ? 1 : distance === 1 ? 0.86 : 0.72,
                    "--opacity": distance === 0 ? 1 : distance === 1 ? 0.48 : distance === 2 ? 0.16 : 0,
                    "--z": 10 - distance,
                  } as React.CSSProperties}
                >
                  <div className="best-seller-image"><img src={product.image} alt={product.name} /></div>
                  <div className="best-seller-copy">
                    <p>{product.eyebrow}</p>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <ul className="best-seller-specs">
                      {product.specs.map((spec) => <li key={spec}>{spec}</li>)}
                    </ul>
                    <a href="#contact" tabIndex={isActive ? 0 : -1}>View product range <ArrowRight size={16} /></a>
                  </div>
                </article>
              );
            })}
            <button className="best-seller-arrow best-seller-arrow--left" type="button" onClick={() => setBestSellerIndex((current) => (current - 1 + bestSellers.length) % bestSellers.length)} aria-label="Previous best seller"><ChevronLeft /></button>
            <button className="best-seller-arrow best-seller-arrow--right" type="button" onClick={() => setBestSellerIndex((current) => (current + 1) % bestSellers.length)} aria-label="Next best seller"><ChevronRight /></button>
          </div>
          <div className="best-seller-dots" aria-label="Select a best seller">
            {bestSellers.map((product, index) => (
              <button type="button" key={product.name} className={index === bestSellerIndex ? "is-active" : ""} onClick={() => setBestSellerIndex(index)} aria-label={`Show ${product.name}`} aria-current={index === bestSellerIndex ? "true" : undefined} />
            ))}
          </div>
          <div className="best-seller-footer motion-reveal">
            <p><strong>{String(bestSellerIndex + 1).padStart(2, "0")}</strong> / {bestSellers.length} complete lighting ranges</p>
            <a className="button button--gold" href="#contact">Specify your project <ArrowRight size={17} /></a>
          </div>
        </section>

        <section id="team" className="team-section" aria-labelledby="team-title">
          <div className="team-inner">
            <div className="team-intro motion-reveal">
              <p className="eyebrow">MEET THE TEAM</p>
              <h2 id="team-title">Lighting expertise,<br />delivered personally.</h2>
              <p>Great lighting starts with people who listen. Our team brings practical experience, clear advice and genuine care to every conversation—so your project feels considered from the first plan to the final fitting.</p>
              <div className="team-principles" aria-label="How our team works">
                <span><strong>01</strong> Straight answers</span>
                <span><strong>02</strong> Personal guidance</span>
                <span><strong>03</strong> Detail-led service</span>
              </div>
              <a className="text-action text-action--light" href="#contact"><span><small>START A CONVERSATION</small>Talk with our team.</span><ArrowRight size={17} /></a>
            </div>
            <div className="team-portraits">
              <figure className="team-card team-card--one motion-reveal">
                <img src={TEAM_PORTRAIT_ONE} alt="ME Lighting team member in a contemporary lighting showroom" />
                <figcaption>
                  <p>ME LIGHTING TEAM</p>
                  <h3>Real advice. No guesswork.</h3>
                  <span>Approachable guidance shaped around your plans, priorities and budget.</span>
                </figcaption>
              </figure>
              <figure className="team-card team-card--two motion-reveal">
                <img src={TEAM_PORTRAIT_TWO} alt="ME Lighting team member in a contemporary lighting showroom" />
                <figcaption>
                  <p>ME LIGHTING TEAM</p>
                  <h3>Every detail, personally supported.</h3>
                  <span>A calm, responsive process that keeps decisions clear and projects moving.</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="knowledge" className="section knowledge-section">
          <div className="knowledge-intro motion-reveal">
            <p className="eyebrow">KNOWLEDGE CENTRE</p>
            <h2>Answers to the questions everyone is asking.</h2>
            <p>Practical guides, expert tips and plain-English advice to help you get your lighting right.</p>
            <a className="text-action" href="#articles"><span>Explore articles</span><ArrowRight size={18} /></a>
          </div>
          <div id="articles" className="article-grid">
            {articles.map((article, index) => (
              <article className="article-card motion-reveal" key={article.title} style={{ "--delay": `${index * 55}ms` } as React.CSSProperties}>
                <div className="article-image"><img src={article.image} alt="" /></div>
                <div className="article-copy">
                  <p className="article-date">{article.date}</p>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <a href="#contact" aria-label={`Read ${article.title}`}><MoveUpRight size={18} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="plans-cta">
          <img src={PLANS_IMAGE} alt="Residential lighting plans on an architect's desk" />
          <div className="plans-overlay" />
          <div className="plans-copy motion-reveal">
            <p className="eyebrow">YOUR PROJECT, OUR EXPERTISE</p>
            <h2>Get expert advice.</h2>
            <p>Share your plans, photos or ideas and our lighting specialists will help shape a tailored recommendation for your project.</p>
            <a className="button button--gold" href="#contact">Talk with a specialist <ArrowRight size={18} /></a>
          </div>
        </section>

        <section className="reassurance-section" aria-label="Benefits of expert lighting advice">
          <div className="reassurance-grid">
            {reassurance.map((item) => {
              const Icon = item.icon;
              return (
                <div className="reassurance" key={item.title}>
                  <Icon strokeWidth={1.5} />
                  <div><h3>{item.title}</h3><p>{item.copy}</p></div>
                </div>
              );
            })}
          </div>
          <a className="reassurance-cta" href="#contact">Get expert advice for your project <ArrowRight size={16} /></a>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-intro motion-reveal">
            <p className="eyebrow">START A CONVERSATION</p>
            <h2>Bring us the plan.<br />We’ll bring it to life.</h2>
            <p>Tell us where your project is up to. We’ll help you identify the next practical step.</p>
            <div className="contact-points">
              <a href="tel:+611800411754"><Phone size={17} /> 1800 411 754</a>
              <a href="mailto:sales@melighting.com.au"><Mail size={17} /> sales@melighting.com.au</a>
            </div>
          </div>
          <form className="brief-form" onSubmit={submitBrief}>
            <label>
              <span>Your name</span>
              <input name="name" type="text" placeholder="Alex Morgan" required />
            </label>
            <label>
              <span>Email address</span>
              <input name="email" type="email" placeholder="alex@example.com" required />
            </label>
            <label>
              <span>Project type</span>
              <select name="project" defaultValue="">
                <option value="" disabled>Select a project</option>
                {solutions.map((solution) => <option key={solution.name} value={solution.name}>{solution.name}</option>)}
              </select>
            </label>
            <label className="file-field">
              <span>Plans or inspiration</span>
              <input
                name="plans"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
              />
              <div><Upload size={18} /><span>{fileName || "Choose PDF or image"}</span></div>
            </label>
            <label className="form-wide">
              <span>What can we help with?</span>
              <textarea name="message" rows={4} placeholder="Tell us about the space, timeline and what you would like the lighting to achieve." />
            </label>
            <button className="button button--gold form-wide" type="submit">Send project brief <ArrowRight size={18} /></button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand />
            <p>Lighting. Solved.<br />Expert advice. Premium products.<br />Confidence in every decision.</p>
          </div>
          <div className="footer-column">
            <h3>Solutions</h3>
            {solutions.map((solution) => <a href="#solutions" key={solution.name}>{solution.name}</a>)}
          </div>
          <div className="footer-column">
            <h3>Knowledge centre</h3>
            <a href="#knowledge">All articles</a>
            <a href="#knowledge">Lighting guides</a>
            <a href="#knowledge">LED strip guides</a>
            <a href="#knowledge">Outdoor lighting</a>
            <a href="#knowledge">Smart lighting</a>
          </div>
          <div className="footer-column">
            <h3>Company</h3>
            <a href="#team">About us</a>
            <a href="#team">Our process</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact us</a>
          </div>
          <address className="footer-contact">
            <a href="tel:+611800411754"><Phone size={15} /> 1800 411 754</a>
            <a href="mailto:sales@melighting.com.au"><Mail size={15} /> sales@melighting.com.au</a>
            <span><MapPin size={15} /> Sydney & Mittagong, NSW</span>
            <div className="socials">
              <a aria-label="Instagram" href="https://www.instagram.com/me_lighting/" target="_blank" rel="noreferrer"><Instagram size={18} /></a>
              <a aria-label="YouTube" href="#top"><Youtube size={19} /></a>
              <a aria-label="Knowledge centre" href="#knowledge"><BookOpen size={18} /></a>
            </div>
          </address>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ME Lighting. All rights reserved.</p>
          <a className="crafted-by" href="https://proairmarketing.com/" target="_blank" rel="noreferrer" aria-label="Crafted by ProAir Marketing">
            <img
              src="/crafted.png"
              alt="Crafted by ProAir Marketing"
              width={168}
              height={48}
            />
          </a>
          <p>Design · Supply · Install</p>
        </div>
      </footer>
    </div>
  );
}
