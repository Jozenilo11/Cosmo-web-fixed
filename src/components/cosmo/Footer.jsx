// Redes sociales de Cosmo (íconos Font Awesome). Actualiza los links de Facebook y YouTube cuando los tengas.
const SOCIALS = [
  { className: "fab fa-facebook-f", label: "Facebook", href: "#" },
  { className: "fab fa-instagram", label: "Instagram", href: "https://www.instagram.com/cosmo.oficial0" },
  { className: "fab fa-tiktok", label: "TikTok", href: "https://www.tiktok.com/@cosmodrinks" },
  { className: "fab fa-youtube", label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2a2c69] pt-16 pb-8 text-white/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h5
              className="text-xl font-bold text-white mb-5 tracking-wider"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              COSMO
            </h5>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              Bebida relajante premium inspirada en el universo. Conecta con tu
              bienestar.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(({ className, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-full bg-white/8 border border-white/5 flex items-center justify-center text-white/60 hover:bg-[#92d0d1] hover:text-[#2a2c69] hover:-translate-y-1 transition-all"
                >
                  <i className={className} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-base font-bold text-white mb-5">Enlaces</h5>
            <ul className="space-y-3 text-sm">
              {[
                { l: "Inicio", h: "#inicio" },
                { l: "Catálogo", h: "#catalogo" },
                { l: "Beneficios", h: "#beneficios" },
                { l: "Historia", h: "#historia" },
              ].map((i) => (
                <li key={i.h}>
                  <a
                    href={i.h}
                    className="text-white/60 hover:text-[#92d0d1] hover:pl-1.5 transition-all inline-block"
                  >
                    {i.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-base font-bold text-white mb-5">Información</h5>
            <ul className="space-y-3 text-sm">
              {[
                { l: "Preguntas Frecuentes", h: "#faq" },
                { l: "Política de Privacidad", h: "#" },
                { l: "Términos de Uso", h: "#" },
                { l: "Contacto", h: "#contacto" },
              ].map((i) => (
                <li key={i.l}>
                  <a
                    href={i.h}
                    className="text-white/60 hover:text-[#92d0d1] hover:pl-1.5 transition-all inline-block"
                  >
                    {i.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-base font-bold text-white mb-5">Suscríbete</h5>
            <p className="text-sm text-white/60 mb-4">
              Recibe novedades y momentos de calma en tu correo.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 min-w-0 bg-white/10 border border-white/15 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#92d0d1]"
              />
              <button className="px-4 py-2.5 rounded-full bg-[#92d0d1] text-[#2a2c69] text-sm font-bold hover:bg-white transition-colors">
                →
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/8 mt-12 pt-6 text-center text-white/30 text-sm">
          © 2026 Cosmo. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}