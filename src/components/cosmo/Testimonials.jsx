import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Cosmo cambió mi rutina. Ahora tengo un momento de paz cada tarde. Me siento más enfocada y relajada.",
    name: "María L.",
    role: "Cliente Cosmo",
    color: "#92d0d1",
    initial: "M",
  },
  {
    quote:
      "El sabor es increíble y realmente funciona. Después de un día largo, Cosmo es mi mejor aliado.",
    name: "E. Jaramillo",
    role: "Cliente Cosmo",
    color: "#288c84",
    initial: "J",
  },
  {
    quote:
      "Recomiendo Cosmo a todos mis amigos. Es la bebida perfecta para desconectar y recargar energía.",
    name: "Manuela A.",
    role: "Cliente Cosmo",
    color: "#2a2c69",
    initial: "A",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-[#eef0f5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <h2
          className="text-4xl sm:text-5xl font-bold text-center mb-4 text-[#2a2c69]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Lo que dicen{" "}
          <span className="bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] bg-clip-text text-transparent">
            nuestros clientes
          </span>
        </h2>
        <p className="text-center text-[#2a2c69]/70 text-lg max-w-2xl mx-auto mb-14">
          Experiencias reales de personas que encontraron su calma con Cosmo.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#92d0d1]/15 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="flex gap-1 mb-4 text-[#d4af37]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <blockquote className="text-[#2a2c69]/80 italic leading-relaxed mb-6">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold border-2 border-[#92d0d1]"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initial}
                </div>
                <div>
                  <div className="font-bold text-[#2a2c69]">{t.name}</div>
                  <div className="text-sm text-[#2a2c69]/60">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}