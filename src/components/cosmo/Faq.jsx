import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "¿Qué ingredientes tiene Cosmo?",
    a: "Cosmo está hecho con extractos botánicos naturales, incluyendo manzanilla, pasiflora, melisa y vitaminas del complejo B. Todos los ingredientes son 100% naturales y libres de conservantes artificiales.",
  },
  {
    q: "¿Cosmo contiene cafeína?",
    a: "No, Cosmo es una bebida libre de cafeína. Está diseñada para relajar y calmar, no para estimular. Perfecta para cualquier momento del día, incluso antes de dormir.",
  },
  {
    q: "¿Cosmo es apto para veganos?",
    a: "Sí, todos los productos Cosmo son 100% veganos. No contienen ingredientes de origen animal y no son testados en animales.",
  },
  {
    q: "¿Dónde puedo comprar Cosmo?",
    a: "Puedes comprar Cosmo directamente en nuestra tienda online. También estamos disponibles en tiendas selectas de bienestar y supermercados premium. Pronto ampliaremos nuestra presencia.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-24 bg-[#f8f6ff]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <h2
          className="text-4xl sm:text-5xl font-bold text-center mb-4 text-[#2a2c69]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Preguntas{" "}
          <span className="bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] bg-clip-text text-transparent">
            Frecuentes
          </span>
        </h2>
        <p className="text-center text-[#2a2c69]/70 text-lg mb-12">
          Resolvemos tus dudas sobre Cosmo y sus beneficios.
        </p>

        <div className="space-y-4">
          {FAQS.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border-2 border-[#92d0d1]/15 bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-bold text-[#2a2c69] hover:bg-[#92d0d1]/5 transition-colors"
              >
                <span>{f.q}</span>
                <ChevronDown
                  size={22}
                  className={`shrink-0 text-[#288c84] transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  open === i
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-[#2a2c69]/80 leading-relaxed">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}