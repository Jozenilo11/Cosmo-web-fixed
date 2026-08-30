import { Suspense, lazy } from "react";
import { ChevronRight, Sparkles } from "lucide-react";

const AstronautHero = lazy(() => import("@/components/ui/astronaut-hero"));

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-[#0a0420]"
    >
      {/* Cosmic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#340654] via-[#1a0a3a] to-[#061a2e]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(34,211,238,0.12),transparent_55%)]" />

      {/* 3D Astronaut scene */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full" />}>
          <AstronautHero />
        </Suspense>
      </div>

      {/* Text overlay — pointer-events-none so the 3D canvas keeps tracking the cursor */}
      <div className="relative z-10 min-h-screen flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full pt-24 pb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#92d0d1] text-xs font-bold tracking-widest uppercase mb-6">
              <Sparkles size={14} /> Bebida relajante premium
            </div>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Encuentra tu
              <br />
              <span className="bg-gradient-to-r from-[#92d0d1] via-[#22d3ee] to-[#288c84] bg-clip-text text-transparent">
                calma cósmica
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/75 max-w-md leading-relaxed">
              Cosmo es una bebida relajante premium inspirada en el universo.
              Ingredientes botánicos que conectan tu mente y cuerpo con el
              bienestar.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#catalogo"
                className="pointer-events-auto inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-base font-bold bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] shadow-[0_8px_30px_rgba(40,140,132,0.4)] hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(40,140,132,0.55)] transition-all"
              >
                Explorar productos <ChevronRight size={20} />
              </a>
              <span className="text-white/50 text-sm hidden sm:block">
                Mueve el cursor sobre el astronauta 
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#f8f6ff] pointer-events-none" />
    </section>
  );
}