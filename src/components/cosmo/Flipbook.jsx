import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Download } from "lucide-react";

// PDF de ejemplo (demo de pdf.js). Reemplaza por la URL de tu revista Cosmo.
const PDF_URL = "/revista/V3_Revista2.pdf";

// Carga pdf.js desde el CDN una sola vez.
function loadPdfJs() {
  return new Promise((resolve, reject) => {
    if (window.pdfjsLib) return resolve(window.pdfjsLib);
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    s.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      resolve(window.pdfjsLib);
    };
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export default function Flipbook() {
  const [pages, setPages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState(1);
  const [loading, setLoading] = useState(true);
  const rendered = useRef(false);

  useEffect(() => {
    if (rendered.current) return;
    rendered.current = true;
    (async () => {
      try {
        const pdfjs = await loadPdfJs();
        const pdf = await pdfjs.getDocument(PDF_URL).promise;
        const out = [];
        // Limita a 20 páginas para no saturar la memoria.
        const count = Math.min(pdf.numPages, 20);
        for (let i = 1; i <= count; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.4 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d");
          await page.render({ canvasContext: ctx, viewport }).promise;
          out.push(canvas.toDataURL("image/jpeg", 0.85));
        }
        setPages(out);
      } catch (e) {
        console.error("No se pudo cargar el PDF", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const go = (dir) => {
    if (flipping) return;
    const next = current + dir;
    if (next < 0 || next >= pages.length) return;
    setFlipDir(dir);
    setFlipping(true);
    setTimeout(() => {
      setCurrent(next);
      setFlipping(false);
    }, 550);
  };

  return (
    <section id="revista" className="py-24 bg-gradient-to-br from-[#340654] via-[#2a2c69] to-[#288c84]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2
          className="text-4xl sm:text-5xl font-bold text-center mb-4 text-white"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          La revista{" "}
          <span className="text-[#92d0d1]">Cosmo</span>
        </h2>
        <p className="text-center text-white/80 text-lg max-w-2xl mx-auto mb-12">
          Hojea nuestra revista y pasa cada página con su animación 3D.
        </p>

        <div className="relative" style={{ perspective: "1800px" }}>
          <div
            className="relative mx-auto rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] border border-white/10 bg-white"
            style={{
              aspectRatio: "8.26 / 11.69",
              maxWidth: "460px",
              transformStyle: "preserve-3d",
            }}
          >
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#2a2c69] gap-3">
                <div className="w-10 h-10 border-4 border-[#92d0d1] border-t-[#340654] rounded-full animate-spin" />
                <span className="text-sm font-semibold">Cargando revista…</span>
              </div>
            )}

            {!loading && pages.length > 0 && (
              <>
                {/* Página base (siguiente) */}
                <img
                  src={pages[Math.min(current + flipDir, pages.length - 1)] || pages[current]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain bg-white"
                />
                {/* Página que se VOLTEA */}
                <div
                  className="absolute inset-0 origin-left"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.55s ease-in-out",
                    transform: flipping
                      ? `rotateY(${flipDir > 0 ? -180 : 180}deg)`
                      : "rotateY(0deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src={pages[current]}
                    alt={`Página ${current + 1}`}
                    className="absolute inset-0 w-full h-full object-contain bg-white"
                    style={{ backfaceVisibility: "hidden" }}
                  />
                </div>
              </>
            )}

            {!loading && pages.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-[#2a2c69] p-6 text-center">
                No se pudo cargar la revista.
              </div>
            )}
          </div>

          {/* Controles */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => go(-1)}
              disabled={current === 0 || flipping || loading}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 disabled:opacity-30 transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="text-white/80 text-sm font-bold tabular-nums">
              {pages.length ? `${current + 1} / ${pages.length}` : "—"}
            </span>
            <button
              onClick={() => go(1)}
              disabled={current >= pages.length - 1 || flipping || loading}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 disabled:opacity-30 transition-all"
              aria-label="Siguiente"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-6">
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
        </div>
      </div>
    </section>
  );
}