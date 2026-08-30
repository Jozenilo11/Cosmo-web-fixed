import { useRef, useEffect, useState } from "react";

const ASTRONAUT_IMAGE =
  "https://media.base44.com/images/public/6a90dc965f92405af700b07c/113659d8f_e76c01f1-7d16-43a7-bc43-f22edf716dc31.png";

const lerp = (a, b, t) => a + (b - a) * t;

// Quita el fondo oscuro de la imagen del astronauta (chroma key por luminancia)
// y devuelve un dataURL con transparencia para usar en un <img>.
function useAstronautImage() {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const w = img.naturalWidth || 1024;
      const h = img.naturalHeight || 1024;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h);
      const px = data.data;
      for (let i = 0; i < px.length; i += 4) {
        const lum = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
        if (lum < 40) px[i + 3] = 0;
      }
      ctx.putImageData(data, 0, 0);
      setUrl(canvas.toDataURL("image/png"));
    };
    img.src = ASTRONAUT_IMAGE;
  }, []);
  return url;
}

// Capa de estrellas generada en CSS (varias capas con parpadeo).
function Starfield() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Nebulosa de fondo */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(40% 40% at 30% 30%, rgba(148,116,255,0.25), transparent 60%), radial-gradient(50% 50% at 70% 60%, rgba(34,211,238,0.18), transparent 60%)",
        }}
      />
      {/* Estrellas pequeñas densas */}
      <div
        className="absolute inset-0 animate-twinkle"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20px 30px, #ffffff, transparent), radial-gradient(1px 1px at 90px 120px, #cbd5e1, transparent), radial-gradient(1px 1px at 160px 70px, #ffffff, transparent), radial-gradient(1px 1px at 220px 180px, #a5b4fc, transparent)",
          backgroundSize: "250px 250px",
        }}
      />
      {/* Estrellas medianas */}
      <div
        className="absolute inset-0 animate-twinkle-slow"
        style={{
          backgroundImage:
            "radial-gradient(1.5px 1.5px at 60px 60px, #ffffff, transparent), radial-gradient(2px 2px at 180px 150px, #67e8f9, transparent), radial-gradient(1.5px 1.5px at 300px 90px, #ffffff, transparent)",
          backgroundSize: "360px 360px",
        }}
      />
    </div>
  );
}

function Astronaut() {
  const url = useAstronautImage();
  const astroRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    let tx = 0, ty = 0, px = 0, py = 0, go = 0, gs = 1;
    let cx = 0, cy = 0, acx = 0, acy = 0;

    const onMove = (e) => {
      const r = glowRef.current?.parentElement?.getBoundingClientRect?.();
      if (r) {
        acx = ((e.clientX - r.left - r.width / 2) / (r.width / 2));
        acy = ((e.clientY - r.top - r.height / 2) / (r.height / 2));
      }
      // glow sigue al cursor global
      cx = e.clientX;
      cy = e.clientY;
    };

    window.addEventListener("pointermove", onMove);

    const loop = (t) => {
      // Tilt suave del astronauta hacia el cursor
      ty = lerp(ty, acx * 22, 0.08);
      tx = lerp(tx, -acy * 14, 0.08);
      const dist = Math.min(1, Math.sqrt(acx * acx + acy * acy));
      px = lerp(px, acx * 3.5, 0.08);
      py = lerp(py, -acy * 3, 0.08);
      const float = Math.sin(t / 1400) * 2.2;
const sway = Math.sin(t / 1800) * 1.2;
const rotate = Math.sin(t / 1600) * 2;
      const scale = 1 + (1 - dist) * 0.12;
      if (astroRef.current) {
        astroRef.current.style.transform = `translate3d(${px + sway}vmin, ${py + float}vmin, 0) rotateY(${ty + rotate}deg) rotateX(${tx}deg) scale(${scale})`;
      }
      // Glow cerca del centro al acercar el cursor
      const targetOp = (1 - dist) * 0.5;
      go = lerp(go, targetOp, 0.06);
      gs = lerp(gs, 1 + (1 - dist) * 0.5, 0.06);
      if (glowRef.current) {
        glowRef.current.style.opacity = go;
        glowRef.current.style.transform = `translate(-50%, -50%) scale(${gs})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      {/* Brillo central que crece al acercar el cursor */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 w-[40vmin] h-[40vmin] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.55), rgba(34,211,238,0) 70%)",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={astroRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {url && (
          <img
            src={url}
            alt="Astronauta Cosmo"
            className="w-[58%] max-w-[400px] select-none drop-shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            draggable={false}
          />
        )}
      </div>
    </>
  );
}

export default function AstronautHero() {
  return (
    <div className="relative w-full h-full" style={{ perspective: "1200px" }}>
      <Starfield />
      <Astronaut />
    </div>
  );
}