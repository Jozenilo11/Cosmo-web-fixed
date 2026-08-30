import { Moon, Leaf, Wind, Sprout } from "lucide-react";

const BENEFITS = [
  {
    icon: Moon,
    title: "Relajación Profunda",
    desc: "Fórmula con extractos botánicos que reducen el estrés y mejoran tu estado de ánimo.",
  },
  {
    icon: Leaf,
    title: "Ingredientes Naturales",
    desc: "100% libre de artificiales. Solo lo mejor de la naturaleza en cada sorbo.",
  },
  {
    icon: Wind,
    title: "Desconexión del Estrés",
    desc: "Un momento de pausa y calma en medio del ritmo acelerado de la vida.",
  },
  {
    icon: Sprout,
    title: "Ingredientes Botánicos",
    desc: "Combinación de plantas y flores seleccionadas por sus propiedades relajantes.",
  },
];

export default function Benefits() {
  return (
    <section
      id="beneficios"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-[#340654] via-[#2a2c69] to-[#288c84]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(146,208,209,0.15),transparent_50%)]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <h2
          className="text-4xl sm:text-5xl font-bold text-center mb-4 text-white"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Beneficios{" "}
          <span className="text-[#92d0d1]">Cosmo</span>
        </h2>
        <p className="text-center text-white/80 text-lg max-w-2xl mx-auto mb-14">
          Descubre cómo Cosmo transforma tu día a día con ingredientes botánicos
          y bienestar.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="bg-white/[0.08] backdrop-blur-md rounded-3xl p-9 text-center border border-white/10 hover:-translate-y-2 hover:bg-white/[0.12] hover:border-white/20 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-5">
                  <Icon size={32} className="text-[#92d0d1]" />
                </div>
                <h3
                  className="text-lg font-bold text-white mb-3"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {b.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}