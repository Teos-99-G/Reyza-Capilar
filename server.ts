import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Configuración de body parser con límite ampliado para soportar textos largos
app.use(express.json({ limit: "15mb" }));

// Inicialización de Google GenAI para el backend de forma segura
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Endpoint de salud
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is healthy" });
});

// Endpoint para analizar y extraer datos de la empresa desde el PDF o texto proporcionado
app.post("/api/analyze-company", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ error: "Por favor, proporciona el texto de la empresa o PDF para analizar." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "La clave API de Gemini no está configurada. Por favor, añádela en la sección Settings > Secrets."
      });
    }

    const systemInstruction = `
      Eres un experto diseñador web, especialista en marcas y estratega de contenido corporativo.
      Tu tarea es analizar el texto extraído del PDF o documento corporativo de una empresa, y estructurar toda la información para poder construir un sitio web corporativo moderno, responsivo y altamente atractivo.
      Debes identificar:
      1. El nombre real de la empresa y su propósito principal.
      2. Una paleta de colores de la empresa (Primary, Secondary, Accent, Background, Text) que refleje de manera exacta la marca descrita en el PDF. Asegúrate de proporcionar códigos de color en formato HEX (ej. #1E3A8A) coherentes y estéticos. Si la marca usa colores específicos como verde ecológico, azul tecnológico, rojo elegante, etc., usa esos tonos exactos o dedúcelos de la descripción. El color de fondo ('background') debe ser claro (ej. #f8fafc o #ffffff) para una óptima legibilidad.
      3. Un eslogan profesional y una descripción atractiva de la empresa.
      4. Sección "Sobre Nosotros" que contenga Título, Historia resumida, Misión y Visión inspiradoras basadas en el texto.
      5. Lista detallada de Servicios o Productos (hasta 6), asignando un título, descripción concisa y un icono adecuado de Lucide React (ej: 'Shield', 'Zap', 'Database', 'Globe', 'Briefcase', 'Cpu', 'Users', 'TrendingUp', 'Activity', 'Award', 'Heart', 'Code', 'Layers', 'Smartphone').
      6. Lista de Características / Valores clave (hasta 4) de por qué elegirlos (ej: 'Soporte 24/7', 'Innovación Constante', 'Garantía de Calidad') con descripciones cortas e iconos Lucide React idóneos (ej: 'CheckCircle', 'Award', 'Clock', 'Heart', 'Star', 'Smile').
      7. Testimonios ficticios o basados en el texto que den credibilidad (3 testimonios), incluyendo nombre, cargo y un comentario valioso.
      8. Información de Contacto coherente (email, teléfono, dirección, horario). Si no están claros en el texto, genéralos de manera profesional.

      IMPORTANTE: Toda la información generada debe ser redactada en un ESPAÑOL impecable, persuasivo y formal.
    `;

    const prompt = `Analiza el siguiente texto extraído del documento o PDF de la empresa y devuelve los datos estructurados en formato JSON según el esquema especificado:\n\n${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            companyName: { type: Type.STRING, description: "El nombre oficial de la empresa." },
            tagline: { type: Type.STRING, description: "Un eslogan corto y llamativo en español." },
            description: { type: Type.STRING, description: "Una descripción breve pero profesional de la empresa en español." },
            colors: {
              type: Type.OBJECT,
              properties: {
                primary: { type: Type.STRING, description: "Código HEX (ej: #1e3a8a) para el color principal de la marca, extraído o deducido de la identidad corporativa." },
                secondary: { type: Type.STRING, description: "Código HEX (ej: #0d9488) para el color secundario." },
                accent: { type: Type.STRING, description: "Código HEX (ej: #f59e0b) para botones de llamada a la acción y detalles destacados." },
                background: { type: Type.STRING, description: "Código HEX para el fondo general (se recomienda un color claro como #f8fafc o #ffffff)." },
                text: { type: Type.STRING, description: "Código HEX para el texto principal (usualmente un gris oscuro o negro como #0f172a)." }
              },
              required: ["primary", "secondary", "accent", "background", "text"]
            },
            aboutUs: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Título de la sección Sobre Nosotros." },
                history: { type: Type.STRING, description: "Historia o propósito principal de la empresa en español." },
                mission: { type: Type.STRING, description: "Misión de la empresa en español." },
                vision: { type: Type.STRING, description: "Visión de la empresa en español." }
              },
              required: ["title", "history", "mission", "vision"]
            },
            services: {
              type: Type.ARRAY,
              description: "Lista de servicios o productos que ofrece la empresa.",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Nombre del servicio o producto." },
                  description: { type: Type.STRING, description: "Detalle o explicación del servicio en español." },
                  icon: { type: Type.STRING, description: "Un nombre de icono de Lucide React sugerido que represente el servicio (ej: 'Shield', 'Zap', 'Database', 'Globe', 'Briefcase', 'Cpu', 'Users', 'TrendingUp')." }
                },
                required: ["title", "description", "icon"]
              }
            },
            features: {
              type: Type.ARRAY,
              description: "Características clave, valores o ventajas competitivas de la empresa (ej: 'Por qué elegirnos').",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Título de la característica o valor." },
                  description: { type: Type.STRING, description: "Explicación breve de la característica en español." },
                  icon: { type: Type.STRING, description: "Un nombre de icono de Lucide React adecuado (ej: 'CheckCircle', 'Award', 'Clock', 'Heart')." }
                },
                required: ["title", "description", "icon"]
              }
            },
            testimonials: {
              type: Type.ARRAY,
              description: "Testimonios o casos de éxito de clientes de la empresa.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Nombre del cliente." },
                  role: { type: Type.STRING, description: "Cargo o empresa del cliente." },
                  text: { type: Type.STRING, description: "El testimonio o comentario en español." }
                },
                required: ["name", "role", "text"]
              }
            },
            contactInfo: {
              type: Type.OBJECT,
              properties: {
                email: { type: Type.STRING, description: "Correo electrónico de contacto." },
                phone: { type: Type.STRING, description: "Teléfono de contacto." },
                address: { type: Type.STRING, description: "Dirección física o indicación si es 100% online." },
                schedule: { type: Type.STRING, description: "Horario de atención sugerido." }
              },
              required: ["email", "phone", "address", "schedule"]
            }
          },
          required: ["companyName", "tagline", "description", "colors", "aboutUs", "services", "features", "testimonials", "contactInfo"]
        },
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No se pudo obtener una respuesta válida del modelo.");
    }

    const resultJson = JSON.parse(resultText.trim());
    return res.json(resultJson);

  } catch (error: any) {
    console.error("Error analyzing company text:", error);
    return res.status(500).json({
      error: "Error interno al procesar con la Inteligencia Artificial: " + (error.message || error),
    });
  }
});

// Middleware de Vite o archivos estáticos según entorno
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
