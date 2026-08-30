import { useState } from "react";
import { ShoppingBag, Minus, Plus, Check } from "lucide-react";
import { Image } from "@/components/ui/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useCart } from "@/lib/CartContext";

const PRODUCTS = [
  {
    badge: "Clásico",
    name: "Cosmo Original",
    desc: "El sabor que inició todo. Relajación profunda y equilibrada.",
    benefits: ["🌿 Relajante", "💧 Hidratante", "🌟 Equilibrio"],
    price: "$3.99",
    img: "https://media.base44.com/images/public/6a90dc965f92405af700b07c/0914454e6_LataCosmo.png",
    glow: "#22d3ee",
  },
  {
    badge: "Premium",
    name: "Cosmo Rosé",
    desc: "Frutas del bosque y bienestar en cada sorbo.",
    benefits: ["🍓 Antioxidante", "🌸 Relajante", "✨ Energía"],
    price: "$4.49",
    img: "https://media.base44.com/images/public/6a90dc965f92405af700b07c/3dcb418ad_latarose.png",
    glow: "#ff85d8",
  },
  {
    badge: "Refrescante",
    name: "Cosmo Limón",
    desc: "Frescura cítrica para revitalizar tu día.",
    benefits: ["🍋 Vitamina C", "💧 Hidratante", "⚡ Energía"],
    price: "$3.99",
    img: "https://media.base44.com/images/public/6a90dc965f92405af700b07c/6557026c0_LataLimon.png",
    glow: "#a3e635",
  },
  {
    badge: "Zero Azúcar",
    name: "Cosmo Zero",
    desc: "Todo el sabor, sin azúcar. Bienestar sin culpa.",
    benefits: ["🌿 Sin azúcar", "💪 Saludable", "🌟 Ligero"],
    price: "$4.99",
    img: "https://media.base44.com/images/public/6a90dc965f92405af700b07c/cb5443753_LataZerorenovada.png",
    glow: "#cbd5e1",
  },
];

const onCardMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export default function Catalog() {
  const { addItem } = useCart();
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);

  const openBuy = (product) => {
    setSelected(product);
    setQty(1);
  };

  const priceNumber = selected ? parseFloat(selected.price.replace("$", "")) : 0;
  const total = (priceNumber * qty).toFixed(2);

  const addToCart = () => {
    addItem(
      { id: selected.name, name: selected.name, price: priceNumber, img: selected.img },
      qty
    );
    toast({
      title: "¡Agregado al carrito!",
      description: `${selected.name} x${qty} — $${total}`,
    });
    setSelected(null);
  };

  return (
    <section id="catalogo" className="py-24 bg-[#f8f6ff]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <h2
          className="text-4xl sm:text-5xl font-bold text-center mb-4 text-[#2a2c69]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Nuestro{" "}
          <span className="bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] bg-clip-text text-transparent">
            Catálogo
          </span>
        </h2>
        <p className="text-center text-[#2a2c69]/70 text-lg max-w-2xl mx-auto mb-14">
          Cuatro experiencias diseñadas para cada momento de calma y bienestar.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              onMouseMove={onCardMove}
              className="group relative overflow-hidden bg-white rounded-3xl p-7 text-center border-2 border-[#92d0d1]/15 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-3 hover:border-transparent hover:shadow-[0_20px_60px_rgba(42,44,105,0.15)] transition-all duration-300"
            >
              {/* Glow de color detrás de la lata que crece al hover */}
              <div
                className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full blur-2xl opacity-40 group-hover:opacity-90 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${p.glow}88, transparent 65%)` }}
              />
              {/* Spotlight suave que sigue el cursor */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), ${p.glow}22, transparent 55%)` }}
              />
              {/* Aro de luz en el borde, animado en hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `inset 0 0 0 1px ${p.glow}66, inset 0 0 40px ${p.glow}33` }}
              />
              <span className="relative inline-block bg-gradient-to-r from-[#340654] to-[#288c84] text-white text-[0.7rem] font-bold px-4 py-1 rounded-full uppercase tracking-wider mb-4">
                {p.badge}
              </span>
              <div className="relative h-52 mb-5 flex items-center justify-center">
                <Image
                  src={p.img}
                  alt={p.name}
                  fittingType="fit"
                  className="relative w-40 h-52 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 drop-shadow-[0_10px_30px_rgba(0,0,0,0.08)] group-hover:drop-shadow-[0_18px_40px_rgba(0,0,0,0.25)]"
                />
              </div>
              <h3
                className="text-xl font-bold text-[#2a2c69] mb-2"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {p.name}
              </h3>
              <p className="text-[#2a2c69]/70 text-sm mb-3">{p.desc}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {p.benefits.map((b) => (
                  <span
                    key={b}
                    className="bg-[#92d0d1]/15 text-[#288c84] text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <span className="block text-2xl font-extrabold text-[#2a2c69] mb-4">
                {p.price}
              </span>
              <button
                onClick={() => openBuy(p)}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-[#288c84] text-[#288c84] text-sm font-bold hover:bg-gradient-to-r hover:from-[#340654] hover:to-[#288c84] hover:text-white hover:border-transparent transition-all"
              >
                <ShoppingBag size={16} /> Comprar
              </button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent className="max-w-sm rounded-3xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle
                  className="text-center text-[#2a2c69]"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  <ShoppingBag className="inline-block mb-1 mr-2 text-[#288c84]" size={20} />
                  Añadir al carrito
                </DialogTitle>
              </DialogHeader>

              <div className="text-center">
                <img
                  src={selected.img}
                  alt={selected.name}
                  className="w-32 h-32 object-contain mx-auto mb-3"
                />
                <h4 className="text-lg font-bold text-[#2a2c69]">{selected.name}</h4>
                <p className="text-[#2a2c69]/70 text-sm mb-4">¿Cuántas unidades deseas?</p>

                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-full border-2 border-[#92d0d1]/40 flex items-center justify-center text-[#2a2c69] hover:bg-[#92d0d1]/10 transition-colors"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-2xl font-bold text-[#2a2c69] min-w-[2ch] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 rounded-full border-2 border-[#92d0d1]/40 flex items-center justify-center text-[#2a2c69] hover:bg-[#92d0d1]/10 transition-colors"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <p className="text-2xl font-extrabold text-[#2a2c69] mb-5">${total}</p>

                <button
                  onClick={addToCart}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(42,44,105,0.3)] transition-all"
                >
                  <Check size={16} /> Añadir al carrito
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}