import { useState } from "react";
import { Mail, Phone, Clock, Send } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contacto"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-[#340654] via-[#2a2c69] to-[#288c84]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(146,208,209,0.15),transparent_50%)]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <h2
          className="text-4xl sm:text-5xl font-bold text-center mb-4 text-white"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          ¿Hablamos?{" "}
          <span className="text-[#92d0d1]">Contáctanos</span>
        </h2>
        <p className="text-center text-white/80 text-lg max-w-2xl mx-auto mb-14">
          ¿Tienes preguntas o quieres saber más sobre Cosmo? Estamos aquí para
          ti.
        </p>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 text-white/90">
            <h3
              className="text-2xl font-bold mb-7 flex items-center gap-2"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <Phone size={22} className="text-[#92d0d1]" /> Contactate
            </h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-[#92d0d1]" />
                <span>experience.cosmo@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-[#92d0d1]" />
                <span>+57 (305) 237 8115</span>
              </div>
              <div className="flex items-center gap-4">
                <Clock size={20} className="text-[#92d0d1]" />
                <span>Lun - Vie: 9:00 - 18:00</span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-white/[0.08] backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                required
                type="text"
                placeholder="Nombre"
                className="bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/50 focus:bg-white/15 focus:border-[#92d0d1] focus:outline-none focus:ring-2 focus:ring-[#92d0d1]/30 transition"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/50 focus:bg-white/15 focus:border-[#92d0d1] focus:outline-none focus:ring-2 focus:ring-[#92d0d1]/30 transition"
              />
            </div>
            <input
              type="text"
              placeholder="Asunto"
              className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/50 focus:bg-white/15 focus:border-[#92d0d1] focus:outline-none focus:ring-2 focus:ring-[#92d0d1]/30 transition"
            />
            <textarea
              required
              rows={5}
              placeholder="Mensaje"
              className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/50 focus:bg-white/15 focus:border-[#92d0d1] focus:outline-none focus:ring-2 focus:ring-[#92d0d1]/30 transition resize-none"
            />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white text-[#2a2c69] font-bold hover:bg-[#92d0d1] hover:-translate-y-0.5 transition-all"
            >
              <Send size={18} /> {sent ? "¡Mensaje enviado!" : "Enviar mensaje"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}