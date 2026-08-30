import { Instagram as IgIcon } from "lucide-react";
import { Image } from "@/components/ui/image";

const POSTS = [
  "/Imagenes/Instagram/Post1.jpg",
  "/Imagenes/Instagram/Post2.jpg",
  "/Imagenes/Instagram/Post3.jpg",
  "/Imagenes/Instagram/Post4.jpg",
  "/Imagenes/Instagram/Post5.jpg",
  "/Imagenes/Instagram/Post6.jpg",
];

export default function Instagram() {
  return (
    <section id="redes" className="py-24 bg-[#f8f6ff]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <h2
          className="text-4xl sm:text-5xl font-bold text-center mb-4 text-[#2a2c69]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Síguenos en{" "}
          <span className="bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] bg-clip-text text-transparent">
            Instagram
          </span>
        </h2>
        <p className="text-center text-[#2a2c69]/70 text-lg mb-8">
          Vive la experiencia Cosmo y comparte tu momento de calma.
        </p>
        <div className="text-center mb-10">
          <a
            href="https://instagram.com/cosmo.oficial0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-9 py-3.5 rounded-full text-white font-bold bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-[0_4px_20px_rgba(225,48,108,0.3)] hover:-translate-y-1 transition-all"
          >
            <IgIcon size={20} /> Seguir @cosmo.oficial0
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {POSTS.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com/cosmo.oficial0"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden aspect-square border-2 border-[#92d0d1]/15"
            >
              <Image
                src={src}
                alt={`Post Cosmo ${i + 1}`}
                fittingType="fill"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#340654]/70 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <IgIcon size={32} className="text-white mb-2" />
                <span className="text-white/80 text-xs font-semibold">
                  Ver en Instagram
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}