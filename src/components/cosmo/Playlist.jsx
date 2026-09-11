import React from "react";
import { Music2 } from "lucide-react";

const SPOTIFY_EMBED_URL =
  "https://open.spotify.com/embed/playlist/2CHNeTOc37g2ri9ZCl24az";

export default function Playlist() {
  return (
    <section className="pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        <h2
          className="text-4xl sm:text-5xl font-bold text-center mb-8 text-[#2a2c69]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          COSMO{" "}
          <span className="bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] bg-clip-text text-transparent">
            Playlist
          </span>

          <Music2
            size={42}
            strokeWidth={2}
            className="inline-block ml-3 mb-2 align-middle text-[#288c84]"
          />
        </h2>

        <div className="w-full overflow-hidden rounded-2xl shadow-lg bg-black">
          <iframe
            src={SPOTIFY_EMBED_URL}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="COSMO Playlist en Spotify"
          />
        </div>

      </div>
    </section>
  );
}