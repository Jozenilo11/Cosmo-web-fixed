import { useState } from "react";
import { ShoppingBag, Minus, Plus, Trash2, Check, ArrowLeft } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/CartContext";

export default function CartSheet({ open, onOpenChange }) {
  const { items, updateQty, removeItem, clearCart, total } = useCart();
  const [step, setStep] = useState("cart"); // cart | form | confirmed
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "", direccion: "" });
  const [orderSummary, setOrderSummary] = useState(null);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const isFormValid =
    form.nombre.trim() && form.telefono.trim() && form.direccion.trim();

  const confirmOrder = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setOrderSummary({ items: [...items], total, ...form });
    clearCart();
    setStep("confirmed");
  };

  const close = () => {
    onOpenChange(false);
    // reset after the closing animation finishes
    setTimeout(() => {
      setStep("cart");
      setForm({ nombre: "", telefono: "", email: "", direccion: "" });
      setOrderSummary(null);
    }, 300);
  };

  return (
    <Sheet open={open} onOpenChange={(v) => (v ? onOpenChange(true) : close())}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        {/* ===== PASO 1: CARRITO ===== */}
        {step === "cart" && (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-[#2a2c69]">
                <ShoppingBag size={20} /> Tu carrito
              </SheetTitle>
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-[#2a2c69]/60 gap-2">
                <ShoppingBag size={40} className="opacity-30" />
                <p>Tu carrito está vacío.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto -mx-2 px-2 space-y-4 my-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center border-b border-[#92d0d1]/15 pb-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 object-contain shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#2a2c69] truncate">{item.name}</p>
                      <p className="text-sm text-[#2a2c69]/60">${item.price.toFixed(2)} c/u</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-7 h-7 rounded-full border border-[#92d0d1]/40 flex items-center justify-center hover:bg-[#92d0d1]/10"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-7 h-7 rounded-full border border-[#92d0d1]/40 flex items-center justify-center hover:bg-[#92d0d1]/10"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-[#2a2c69]">${(item.price * item.qty).toFixed(2)}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 mt-1"
                        aria-label="Quitar producto"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="border-t border-[#92d0d1]/20 pt-4 space-y-3">
                <div className="flex justify-between text-lg font-extrabold text-[#2a2c69]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => setStep("form")}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(42,44,105,0.3)] transition-all"
                >
                  Continuar al pedido
                </button>
              </div>
            )}
          </>
        )}

        {/* ===== PASO 2: FORMULARIO ===== */}
        {step === "form" && (
          <>
            <SheetHeader>
              <button
                onClick={() => setStep("cart")}
                className="flex items-center gap-1 text-sm text-[#2a2c69]/60 hover:text-[#2a2c69] mb-2"
              >
                <ArrowLeft size={14} /> Volver al carrito
              </button>
              <SheetTitle className="text-[#2a2c69]">Datos de entrega</SheetTitle>
            </SheetHeader>

            <form onSubmit={confirmOrder} className="flex-1 flex flex-col gap-4 mt-2 overflow-y-auto">
              <div className="space-y-1.5">
                <Label htmlFor="nombre">Nombre completo *</Label>
                <Input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input id="telefono" name="telefono" value={form.telefono} onChange={handleChange} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="direccion">Dirección de entrega *</Label>
                <Input id="direccion" name="direccion" value={form.direccion} onChange={handleChange} required />
              </div>

              <div className="mt-auto pt-4 border-t border-[#92d0d1]/20 space-y-3">
                <div className="flex justify-between text-lg font-extrabold text-[#2a2c69]">
                  <span>Total a pagar</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-[#2a2c69]/50">
                  El pago se coordina al momento de la entrega. No se realiza ningún cobro ahora.
                </p>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(42,44,105,0.3)] transition-all disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  <Check size={16} /> Confirmar pedido
                </button>
              </div>
            </form>
          </>
        )}

        {/* ===== PASO 3: CONFIRMACIÓN ===== */}
        {step === "confirmed" && orderSummary && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 px-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#340654] to-[#288c84] flex items-center justify-center">
              <Check size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-extrabold text-[#2a2c69]">¡Pedido confirmado!</h3>
            <p className="text-[#2a2c69]/70 text-sm max-w-xs">
              Gracias, {orderSummary.nombre.split(" ")[0]}. Te contactaremos al{" "}
              {orderSummary.telefono} para coordinar la entrega en {orderSummary.direccion}.
            </p>
            <p className="text-2xl font-extrabold text-[#2a2c69]">
              ${orderSummary.total.toFixed(2)}
            </p>
            <button
              onClick={close}
              className="mt-2 px-8 py-3 rounded-full text-white text-sm font-bold bg-gradient-to-r from-[#340654] via-[#2a2c69] to-[#288c84] hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(42,44,105,0.3)] transition-all"
            >
              Seguir explorando
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
