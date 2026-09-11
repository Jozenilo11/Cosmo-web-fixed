import { useState } from "react";
import { Play, X } from "lucide-react";
import FadeIn from "./FadeIn";

const VIDEOS = [
  {
    title: "Desconectar para volver",
    desc: "Un viaje del estrés a la calma.",
    src: "/videos/animacion.mp4",
  },
  {
    title: "COSMO: una pausa para ti",
    desc: "Descubre la experiencia COSMO y encuentra tu momento de calma.",
    src: "/videos/video.mp4",
  },
  {
    title: "Tu calma en una lata",
    desc: "Un momento COSMO para desconectar y volver a ti.",
    src: "/videos/comercial.mp4",
  },
];

function VideoThumbnail({ src, alt }) {
  return (
    <video
      src={src}
      muted
      playsInline
      preload="metadata"
      className="w-full h-full object-cover"
      aria-label={alt}
    />
  );
}

export default function Videos() {
  const [active, setActive] = useState(null);

  return (
    <section id="videos" className="py-24 bg-[#f8f6ff]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <FadeIn>
          <h2
            className="text-4xl sm:text-5xl font-bold text-center mb-4 text-[#2a2c69]"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Cosmo en{" "}
            <span className="bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] bg-clip-text text-transparent">
              movimiento
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={150}>
          <p className="text-center text-[#2a2c69]/70 text-lg max-w-2xl mx-auto mb-14">
            Descubre la experiencia Cosmo a través de nuestros videos.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* VIDEO DESTACADO */}
          <button
            onClick={() => setActive(VIDEOS[0])}
            className="group relative text-left rounded-3xl overflow-hidden border-2 border-[#92d0d1]/15 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(42,44,105,0.18)] transition-all md:col-span-2"
          >
            <div className="relative w-full aspect-video">

              <VideoThumbnail
                src={VIDEOS[0].src}
                alt={VIDEOS[0].title}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#340654]/80 via-transparent to-transparent" />

              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-[#340654] text-xs font-bold uppercase tracking-wide">
                Destacado
              </span>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-transform">
                  <Play
                    size={32}
                    className="text-[#340654] ml-1"
                    fill="currentColor"
                  />
                </span>
              </div>

            </div>

            <div className="p-6 bg-white">
              <h3
                className="text-2xl font-bold text-[#2a2c69] mb-1"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {VIDEOS[0].title}
              </h3>

              <p className="text-[#2a2c69]/70">
                {VIDEOS[0].desc}
              </p>
            </div>
          </button>

          {/* DOS VIDEOS RESTANTES */}
          {VIDEOS.slice(1).map((v) => (
            <button
              key={v.title}
              onClick={() => setActive(v)}
              className="group relative text-left rounded-3xl overflow-hidden border-2 border-[#92d0d1]/15 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(42,44,105,0.18)] transition-all"
            >
              <div className="relative w-full aspect-video">

                <VideoThumbnail
                  src={v.src}
                  alt={v.title}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#340654]/80 via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-transform">
                    <Play
                      size={26}
                      className="text-[#340654] ml-1"
                      fill="currentColor"
                    />
                  </span>
                </div>

              </div>

              <div className="p-5 bg-white">
                <h3
                  className="text-lg font-bold text-[#2a2c69] mb-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {v.title}
                </h3>

                <p className="text-[#2a2c69]/70 text-sm">
                  {v.desc}
                </p>
              </div>
            </button>
          ))}

        </div>
      </div>

      {/* VENTANA DEL VIDEO */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={() => setActive(null)}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>

            <video
              src={active.src}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[80vh] bg-black"
            />

          </div>
        </div>
      )}

    </section>
  );
}