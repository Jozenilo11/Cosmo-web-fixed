import { useEffect, useRef, useState } from "react";
import { Music2 } from "lucide-react";
import FadeIn from "./FadeIn";

// Usa directamente la URL de EMBED de Spotify.
// Esto evita la redirección de open.spotify.com/playlist/... y hace que el reproductor cargue más rápido.
const SPOTIFY_EMBED_URL =
  "https://open.spotify.com/embed/playlist/1amgPqbUSqdAmnOiCj1oCD?utm_source=generator";

export default function Playlist() {
  const [showSpotify, setShowSpotify] = useState(false);
  const spotifyRef = useRef(null);

  // El iframe solo se crea cuando el usuario se acerca a la sección.
  // Así Spotify no bloquea ni ralentiza la carga inicial de la página.
  useEffect(() => {
    const element = spotifyRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSpotify(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="playlist" className="py-24 bg-[#f8f6ff]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <h2
            className="text-4xl sm:text-5xl font-bold text-center mb-4 text-[#2a2c69]"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Cosmo{" "}
            <span className="bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] bg-clip-text text-transparent">
              Playlist
            </span>
            <Music2
              className="inline-block ml-3 mb-2 text-[#288c84] align-middle"
              size={36}
            />
          </h2>
        </FadeIn>

        <FadeIn delay={150}>
          <p className="text-center text-[#2a2c69]/70 text-lg max-w-2xl mx-auto mb-10">
            Ponle play y sigue explorando — música pensada para acompañar tu
            momento de calma.
          </p>
        </FadeIn>

        <FadeIn delay={250}>
          <div
            ref={spotifyRef}
            className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(52,6,84,0.15)] border-2 border-[#92d0d1]/20 bg-white min-h-[352px]"
          >
            {showSpotify ? (
              <iframe
                title="Cosmo Playlist"
                src={SPOTIFY_EMBED_URL}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="block"
              />
            ) : (
              <div className="h-[352px] flex items-center justify-center text-[#2a2c69]/60">
                <span>Cargando playlist…</span>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
