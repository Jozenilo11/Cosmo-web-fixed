import FadeIn from "./FadeIn";

// ======================================================
// BENEFICIOS COSMO
// ======================================================

const BENEFITS = [
  {
    img: "/Imagenes/benefit-relajacion.webp",
    position: "center 20%",
    title: "Relajación Profunda",
    desc: "Fórmula con extractos botánicos que reducen el estrés y mejoran tu estado de ánimo.",
  },
  {
    img: "/Imagenes/benefit-natural.webp",
    position: "center 20%",
    title: "Ingredientes Naturales",
    desc: "100% libre de artificiales. Solo lo mejor de la naturaleza en cada sorbo.",
  },
  {
    img: "/Imagenes/benefit-desconexion.webp",
    position: "center 20%",
    title: "Desconexión del Estrés",
    desc: "Un momento de pausa y calma en medio del ritmo acelerado de la vida.",
  },
  {
    img: "/Imagenes/benefit-botanicos.webp",
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
      {/* ==================================================
          EFECTO DE LUZ DE FONDO
      ================================================== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(146,208,209,0.15),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        {/* ==================================================
            TÍTULO
        ================================================== */}
        <FadeIn>
          <h2
            className="text-4xl sm:text-5xl font-bold text-center mb-4 text-white"
            style={{
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            Beneficios{" "}
            <span className="text-[#92d0d1]">
              Cosmo
            </span>
          </h2>
        </FadeIn>

        {/* ==================================================
            DESCRIPCIÓN
        ================================================== */}
        <FadeIn delay={150}>
          <p className="text-center text-white/80 text-lg max-w-2xl mx-auto mb-14">
            Descubre cómo Cosmo transforma tu día a día con
            ingredientes botánicos y bienestar.
          </p>
        </FadeIn>

        {/* ==================================================
            TARJETAS DE BENEFICIOS
        ================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {BENEFITS.map((benefit, index) => (
            <FadeIn
              key={benefit.title}
              delay={index * 120}
            >
              <div
                className="
                  rounded-3xl
                  overflow-hidden
                  bg-white/[0.08]
                  backdrop-blur-md
                  border border-white/10
                  hover:-translate-y-2
                  hover:bg-white/[0.12]
                  hover:border-white/20
                  transition-all
                  duration-300
                  h-full
                "
              >

                {/* ==================================================
                    IMAGEN
                ================================================== */}
                <div className="h-56 overflow-hidden bg-black/10">

                  <img
                    src={benefit.img}
                    alt={benefit.title}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-500
                      hover:scale-105
                    "
                    style={{
                      objectPosition: benefit.position,
                    }}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                  />

                </div>

                {/* ==================================================
                    TEXTO
                ================================================== */}
                <div className="p-6 text-center">

                  <h3
                    className="text-lg font-bold text-white mb-3"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                    }}
                  >
                    {benefit.title}
                  </h3>

                  <p className="text-white/80 text-sm leading-relaxed">
                    {benefit.desc}
                  </p>

                </div>

              </div>
            </FadeIn>
          ))}

        </div>
      </div>
    </section>
  );
}