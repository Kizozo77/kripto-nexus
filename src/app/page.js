"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BlockCipher from "../components/modules/BlockCipher";
import StreamCipher from "../components/modules/StreamCipher";
import FunctionBased from "../components/modules/FunctionBased";
import MathBased from "../components/modules/MathBased";
import TeamSection from "../components/TeamSection";
import RevealOnScroll from "../components/RevealOnScroll";

export default function Home() {
  const [activeTab, setActiveTab] = useState("block");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans relative overflow-x-hidden">
      {/* Container Khusus Ambient Glow: Dikunci overflow-hidden agar tidak menimbulkan scroll horizontal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[450px] h-[450px] rounded-full bg-blue-300/25 blur-3xl -top-20 -left-20" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-300/20 blur-3xl top-[500px] -right-20" />
        <div className="absolute w-[450px] h-[450px] rounded-full bg-teal-300/20 blur-3xl top-[1100px] left-0" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-rose-300/20 blur-3xl top-[1700px] right-0" />
      </div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 relative z-10 pt-[76px]">
        <RevealOnScroll delay={50}>
          <Hero setActiveTab={setActiveTab} />
        </RevealOnScroll>

        <div id="workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <RevealOnScroll delay={100}>
            {activeTab === "block" && <BlockCipher />}
            {activeTab === "stream" && <StreamCipher />}
            {activeTab === "function" && <FunctionBased />}
            {activeTab === "math" && <MathBased />}
          </RevealOnScroll>
        </div>

        <div id="team">
          <RevealOnScroll delay={120}>
            <TeamSection />
          </RevealOnScroll>
        </div>
      </main>

      <footer className="py-8 border-t border-slate-200/80 bg-white/70 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-extrabold text-slate-900 text-sm tracking-tight">
              KRIPTO<span className="text-blue-600">NEXUS</span>
            </p>
            <p className="text-xs text-slate-500">Proyek Kriptografi dan Steganografi • Kelompok 3</p>
          </div>

          <p className="text-xs text-slate-500 text-center sm:text-left max-w-md">
            Dirancang dan dibangun untuk implementasi 4 topik dan 12 algoritma kriptografi interaktif.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition active:scale-95 cursor-pointer"
          >
            <span>Kembali ke Atas</span>
            <span>↑</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
