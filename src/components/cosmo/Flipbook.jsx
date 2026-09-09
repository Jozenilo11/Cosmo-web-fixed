import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Download, Volume2 } from "lucide-react";

const PDF_URL = "/revista/V3_Revista2.pdf";
const FLIP_SOUND_URL = "/sounds/page-flip.mp3";

function loadPdfJs() {
  return new Promise((resolve, reject) => {
    if (window.pdfjsLib) return resolve(window.pdfjsLib);

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      resolve(window.pdfjsLib);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function Flipbook() {
  const [pages, setPages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobile, setMobile] = useState(false);
  const rendered = useRef(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const updateMobile = () => setMobile(window.innerWidth < 768);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(FLIP_SOUND_URL);
    audioRef.current.preload = "auto";
    audioRef.current.volume = 0.45;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (rendered.current) return;
    rendered.current = true;

    (async () => {
      try {
        const pdfjs = await loadPdfJs();
        const pdf = await pdfjs.getDocument(PDF_URL).promise;
        const out = [];
        const count = Math.min(pdf.numPages, 20);

        for (let i = 1; i <= count; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.35 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const ctx = canvas.getContext("2d");
          await page.render({ canvasContext: ctx, viewport }).promise;
          out.push(canvas.toDataURL("image/jpeg", 0.86));
        }

        setPages(out);
      } catch (error) {
        console.error("No se pudo cargar el PDF", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const playFlipSound = () => {
    if (!audioRef.current) return;

    try {
      audioRef.current.currentTime = 0;
      const promise = audioRef.current.play();
      if (promise?.catch) promise.catch(() => {});
    } catch {
      // El navegador puede bloquear el audio hasta que exista interacción.
    }
  };

  const step = mobile ? 1 : 2;

  const go = (dir) => {
    if (flipping || loading || pages.length === 0) return;

    const next = current + dir * step;
    if (next < 0 || next >= pages.length) return;

    setFlipDir(dir);
    setFlipping(true);
    playFlipSound();

    window.setTimeout(() => {
      setCurrent(next);
      setFlipping(false);
    }, 720);
  };

  const leftPage = pages[current];
  const rightPage = pages[current + 1];
  const nextLeft = pages[current + step];
  const nextRight = pages[current + step + 1];

  const shownPageNumber = mobile ? current + 1 : `${current + 1}-${Math.min(current + 2, pages.length)}`;

  return (
    <section
      id="revista"
      className="py-24 bg-gradient-to-br from-[#340654] via-[#2a2c69] to-[#288c84]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <h2
          className="text-4xl sm:text-5xl font-bold text-center mb-4 text-white"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          La revista <span className="text-[#92d0d1]">Cosmo</span>
        </h2>

        <p className="text-center text-white/80 text-lg max-w-2xl mx-auto mb-12">
          Hojea nuestra revista y descubre cada página con una experiencia de lectura inmersiva.
        </p>

        {loading && (
          <div className="mx-auto max-w-md aspect-[8.26/11.69] rounded-2xl bg-white flex flex-col items-center justify-center text-[#2a2c69] gap-3 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <div className="w-10 h-10 border-4 border-[#92d0d1] border-t-[#340654] rounded-full animate-spin" />
            <span className="text-sm font-semibold">Cargando revista…</span>
          </div>
        )}

        {!loading && pages.length === 0 && (
          <div className="mx-auto max-w-md rounded-2xl bg-white p-10 text-center text-[#2a2c69] shadow-2xl">
            No se pudo cargar la revista.
          </div>
        )}

        {!loading && pages.length > 0 && (
          <>
            {/* DESKTOP: libro abierto con dos páginas */}
            {!mobile && (
              <div className="relative mx-auto max-w-5xl" style={{ perspective: "2200px" }}>
                <div
                  className="relative mx-auto flex w-full max-w-[940px] overflow-hidden rounded-[18px] bg-[#eee] shadow-[0_35px_100px_rgba(0,0,0,0.55)]"
                  style={{
                    aspectRatio: "16.52 / 11.69",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Páginas que quedan debajo */}
                  <div className="absolute inset-0 flex">
                    <div className="relative w-1/2 overflow-hidden bg-white">
                      <img
                        src={flipDir > 0 ? nextLeft || leftPage : leftPage}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="relative w-1/2 overflow-hidden bg-white">
                      <img
                        src={flipDir > 0 ? nextRight || rightPage : rightPage}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Spread actual */}
                  <div className="absolute inset-0 flex">
                    <div className="relative w-1/2 overflow-hidden bg-white">
                      <img
                        src={leftPage}
                        alt={`Página ${current + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/10 to-transparent" />
                    </div>
                    <div className="relative w-1/2 overflow-hidden bg-white">
                      <img
                        src={rightPage || leftPage}
                        alt={rightPage ? `Página ${current + 2}` : `Página ${current + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/15 to-transparent" />
                    </div>
                  </div>

                  {/* Hoja que se levanta para simular el giro */}
                  {flipping && (
                    <div
                      className={`absolute inset-y-0 z-20 w-1/2 overflow-hidden bg-white shadow-2xl ${
                        flipDir > 0 ? "right-0 origin-left" : "left-0 origin-right"
                      }`}
                      style={{
                        transformStyle: "preserve-3d",
                        animation: `${flipDir > 0 ? "cosmoFlipNext" : "cosmoFlipPrev"} 720ms cubic-bezier(.2,.75,.25,1) forwards`,
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <img
                        src={flipDir > 0 ? rightPage || leftPage : leftPage}
                        alt="Página en movimiento"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/5" />
                    </div>
                  )}

                  {/* Lomo central */}
                  <div className="pointer-events-none absolute inset-y-0 left-1/2 z-30 w-px -translate-x-1/2 bg-black/20 shadow-[0_0_14px_rgba(0,0,0,0.18)]" />
                </div>
              </div>
            )}

            {/* MOBILE: una página para que siga siendo legible */}
            {mobile && (
              <div className="relative mx-auto max-w-[460px]" style={{ perspective: "1600px" }}>
                <div className="relative aspect-[8.26/11.69] overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                  <img
                    src={pages[current]}
                    alt={`Página ${current + 1}`}
                    className="h-full w-full object-cover"
                  />

                  {flipping && (
                    <div
                      className={`absolute inset-0 z-10 overflow-hidden bg-white ${
                        flipDir > 0 ? "origin-left" : "origin-right"
                      }`}
                      style={{
                        animation: `${flipDir > 0 ? "cosmoFlipMobileNext" : "cosmoFlipMobilePrev"} 720ms cubic-bezier(.2,.75,.25,1) forwards`,
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <img
                        src={pages[current]}
                        alt="Página en movimiento"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-5 mt-8">
              <button
                onClick={() => go(-1)}
                disabled={current === 0 || flipping || loading}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 transition-all"
                aria-label="Página anterior"
              >
                <ChevronLeft size={25} />
              </button>

              <div className="flex items-center gap-2 text-white/85 text-sm font-bold tabular-nums min-w-[90px] justify-center">
                <BookOpen size={16} />
                <span>{shownPageNumber} / {pages.length}</span>
              </div>

              <button
                onClick={() => go(1)}
                disabled={current >= pages.length - step || flipping || loading}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 transition-all"
                aria-label="Página siguiente"
              >
                <ChevronRight size={25} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 mt-5 text-white/60 text-xs">
              <Volume2 size={14} />
              <span>El sonido se reproduce al pasar de página</span>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <a
                href={PDF_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
              >
                <BookOpen size={16} /> Ver completo
              </a>

              <a
                href={PDF_URL}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
              >
                <Download size={16} /> Descargar
              </a>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes cosmoFlipNext {
          0% {
            transform: rotateY(0deg);
            box-shadow: -8px 0 12px rgba(0,0,0,0.05);
          }
          45% {
            box-shadow: -35px 0 45px rgba(0,0,0,0.25);
          }
          100% {
            transform: rotateY(-180deg);
            box-shadow: 10px 0 30px rgba(0,0,0,0.18);
          }
        }

        @keyframes cosmoFlipPrev {
          0% {
            transform: rotateY(0deg);
            box-shadow: 8px 0 12px rgba(0,0,0,0.05);
          }
          45% {
            box-shadow: 35px 0 45px rgba(0,0,0,0.25);
          }
          100% {
            transform: rotateY(180deg);
            box-shadow: -10px 0 30px rgba(0,0,0,0.18);
          }
        }

        @keyframes cosmoFlipMobileNext {
          0% { transform: rotateY(0deg); }
          45% { box-shadow: -30px 0 45px rgba(0,0,0,0.28); }
          100% { transform: rotateY(-180deg); }
        }

        @keyframes cosmoFlipMobilePrev {
          0% { transform: rotateY(0deg); }
          45% { box-shadow: 30px 0 45px rgba(0,0,0,0.28); }
          100% { transform: rotateY(180deg); }
        }
      `}</style>
    </section>
  );
}
