import { useState } from "react";
import { Play, X } from "lucide-react";
import { Image } from "@/components/ui/image";

// Reemplaza estos con los videos reales de tu marca (URL directa .mp4 o embed de YouTube/Vimeo).
const VIDEOS = [
  {
    title: "El universo Cosmo",
    desc: "Un viaje a través de los ingredientes botánicos y el proceso de creación.",
    thumb:
      "https://media.base44.com/images/public/6a90db965f92405af700b07c/29ae3376d_generated_e8115487.png",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    title: "Momento de calma",
    desc: "La experiencia relajante de Cosmo en cada sorbo.",
    thumb:
      "https://media.base44.com/images/public/6a90db965f92405af700b07c/cb8d5c6de_generated_c2186f3e.png",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    title: "Relajación premium",
    desc: "Cómo Cosmo transforma tu día con bienestar y sabor.",
    thumb:
      "https://media.base44.com/images/public/6a90db965f92405af700b07c/1620fe8c1_generated_4988f3f9.png",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
];

export default function Videos() {
  const [active, setActive] = useState(null);

  return (
    <section id="videos" className="py-24 bg-[#f8f6ff]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <h2
          className="text-4xl sm:text-5xl font-bold text-center mb-4 text-[#2a2c69]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Cosmo en{" "}
          <span className="bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] bg-clip-text text-transparent">
            movimiento
          </span>
        </h2>
        <p className="text-center text-[#2a2c69]/70 text-lg max-w-2xl mx-auto mb-14">
          Descubre la experiencia Cosmo a través de nuestros videos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VIDEOS.map((v) => (
            <button
              key={v.title}
              onClick={() => setActive(v)}
              className="group relative text-left rounded-3xl overflow-hidden border-2 border-[#92d0d1]/15 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(42,44,105,0.18)] transition-all"
            >
              <div className="relative h-52">
                <Image
                  src={v.thumb}
                  alt={v.title}
                  fittingType="fill"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#340654]/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-transform">
                    <Play size={26} className="text-[#340654] ml-1" fill="currentColor" />
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
                <p className="text-[#2a2c69]/70 text-sm">{v.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

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
              className="absolute -top-12 right-0 text-white/80 hover:text-white"
              aria-label="Cerrar"
            >
              <X size={28} />
            </button>
            <video
              src={active.src}
              controls
              autoPlay
              className="w-full max-h-[80vh] bg-black"
            />
          </div>
        </div>
      )}
    </section>
  );
}