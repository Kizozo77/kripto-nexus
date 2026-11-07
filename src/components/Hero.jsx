"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero({ setActiveTab }) {
  const handleStart = () => {
    setActiveTab("block");
    const ws = document.getElementById("workspace");
    if (ws) ws.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-20 text-center bg-white border-b border-slate-200/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Interactive Cryptography Suite • 4 Kategori & 12 Algoritma</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Platform Eksplorasi <br />
          <span className="text-blue-600">Kriptografi Modern</span>
        </h1>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed">
          Simulasi dan analisis komputasi block cipher, stream cipher, fungsi keamanan utama CIA Triad, hingga algoritma berbasis matematika aljabar linear dan modulo 128.
        </p>

        <div className="pt-2">
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition active:scale-95 cursor-pointer"
          >
            <span>Mulai Uji Algoritma</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
