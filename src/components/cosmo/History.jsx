import { useState, useEffect } from "react";
import { Star } from "lucide-react";

// Pon aquí tus fotos. Deben existir en public/Imagenes/Origen/ con estos
// nombres exactos (o cambia los nombres aquí para que coincidan con los tuyos).
// Puedes agregar o quitar líneas: el carrusel se ajusta solo a la cantidad.
//
// "position" ajusta qué parte de la foto se ve cuando se recorta:
// "center 0%" = pegado arriba, "center 50%" = centro, "center 100%" = pegado abajo.
// Cambia el número de cada foto por separado según le haga falta.
const PHOTOS = [
  { src: "/Imagenes/Origen/Josehp.JPG", position: "center 25%" },
  { src: "/Imagenes/Origen/Samuel.JPG", position: "center 25%" },
  { src: "/Imagenes/Origen/Isa.JPG", position: "center 25%" },
];

const INTERVAL_MS = 4000; // cada cuánto cambia de foto (4 segundos)

export default function History() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (PHOTOS.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % PHOTOS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="historia" className="py-24 bg-[#f8f6ff]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#2a2c69] mb-6"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              El origen de la{" "}
              <span className="bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] bg-clip-text text-transparent">
                calma
              </span>
            </h2>
            <p className="text-[#2a2c69]/80 text-lg leading-relaxed mb-5">
              Cosmo nació como un respiro en medio del caos diario, inspirado en
              la inmensidad del universo y la naturaleza. Cada ingrediente fue
              seleccionado para crear una experiencia de calma y equilibrio que
              conecta tu mente y cuerpo con el bienestar.
            </p>
            <p className="text-[#2a2c69]/80 text-lg leading-relaxed mb-8">
              Desde el primer sorbo, Cosmo te invita a hacer una pausa, a mirar
              al cielo y recordar que la tranquilidad está al alcance de tu
              mano. Una bebida premium para quienes buscan más que hidratación:
              buscan una experiencia.
            </p>
            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-base font-bold bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] shadow-[0_8px_30px_rgba(42,44,105,0.3)] hover:-translate-y-1 transition-all"
            >
              <Star size={18} /> Descubre la experiencia
            </a>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(52,6,84,0.3)] border-2 border-[#92d0d1]/20 h-72 lg:h-96">
            {PHOTOS.map((photo, i) => (
              <img
                key={photo.src}
                src={photo.src}
                alt="El origen de Cosmo"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                style={{ opacity: i === current ? 1 : 0, objectPosition: photo.position }}
              />
            ))}

            {PHOTOS.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {PHOTOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Foto ${i + 1}`}
                    className="w-2.5 h-2.5 rounded-full transition-all"
                    style={{
                      background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}