import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import CartSheet from "./CartSheet";

const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Historia", href: "#historia" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Instagram", href: "#redes" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2 group">
          <img
            src={scrolled ? "public/logo-icon-morado.png" : "public/logo-icon-claro.png"}
            alt="Cosmo"
            className={
              scrolled
                ? "h-8 lg:h-6 w-auto transition-all" // tamaño del logo MORADO (con scroll)
                : "h-16 lg:h-20 w-auto transition-all" // tamaño del logo BLANCO (arriba)
            }
          />
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative px-3 py-2 text-sm font-bold transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[3px] after:rounded-full after:bg-gradient-to-r after:from-[#340654] after:to-[#288c84] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${
                scrolled
                  ? "text-[#2a2c69] hover:text-[#288c84]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#catalogo"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-bold bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] shadow-[0_4px_15px_rgba(42,44,105,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(42,44,105,0.4)] transition-all"
          >
            <ShoppingBag size={16} /> Comprar
          </a>
          <button
            onClick={() => setCartOpen(true)}
            className={`relative p-2 transition-colors ${
              scrolled ? "text-[#2a2c69]" : "text-white"
            }`}
            aria-label="Ver carrito"
          >
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#288c84] text-white text-[11px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>

        <button
          onClick={() => setCartOpen(true)}
          className={`lg:hidden relative p-2 mr-1 transition-colors ${
            scrolled ? "text-[#2a2c69]" : "text-white"
          }`}
          aria-label="Ver carrito"
        >
          <ShoppingCart size={22} />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#288c84] text-white text-[10px] font-bold flex items-center justify-center">
              {count}
            </span>
          )}
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden p-2 transition-colors ${
            scrolled ? "text-[#2a2c69]" : "text-white"
          }`}
          aria-label="Menú"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-[#92d0d1]/20 mt-2">
          <div className="flex flex-col px-5 py-4 gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-bold text-[#2a2c69] hover:bg-[#92d0d1]/10 hover:text-[#288c84] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#catalogo"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold bg-gradient-to-r from-[#340654] to-[#288c84]"
            >
              <ShoppingBag size={16} /> Comprar
            </a>
          </div>
        </div>
      )}

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </nav>
  );
}