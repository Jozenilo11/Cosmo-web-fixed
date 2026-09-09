import { Music2 } from "lucide-react";
import FadeIn from "./FadeIn";

// Pega aquí el link "Embed" de tu playlist de Spotify:
// 1. Abre tu playlist en open.spotify.com
// 2. Botón "..." (más opciones) → Compartir → Insertar cancion/playlist
// 3. Copia la URL que empieza con https://open.spotify.com/embed/playlist/...
// 4. Pégala abajo reemplazando el ejemplo.
const SPOTIFY_EMBED_URL =
  "https://open.spotify.com/playlist/7dXNMYz3OpesgSuoLlz2cG";

export default function Playlist() {
  return (
    <section id="playlist" className="py-24 bg-[#f8f6ff]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <h2
            className="text-4xl sm:text-5xl font-bold text-center mb-4 text-[#2a2c69]"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <Music2 className="inline-block mb-2 mr-2 text-[#288c84]" size={36} />
            Cosmo{" "}
            <span className="bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] bg-clip-text text-transparent">
              Playlist
            </span>
          </h2>
        </FadeIn>
        <FadeIn delay={150}>
          <p className="text-center text-[#2a2c69]/70 text-lg max-w-2xl mx-auto mb-10">
            Ponle play y sigue explorando — música pensada para acompañar tu
            momento de calma.
          </p>
        </FadeIn>

        <FadeIn delay={250}>
          <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(52,6,84,0.15)] border-2 border-[#92d0d1]/20">
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
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
