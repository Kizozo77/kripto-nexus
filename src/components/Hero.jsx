"use client";

import React from "react";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function Hero({ setActiveTab }) {
  const handleStart = () => {
    setActiveTab("block");
    const ws = document.getElementById("workspace");
    if (ws) ws.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 text-center">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Cryptography Suite • 4 Kategori & 12 Algoritma</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Platform Eksplorasi <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
            Kriptografi Modern
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed">
          Simulasi dan analisis komputasi block cipher, stream cipher, fungsi keamanan CIA Triad, hingga aljabar linear berbasis Modulo 128 ASCII yang dirancang khusus oleh Kelompok 3.
        </p>

        <div className="pt-3">
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition active:scale-95 cursor-pointer"
          >
            <span>Mulai Uji Algoritma</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
