"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BlockCipher from "../components/modules/BlockCipher";
import StreamCipher from "../components/modules/StreamCipher";
import FunctionBased from "../components/modules/FunctionBased";
import MathBased from "../components/modules/MathBased";
import TeamSection from "../components/TeamSection";

export default function Home() {
  const [activeTab, setActiveTab] = useState("block");

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1">
        <Hero setActiveTab={setActiveTab} />

        <div id="workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {activeTab === "block" && <BlockCipher />}
          {activeTab === "stream" && <StreamCipher />}
          {activeTab === "function" && <FunctionBased />}
          {activeTab === "math" && <MathBased />}
        </div>

        <div id="team">
          <TeamSection />
        </div>
      </main>

      <footer className="py-8 text-center text-xs text-slate-500 border-t border-white/5 bg-[#060911]">
        © 2026 KRIPTO-NEXUS — Kelompok 3 Tugas Kriptografi & Steganografi
      </footer>
    </div>
  );
}
