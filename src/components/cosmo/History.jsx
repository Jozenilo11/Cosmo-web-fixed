import { Star } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function History() {
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
          <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(52,6,84,0.3)] border-2 border-[#92d0d1]/20">
            <Image
              src="https://media.base44.com/images/public/6a90db965f92405af700b07c/29ae3376d_generated_e8115487.png"
              alt="El origen de Cosmo"
              fittingType="fill"
              className="w-full h-72 lg:h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}