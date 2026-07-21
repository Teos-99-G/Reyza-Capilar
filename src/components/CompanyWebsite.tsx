import React, { useState, useEffect } from "react";
import { CompanyData } from "../types";
import LucideIcon from "./LucideIcon";
import { motion, AnimatePresence } from "motion/react";
import reyzaLogoImg from "../assets/images/reyza_capilar_logo_original_style_1784592269123.jpg";

interface CompanyWebsiteProps {
  data: CompanyData;
  isMobilePreview?: boolean;
}

function ReyzaLogo({ colors, companyName, light = false }: { colors: any; companyName: string; light?: boolean }) {
  const isReyza = companyName.toLowerCase().includes("reyza");
  if (!isReyza) {
    return (
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 flex items-center justify-center font-bold text-white text-base rounded-none"
          style={{ backgroundColor: colors.primary }}
        >
          {companyName ? companyName.charAt(0).toUpperCase() : "S"}
        </div>
        <span className="font-bold text-base sm:text-lg tracking-wider uppercase font-sans" style={{ color: light ? "#ffffff" : colors.text }}>
          {companyName}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center overflow-hidden rounded-full border border-black/10 bg-white shadow-sm shrink-0">
        <img
          src={reyzaLogoImg}
          alt="Reyza Capilar Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-serif font-extrabold text-base sm:text-lg tracking-tight leading-none uppercase" style={{ color: light ? "#ffffff" : colors.text }}>
          Reyza <span style={{ color: colors.primary }}>Capilar</span>
        </span>
        <span className="text-[8px] uppercase tracking-widest font-sans font-bold leading-none mt-1" style={{ color: colors.accent }}>
          De la realeza a tu cabello
        </span>
      </div>
    </div>
  );
}

export default function CompanyWebsite({ data, isMobilePreview = false }: CompanyWebsiteProps) {
  const [activeSection, setActiveSection] = useState("inicio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  
  // High-converting professional real countdown timer (counts down to midnight daily)
  const [timeLeft, setTimeLeft] = useState({ hours: "02", minutes: "45", seconds: "00" });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetTime = new Date();
      targetTime.setHours(23, 59, 59, 999); // Countdown to tonight
      
      let diff = targetTime.getTime() - now.getTime();
      if (diff < 0) {
        diff = 24 * 60 * 60 * 1000 + diff; // Safety wrap-around
      }
      
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      
      setTimeLeft({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const {
    companyName,
    tagline,
    description,
    colors,
    aboutUs,
    services,
    features,
    testimonials,
    contactInfo,
  } = data;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  const hexToRgba = (hex: string, opacity: number) => {
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const navLinks = [
    { id: "inicio", label: "Inicio" },
    { id: "servicios", label: "Servicios" },
    { id: "sobre-nosotros", label: "Nosotros" },
    { id: "valores", label: "Valores" },
    { id: "testimonios", label: "Clientes" },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col font-sans selection:bg-red-100 transition-colors duration-500 overflow-x-hidden bg-[#FDFCFB]"
      style={{ color: colors.text }}
    >
      {/* REAL COUNTDOWN PROMO BAR */}
      {companyName.toLowerCase().includes("reyza") && (
        <div className="bg-[#10482B] text-white py-2 px-4 text-center text-xs font-sans tracking-wide z-50 relative flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-1 select-none border-b border-white/5 shadow-sm">
          <span className="font-bold text-[10px] sm:text-[11px] uppercase tracking-wider text-amber-300 animate-pulse flex items-center gap-1 shrink-0">
            👑 ¡OFERTA REAL DE HOY!
          </span>
          <span className="text-[11px] text-white/90 font-serif leading-tight text-center">
            Consigue tu <strong className="text-white">Kit Capilar Premium</strong> con <strong className="text-amber-300">15% de Descuento</strong> + Envío Nacional Totalmente Gratis.
          </span>
          <div className="flex items-center gap-1.5 font-mono text-[11px] bg-black/30 border border-white/10 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider text-amber-300 shrink-0">
            <span>TERMINA EN:</span>
            <span className="text-white font-extrabold">{timeLeft.hours}h</span>
            <span className="text-white/60">:</span>
            <span className="text-white font-extrabold">{timeLeft.minutes}m</span>
            <span className="text-white/60">:</span>
            <span className="text-white font-extrabold animate-pulse">{timeLeft.seconds}s</span>
          </div>
        </div>
      )}

      {/* HEADER & NAVIGATION (Editorial Classic Style) */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b bg-[#FDFCFB]/90 transition-all duration-300"
        style={{
          borderColor: hexToRgba(colors.text, 0.1),
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* BRAND LOGO */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => scrollToSection("inicio")}
            >
              <ReyzaLogo colors={colors} companyName={companyName} />
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:text-[#C52B2F]"
                  style={{
                    color: activeSection === link.id ? colors.primary : colors.text,
                  }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contacto")}
                className="ml-4 px-6 py-3 rounded-none text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors"
                style={{
                  backgroundColor: colors.primary,
                  color: "#ffffff",
                }}
              >
                Contacto
              </button>
            </nav>

            {/* MOBILE NAV BUTTON */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 transition-colors hover:bg-black/5 rounded-none"
                style={{ color: colors.primary }}
              >
                <LucideIcon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t bg-[#FDFCFB]"
              style={{
                borderColor: hexToRgba(colors.text, 0.1),
              }}
            >
              <div className="px-6 py-6 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="w-full text-left py-3 text-xs font-bold uppercase tracking-widest transition-colors border-b border-black/5"
                    style={{
                      color: activeSection === link.id ? colors.primary : colors.text,
                    }}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="w-full text-center py-3.5 mt-4 rounded-none text-xs font-bold uppercase tracking-widest"
                  style={{
                    backgroundColor: colors.primary,
                    color: "#ffffff",
                  }}
                >
                  Contacto Directo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* DUAL-COLUMN HERO SECTION (Editorial Layout) */}
      <section id="inicio" className="relative border-b border-black/10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[640px]">
          
          {/* LEFT COLUMN: Deep typographic messaging */}
          <motion.div
            className="lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col justify-center border-r border-black/10 bg-[#FDFCFB] relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-6xl md:text-[72px] font-extrabold leading-[0.95] tracking-tighter mb-8 font-serif" style={{ color: colors.text }}>
                {companyName.toLowerCase().includes("reyza") ? (
                  <>
                    DE LA REALEZA <br />
                    <span className="italic font-normal" style={{ color: colors.accent }}>A TU</span> <br />
                    CABELLO.
                  </>
                ) : (
                  <>
                    IMPULSANDO LA <span style={{ color: colors.primary }}>EXCELENCIA</span> E <span className="italic font-normal font-serif">INNOVACIÓN</span> SUSTENTABLE.
                  </>
                )}
              </h1>
              
              <p className="text-base sm:text-lg text-black/70 max-w-lg mb-10 leading-relaxed font-serif">
                {description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("servicios")}
                  className="px-8 py-4 text-white rounded-none font-bold uppercase text-xs tracking-widest hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
                  style={{ backgroundColor: colors.primary }}
                >
                  <span>{companyName.toLowerCase().includes("reyza") ? "Ver Productos" : "Nuestros Servicios"}</span>
                  <LucideIcon name="ArrowRight" size={14} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Elegant solid-charcoal background stat cards */}
          <motion.div
            className="lg:col-span-5 bg-[#1A1A1A] text-white p-8 sm:p-12 md:p-16 flex flex-col justify-between relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            {/* Visual Element: Large Typographic Background */}
            <div className="absolute -top-10 -right-10 text-[120px] sm:text-[180px] font-black text-white/5 pointer-events-none uppercase leading-none font-sans select-none">
              {companyName.toLowerCase().includes("reyza") ? "Reyza" : "Global"}
            </div>

            <div className="relative z-10 space-y-12 mt-10">
              <div className="border-l-4 pl-6" style={{ borderColor: colors.primary }}>
                <h3 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight">
                  {companyName.toLowerCase().includes("reyza") ? "100%" : "+10 Años"}
                </h3>
                <p className="text-white/40 uppercase tracking-widest text-[11px] font-bold mt-1">
                  {companyName.toLowerCase().includes("reyza") ? "Ingredientes de Origen Natural" : "De Experiencia e Ingeniería Certificada"}
                </p>
              </div>
              
              <div className="border-l-4 pl-6" style={{ borderColor: colors.primary }}>
                <h3 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight">
                  {companyName.toLowerCase().includes("reyza") ? "Sin Sal" : "100%"}
                </h3>
                <p className="text-white/40 uppercase tracking-widest text-[11px] font-bold mt-1">
                  {companyName.toLowerCase().includes("reyza") ? "Ni Parabenos para todo tipo de cabello" : "Compromiso y Rigurosidad Técnica"}
                </p>
              </div>

              <div className="border-l-4 pl-6" style={{ borderColor: colors.primary }}>
                <h3 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight">
                  {companyName.toLowerCase().includes("reyza") ? "Belleza" : "98%"}
                </h3>
                <p className="text-white/40 uppercase tracking-widest text-[11px] font-bold mt-1">
                  {companyName.toLowerCase().includes("reyza") ? "Sostenible inspirada en tu bienestar" : "Satisfacción en Diagnósticos de Planta"}
                </p>
              </div>
            </div>

            {/* Editorial Brand Quote Section */}
            <div className="mt-16 lg:mt-auto relative z-10">
              <p className="italic text-base sm:text-lg text-white/80 leading-relaxed font-serif">
                "{aboutUs.mission ? aboutUs.mission.slice(0, 180) : "Nuestra misión es transformar los desafíos en ventajas competitivas y sustentables para todos nuestros socios comerciales."}..."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-0.5" style={{ backgroundColor: colors.primary }}></div>
                <span className="uppercase tracking-widest text-[10px] font-bold font-mono">Dirección General</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM FEATURE BAR (Quick Horizontals) */}
        <div className="hidden lg:grid grid-cols-4 h-24 bg-white border-t border-black/10 select-none">
          {services.slice(0, 3).map((svc, i) => (
            <div
              key={i}
              className="flex items-center px-10 border-r border-black/10 gap-4 hover:bg-slate-50 transition-colors cursor-pointer group"
              onClick={() => scrollToSection("servicios")}
            >
              <span className="text-2xl font-bold font-serif transition-colors group-hover:text-red-700" style={{ color: colors.primary }}>
                0{i + 1}
              </span>
              <span className="uppercase text-[11px] font-extrabold tracking-widest text-black/80 font-sans line-clamp-2">
                {svc.title}
              </span>
            </div>
          ))}
          <div
            className="flex items-center justify-between px-10 text-white cursor-pointer hover:opacity-95 transition-opacity"
            style={{ backgroundColor: colors.primary }}
            onClick={() => scrollToSection("contacto")}
          >
            <span className="uppercase text-[11px] font-bold tracking-widest">
              {companyName.toLowerCase().includes("reyza") ? "Contáctanos" : "Agenda una Cita"}
            </span>
            <LucideIcon name="ArrowRight" size={18} />
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="servicios" className="py-24 border-b border-black/10 bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/10">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest font-mono block mb-2" style={{ color: colors.primary }}>
                {companyName.toLowerCase().includes("reyza") ? "Fórmulas de la Realeza" : "Soluciones Especializadas"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-slate-900">
                {companyName.toLowerCase().includes("reyza") ? "Nuestra Colección Capilar" : "Nuestros Servicios Especializados"}
              </h2>
            </div>
            <p className="text-sm font-serif text-slate-500 max-w-sm mt-4 md:mt-0 leading-relaxed">
              {companyName.toLowerCase().includes("reyza") 
                ? "Productos ecológicos desarrollados con ingredientes botánicos puros sin sal ni parabenos para elevar el cuidado de tu cabello."
                : "Ingeniería de vanguardia, diagnóstico preciso y metodologías avaladas internacionalmente para elevar su negocio."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black/10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group p-8 border-r border-b border-black/10 bg-white hover:bg-[#FDFCFB] transition-all duration-300 flex flex-col justify-between min-h-[300px]"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-10 h-10 flex items-center justify-center text-white"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <LucideIcon name={service.icon} size={18} />
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-bold">
                      0{index + 1}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold mb-4 font-serif text-slate-900 group-hover:text-red-700 transition-colors">
                    {service.title}
                  </h4>

                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-sans">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => scrollToSection("contacto")}
                    className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 group/btn cursor-pointer"
                    style={{ color: colors.primary }}
                  >
                    <span>{companyName.toLowerCase().includes("reyza") ? "Adquirir Producto" : "Solicitar información"}</span>
                    <LucideIcon
                      name="ArrowRight"
                      className="transition-transform group-hover/btn:translate-x-1"
                      size={12}
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INGREDIENTES NATURALES DE LA REALEZA SECTION */}
      {companyName.toLowerCase().includes("reyza") && (
        <section className="py-24 border-b border-black/10 bg-white relative overflow-hidden">
          {/* Subtle design foliage elements in background margins */}
          <div className="absolute top-12 left-6 text-slate-100 opacity-20 pointer-events-none text-9xl font-serif">
            ❀
          </div>
          <div className="absolute bottom-12 right-6 text-slate-100 opacity-20 pointer-events-none text-9xl font-serif">
            🍃
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
            <div className="max-w-2xl mb-16">
              <span className="text-xs font-bold uppercase tracking-widest font-mono block mb-2" style={{ color: colors.accent }}>
                La Receta de la Realeza
              </span>
              <h3 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-slate-900">
                8 Extractos Botánicos Puros
              </h3>
              <p className="text-sm font-serif text-slate-500 mt-4 leading-relaxed">
                Seleccionamos cada activo de la naturaleza con rigurosidad botánica para brindarte nutrición real, fortaleza, hidratación y brillo supremo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Botantical Ingredients Cards Grid */}
              {[
                { name: "Sábila (Aloe Vera)", desc: "Hidrata intensamente, equilibra el cuero cabelludo y acondiciona las hebras de raíz a puntas.", icon: "Sprout" },
                { name: "Romero", desc: "Estimula la irrigación del folículo capilar, promueve el crecimiento acelerado y previene la caída.", icon: "Leaf" },
                { name: "Aceite de Coco", desc: "Nutre la fibra capilar desde el interior, restaura el brillo natural y sella las puntas abiertas.", icon: "Flame" },
                { name: "Linaza", desc: "Aporta Omega-3, previene la rotura de la hebra y define ondas o rizos con soltura y suavidad extrema.", icon: "Sparkles" },
                { name: "Jengibre", desc: "Limpia y desinfecta profundamente, combate la descamación y estimula el brillo vital.", icon: "Wind" },
                { name: "Cebolla Morada", desc: "Activa el flujo sanguíneo gracias al azufre, acelerando el crecimiento y duplicando la densidad.", icon: "Circle" },
                { name: "Extracto de Rey", desc: "Exclusivo elixir que hidrata, suaviza al instante y envuelve el cabello en un escudo real de sedosidad.", icon: "Award" },
                { name: "Extracto de Avena", desc: "Calma irritaciones, fortalece las proteínas estructurales de la cutícula y previene la resequedad.", icon: "Flower" }
              ].map((ingredient, i) => (
                <motion.div
                  key={i}
                  className="p-6 border border-black/10 bg-[#FCFAF6] hover:bg-white transition-all duration-300 group flex flex-col justify-between min-h-[190px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-300">0{i + 1}</span>
                    <span style={{ color: colors.primary }}>
                      <LucideIcon name={ingredient.icon} size={20} />
                    </span>
                  </div>
                  <div>
                    <h5 className="text-base font-bold font-serif text-slate-900 group-hover:text-amber-700 transition-colors">
                      {ingredient.name}
                    </h5>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {ingredient.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ABOUT US SECTION */}
      <section id="sobre-nosotros" className="py-24 border-b border-black/10 bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Big Statement & Narrative */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest font-mono block mb-2" style={{ color: colors.primary }}>
                  Trayectoria y Legado
                </span>
                <h3 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight text-slate-900">
                  {aboutUs.title}
                </h3>
              </div>
              
              <p className="text-lg leading-relaxed font-serif text-slate-700 italic border-l-4 pl-6 border-black/15">
                {aboutUs.history}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="p-6 bg-white border border-black/10 rounded-none">
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ color: colors.primary }}>
                      <LucideIcon name="Award" size={18} />
                    </span>
                    <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900">Nuestra Misión</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{aboutUs.mission}</p>
                </div>
                
                <div className="p-6 bg-white border border-black/10 rounded-none">
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ color: colors.primary }}>
                      <LucideIcon name="Globe" size={18} />
                    </span>
                    <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900">Nuestra Visión</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{aboutUs.vision}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial visual/stat layout block */}
            <div className="lg:col-span-5 bg-white border border-black/10 p-8 sm:p-10 space-y-8">
              <h4 className="text-xs font-bold uppercase tracking-widest font-mono border-b pb-4 border-black/10 text-slate-900">
                {companyName.toLowerCase().includes("reyza") ? "COMPROMISO DE CALIDAD" : "PILARES OPERATIVOS"}
              </h4>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span>{companyName.toLowerCase().includes("reyza") ? "Ingredientes Orgánicos" : "Sostenibilidad"}</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100">
                    <div className="h-full bg-black" style={{ width: "100%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span>{companyName.toLowerCase().includes("reyza") ? "Fórmula Libre de Químicos" : "Cumplimiento Normativo"}</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100">
                    <div className="h-full bg-black" style={{ width: "100%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span>{companyName.toLowerCase().includes("reyza") ? "Sostenibilidad y Ecología" : "Ingeniería Avanzada"}</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100">
                    <div className="h-full bg-black" style={{ width: "100%" }} />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-black/10 text-xs text-slate-500 leading-relaxed font-serif italic">
                {companyName.toLowerCase().includes("reyza")
                  ? `"Cada fórmula de Reyza Capilar es cuidadosamente desarrollada para asegurar el máximo respeto por tu bienestar y el cuidado real de tu cabello."`
                  : `"Nos aseguramos de que toda solución técnica cuente con un retorno de inversión real, alineando viabilidad financiera con responsabilidad ambiental."`}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VALUES / PILARS SECTION */}
      <section id="valores" className="py-24 border-b border-black/10 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest font-mono text-[#C52B2F] block mb-2" style={{ color: colors.primary }}>
              ¿Por qué Elegirnos?
            </span>
            <h3 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight">
              Nuestros Pilares y Valores
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 border border-white/10 rounded-none bg-white/[0.02] hover:bg-white/[0.05] transition-all flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-6"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <LucideIcon name={feature.icon} size={18} className="text-white" />
                  </div>
                  
                  <h4 className="text-lg font-bold mb-2 font-serif text-white">
                    {feature.title}
                  </h4>
                </div>

                <p className="text-xs leading-relaxed text-white/60 font-sans">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonios" className="py-24 border-b border-black/10 bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-widest font-mono block mb-2" style={{ color: colors.primary }}>
              Casos de Éxito
            </span>
            <h3 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-slate-900">
              Socios Satisfechos
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-black/10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 sm:p-10 border-r border-b border-black/10 bg-white flex flex-col justify-between min-h-[340px]"
              >
                <div>
                  {/* Giant physical-looking quote icon */}
                  <span className="text-7xl font-serif text-slate-200 block -mt-4 mb-2">“</span>
                  <p className="text-sm italic leading-relaxed text-slate-700 font-serif -mt-6">
                    {testimonial.text}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-xs font-extrabold text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      {testimonial.name}
                    </h5>
                    <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (Premium Printed Card look) */}
      <section id="contacto" className="py-24 bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left: Contact Info details */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-8 pr-0 lg:pr-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest font-mono block mb-2" style={{ color: colors.primary }}>
                  Contacto Directo
                </span>
                <h3 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-slate-900">
                  {companyName.toLowerCase().includes("reyza") ? "Ponte en Contacto" : "Permítanos Asesorarle"}
                </h3>
              </div>
              
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-serif">
                {companyName.toLowerCase().includes("reyza")
                  ? "Si tienes dudas sobre cuál es el producto ideal para tu tipo de cabello o deseas realizar un pedido, escríbenos directamente a nuestro WhatsApp o Instagram, o compártenos tus datos a través de este formulario."
                  : "Si desea un diagnóstico preliminar para su planta, cotizar la instalación de sistemas limpios o resolver dudas regulatorias, agende directamente o llene el formulario."}
              </p>

              <div className="space-y-4 pt-6 border-t border-black/10">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center border border-black/15 text-slate-900 shrink-0">
                    <LucideIcon name="Mail" size={14} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">CORREO</span>
                    <p className="text-xs font-mono font-bold text-slate-800">
                      <a href={`mailto:${contactInfo.email}`} className="hover:underline hover:text-amber-700 transition-colors">
                        {contactInfo.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center border border-black/15 text-slate-900 shrink-0">
                    <LucideIcon name="MessageSquare" size={14} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">WHATSAPP</span>
                    <p className="text-xs font-mono font-bold text-slate-800">
                      <a href="https://wa.me/573213752032" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-amber-700 transition-colors flex items-center gap-1">
                        {contactInfo.phone} <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 font-sans rounded-sm font-normal">Chatea ahora</span>
                      </a>
                    </p>
                  </div>
                </div>

                {companyName.toLowerCase().includes("reyza") && (
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 flex items-center justify-center border border-black/15 text-slate-900 shrink-0">
                      <LucideIcon name="Instagram" size={14} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">INSTAGRAM</span>
                      <p className="text-xs font-mono font-bold text-slate-800">
                        <a href="https://instagram.com/reyza_capilar" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-amber-700 transition-colors">
                          @reyza_capilar
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center border border-black/15 text-slate-900 shrink-0">
                    <LucideIcon name="MapPin" size={14} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">DIRECCIÓN</span>
                    <p className="text-xs font-sans text-slate-700">{contactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center border border-black/15 text-slate-900 shrink-0">
                    <LucideIcon name="Calendar" size={14} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ATENCIÓN</span>
                    <p className="text-xs font-sans text-slate-700">{contactInfo.schedule}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Printed Form Card */}
            <div className="lg:col-span-7 bg-white border border-black/10 p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="text-center py-16 space-y-4"
                  >
                    <div
                      className="w-12 h-12 flex items-center justify-center text-white mx-auto"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <LucideIcon name="Check" size={24} />
                    </div>
                    <h4 className="text-xl font-bold uppercase tracking-wider font-sans">
                      {companyName.toLowerCase().includes("reyza") ? "Mensaje Recibido" : "Solicitud Recibida"}
                    </h4>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                      {companyName.toLowerCase().includes("reyza")
                        ? "¡Muchas gracias por contactarnos! Tu mensaje ha sido recibido con éxito. Estaremos respondiendo tu solicitud en el menor tiempo posible para brindarte la mejor asesoría capilar."
                        : "Muchas gracias por su confianza. Un ingeniero consultor se pondrá en contacto con usted en un plazo máximo de 24 horas hábiles."}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleContactSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-black/10 bg-transparent text-xs focus:outline-none focus:border-black rounded-none transition-colors"
                          placeholder="Ej. Juan Pérez"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                          {companyName.toLowerCase().includes("reyza") ? "Correo electrónico" : "Correo corporativo"}
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-black/10 bg-transparent text-xs focus:outline-none focus:border-black rounded-none transition-colors"
                          placeholder={companyName.toLowerCase().includes("reyza") ? "Ej. juan@gmail.com" : "Ej. juan@empresa.com"}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                        {companyName.toLowerCase().includes("reyza") ? "Cuéntanos sobre tu tipo de cabello o tu pedido" : "Descripción del Requerimiento"}
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-black/10 bg-transparent text-xs focus:outline-none focus:border-black rounded-none transition-colors resize-none leading-relaxed"
                        placeholder={companyName.toLowerCase().includes("reyza") 
                          ? "Por favor, cuéntanos cómo podemos ayudarte con el cuidado de tu cabello o detalla los productos que deseas adquirir aquí..."
                          : "Por favor, comparta información sobre su consumo, auditoría o requerimientos específicos aquí..."}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-none text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2 text-white"
                      style={{
                        backgroundColor: colors.primary,
                      }}
                    >
                      <LucideIcon name="Mail" size={14} />
                      <span>{companyName.toLowerCase().includes("reyza") ? "Enviar Mensaje" : "Agendar Asesoría"}</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1A1A] text-white/80 py-16 border-t border-white/10 mt-auto select-none font-sans">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <ReyzaLogo colors={colors} companyName={companyName} light={true} />
              </div>
              <p className="text-xs text-white/40 max-w-sm leading-relaxed">
                {description}
              </p>
            </div>

            <div>
              <h5 className="font-bold text-xs uppercase tracking-widest text-white mb-6">Contenidos</h5>
              <ul className="space-y-3 text-xs">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-white/60 hover:text-white transition-colors text-left font-bold uppercase tracking-wider text-[10px]"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="font-bold text-xs uppercase tracking-widest text-white mb-6">Contacto Directo</h5>
              <p className="text-xs text-white/50 leading-relaxed font-mono">
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors block">
                  {contactInfo.email}
                </a>
                <a href="https://wa.me/573213752032" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block mt-1">
                  WhatsApp: {contactInfo.phone}
                </a>
                {companyName.toLowerCase().includes("reyza") && (
                  <a href="https://instagram.com/reyza_capilar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block mt-1">
                    Instagram: @reyza_capilar
                  </a>
                )}
                <span className="font-sans block mt-2 text-[11px] text-white/30">{contactInfo.address}</span>
              </p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/40">
            <span>&copy; {new Date().getFullYear()} {companyName}. Todos los derechos reservados.</span>
            <div className="mt-4 sm:mt-0 flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Términos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING PULSING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/573213752032?text=Hola!%20Vengo%20desde%20su%20página%20web%20y%20quiero%20más%20información%20sobre%20el%20Kit%20Capilar%20Premium%20con%20el%2015%25%20de%20descuento"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group hover:rotate-6 select-none"
        id="whatsapp-floating-btn"
        aria-label="Contactar por WhatsApp"
      >
        {/* Glow pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping duration-1000 group-hover:animate-none"></span>
        <LucideIcon name="MessageCircle" size={28} className="relative z-10 text-white" />
      </a>
    </div>
  );
}
