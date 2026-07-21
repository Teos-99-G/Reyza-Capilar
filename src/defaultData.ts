import { CompanyData } from "./types";

export const defaultCompanyData: CompanyData = {
  companyName: "Reyza Capilar",
  tagline: "De la realeza a tu cabello",
  description: "Una marca comprometida con el cuidado del cabello. Desarrollamos productos capilares de alta calidad a base de ingredientes naturales, especialmente diseñados para todo tipo de cabello, inspirados en brindarte confianza y bienestar.",
  colors: {
    primary: "#0f5132",     // Verde Bosque Editorial de la realeza
    secondary: "#1A1A1A",   // Carbón Oscuro
    accent: "#d4af37",      // Oro Corona de la realeza
    background: "#FCFAF6",  // Crema Editorial cálido
    text: "#1A1A1A"         // Carbón de lectura
  },
  aboutUs: {
    title: "¿Quiénes Somos?",
    history: "Reyza Capilar es una marca comprometida con el cuidado del cabello. Nacimos con el propósito de ofrecer productos de alta calidad que ayuden a mantener un cabello sano y fuerte. Creemos que el cuidado capilar va más allá de la apariencia, es una forma de expresar confianza y bienestar. Por eso trabajamos con dedicación para brindar soluciones que satisfagan las necesidades de nuestros clientes, siempre inspirados en nuestro lema: De La Realeza A Tu Cabello.",
    mission: "Desarrollar productos capilares de alta calidad a base de ingredientes naturales, especialmente diseñados para todo tipo de cabello, promoviendo la salud y el brillo natural.",
    vision: "Ser una marca de referencia en el mercado de productos capilares naturales, ofreciendo soluciones efectivas y ecológicas para el cuidado del cabello, promoviendo un enfoque sostenible con el medio ambiente."
  },
  services: [
    {
      title: "Champú Fortalecedor Natural",
      description: "Limpia profundamente la fibra capilar mientras fortalece el cabello desde la raíz. Enriquecido con Romero, Sábila y Aceite de coco para estimular un crecimiento sano.",
      icon: "Sparkles"
    },
    {
      title: "Acondicionador Hidratante",
      description: "Hidrata, suaviza y controla el frizz de manera inmediata. Aporta un brillo espectacular y manejabilidad extrema mediante el poder del Romero, Sábila y Aceite de coco.",
      icon: "Droplets"
    },
    {
      title: "Crema para Peinar Definitiva",
      description: "Facilita el peinado diario sin dejar residuos grasos. Brinda nutrición profunda, suavidad sublime y definición perfecta con Linaza, Aloe vera y Aceite de coco.",
      icon: "Flower"
    },
    {
      title: "Kit Capilar Premium",
      description: "Nuestra rutina completa de cuidado capilar diseñada para fortalecer, hidratar y embellecer tu cabello de manera 100% natural y desde la comodidad de tu hogar.",
      icon: "Gift"
    }
  ],
  features: [
    {
      title: "Calidad de Realeza",
      description: "Elaboramos productos con altos estándares e ingredientes seleccionados a mano para ofrecer los mejores resultados.",
      icon: "Award"
    },
    {
      title: "Compromiso de Cuidado",
      description: "Trabajamos con dedicación para satisfacer las necesidades de cada cliente y devolver la vitalidad a su cabello.",
      icon: "Heart"
    },
    {
      title: "Innovación Natural",
      description: "Buscamos mejorar constantemente nuestras fórmulas botánicas para brindar soluciones de alta efectividad capilar.",
      icon: "Zap"
    },
    {
      title: "Confianza y Transparencia",
      description: "Actuamos con honestidad y ofrecemos fórmulas transparentes para construir una relación duradera y sana con el cliente.",
      icon: "Shield"
    }
  ],
  testimonials: [
    {
      name: "Andrea Restrepo",
      role: "Cliente Fiel",
      text: "¡El Kit Capilar de Reyza transformó mi cabello! Llevaba años buscando un producto que controlara el frizz y el acondicionador de romero y coco me devolvió la vida y suavidad que tanto quería."
    },
    {
      name: "Dra. Carolina Martínez",
      role: "Especialista en Belleza Orgánica",
      text: "Me fascina la transparencia de Reyza Capilar. Sus ingredientes como la sábila, jengibre y cebolla morada nutren profundamente el folículo piloso sin recurrir a sales nocivas ni parabenos."
    },
    {
      name: "Sebastián Gómez",
      role: "Estilista Profesional",
      text: "La crema para peinar con extracto de linaza es excelente para todo tipo de cabellos. Ayuda a desenredar al instante y deja una textura sumamente ligera y brillante sin apelmazar."
    }
  ],
  contactInfo: {
    email: "reyzacapilar@gmail.com",
    phone: "321 375 2032",
    address: "Calle 2 sur 11 - 38 este",
    schedule: "Lunes a Sábado: 8:00 AM - 7:00 PM | Envíos nacionales y atención personalizada vía WhatsApp o Instagram"
  }
};
