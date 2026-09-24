
import React from "react";

const characters = [
  {
    name: "JIS",
    number: "01",
    role: "El pequeño impulso",
    description:
      "Tierno, curioso y esforzado. Jis representa ese pequeño impulso que nos ayuda a detenernos, respirar y encontrar un momento de calma.",
    video: "/characters/jis/jis-video.mp4",
    face: "/characters/jis/jis-face.png",
  },
  {
    name: "APOLO",
    number: "02",
    role: "El compañero de calma",
    description:
      "Tranquilo, seguro y siempre dispuesto a acompañar. Apolo representa la calma que aparece cuando dejamos atrás el ruido.",
    video: "/characters/apolo/apolo-video.mp4",
    face: "/characters/apolo/apolo-face.png",
  },
  {
    name: "WANDA",
    number: "03",
    role: "De la tensión a la calma",
    description:
      "Wanda representa el estrés del día a día y ese momento en el que finalmente podemos desconectarnos y volver a nosotros mismos.",
    video: "/characters/wanda/wanda-video.mp4",
    face: "/characters/wanda/wanda-face.png",
  },
];

export default function CharactersSection() {
  
  return (
    <section className="relative overflow-hidden bg-[#0B0B1A] py-24 text-white">
      {/* Fondo */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-[10%] top-[15%] h-64 w-64 rounded-full bg-[#6C3B9A] blur-[120px]" />
        <div className="absolute right-[5%] top-[45%] h-72 w-72 rounded-full bg-[#288C84] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Encabezado */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#92D0D1]">
            El universo COSMO
          </p>

          
<h2
  className="text-4xl font-bold tracking-tight md:text-6xl"
  style={{ fontFamily: "var(--font-heading)" }}
>
  Conoce a los personajes
</h2>



          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/65 md:text-lg">
            Cada pausa tiene una historia. Conoce a quienes habitan COSMO y
            descubre cómo cada uno representa una forma diferente de encontrar
            la calma.
          </p>
        </div>

        {/* Personajes */}
        <div className="space-y-32">
          {characters.map((character, index) => (
            <article
              key={character.name}
              className="group"
            >
              
              {/* Información */}
              <div className="mt-10 grid gap-10 md:grid-cols-[220px_1fr] md:items-center">
                {/* Rostro */}
                <div className="mx-auto w-full max-w-[220px]">
                  <div className="aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-[#17152A]">
                    <img
                      src={character.face}
                      alt={`Rostro de ${character.name}`}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>


                {/* Texto */}
                <div>
                  <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#92D0D1]">
                    {character.number} / {character.role}
                  </p>

                  
<h3
  className="text-4xl font-bold md:text-5xl"
  style={{ fontFamily: "var(--font-heading)" }}
>
  {character.name}
</h3>


                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
                    {character.description}
                  </p>
                </div>
              </div>

{/* Video */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl">
                <video
                  className="aspect-video w-full object-cover"
                  src={character.video}
                  controls
                  playsInline
                  preload="metadata"
                  poster={character.face}
                />

                <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs tracking-[0.2em] text-white/70 backdrop-blur-md">
                  COSMO / {character.number}
                </div>
              </div>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}