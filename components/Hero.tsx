"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Zap, Star, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#00703C] via-[#008c4a] to-[#005a30]">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b00]/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#00a854]/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20">
                <Zap className="w-3 h-3" />
                NUEVA COLECCION
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white leading-[1.1] mb-5 tracking-tight">
              Los mejores{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#ffcc00]">productos</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#ff6b00]/30 -rotate-1" />
              </span>{" "}
              al mejor precio
            </h1>

            <p className="text-base sm:text-lg text-white/75 mb-8 max-w-lg leading-relaxed">
              Descubre nuestra seleccion de productos premium con los mejores
              precios del mercado. Calidad que puedes confiar.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#00703C] font-bold rounded-full hover:bg-gray-50 transition-all duration-200 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
              >
                Explorar productos
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-200"
              >
                Ver ofertas
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#ffcc00] fill-[#ffcc00]" />
                <span className="text-sm text-white/80">
                  <strong className="text-white">4.8</strong> calificacion
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#00a854]" />
                <span className="text-sm text-white/80">
                  <strong className="text-white">20+</strong> productos
                </span>
              </div>
            </div>
          </motion.div>

          {/* Visual card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              {/* Background cards */}
              <div className="absolute -top-4 -right-4 w-72 h-80 bg-[#ff6b00]/20 rounded-3xl rotate-6" />
              <div className="absolute -bottom-4 -left-4 w-72 h-80 bg-white/10 rounded-3xl -rotate-3" />

              {/* Main card */}
              <div className="relative w-72 h-80 bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-[#00703C]/10 rounded-2xl flex items-center justify-center mb-5">
                  <span className="text-4xl">🛒</span>
                </div>
                <div className="text-5xl font-black text-[#00703C] mb-1">
                  -50%
                </div>
                <div className="text-sm font-bold text-gray-800 mb-1 uppercase tracking-wider">
                  Descuento especial
                </div>
                <div className="text-xs text-gray-400 mb-5">
                  En productos seleccionados
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#ff6b00] text-white text-sm font-semibold rounded-full hover:bg-[#e56000] transition-colors"
                >
                  Ver ofertas
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
