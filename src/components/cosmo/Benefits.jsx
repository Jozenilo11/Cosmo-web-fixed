import FadeIn from "./FadeIn";

// "position" ajusta qué parte de la foto se ve al recortarla:
// "center 0%" = pegado arriba, "center 50%" = centro, "center 100%" = pegado abajo.
// Ajusta el número de cada foto por separado si alguna queda mal encuadrada.
const BENEFITS = [
  {
    img: "/Imagenes/benefit-relajacion.jpg",
    position: "center 20%",
    title: "Relajación Profunda",
    desc: "Fórmula con extractos botánicos que reducen el estrés y mejoran tu estado de ánimo.",
  },
  {
    img: "/Imagenes/benefit-natural.jpg",
    position: "center 20%",
    title: "Ingredientes Naturales",
    desc: "100% libre de artificiales. Solo lo mejor de la naturaleza en cada sorbo.",
  },
  {
    img: "/Imagenes/benefit-desconexion.jpg",
    position: "center 20%",
    title: "Desconexión del Estrés",
    desc: "Un momento de pausa y calma en medio del ritmo acelerado de la vida.",
  },
  {
    img: "/Imagenes/benefit-botanicos.jpg",
    position: "center 20%",
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
        <FadeIn>
          <h2
            className="text-4xl sm:text-5xl font-bold text-center mb-4 text-white"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Beneficios{" "}
            <span className="text-[#92d0d1]">Cosmo</span>
          </h2>
        </FadeIn>
        <FadeIn delay={150}>
          <p className="text-center text-white/80 text-lg max-w-2xl mx-auto mb-14">
            Descubre cómo Cosmo transforma tu día a día con ingredientes botánicos
            y bienestar.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((b, i) => (
            <FadeIn key={b.title} delay={i * 120}>
              <div className="rounded-3xl overflow-hidden bg-white/[0.08] backdrop-blur-md border border-white/10 hover:-translate-y-2 hover:bg-white/[0.12] hover:border-white/20 transition-all duration-300">
                <div className="h-56 overflow-hidden">
                  <img
                    src={b.img}
                    alt={b.title}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: b.position }}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3
                    className="text-lg font-bold text-white mb-3"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
