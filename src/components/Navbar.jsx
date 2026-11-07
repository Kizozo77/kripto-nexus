"use client";

import React, { useState, useEffect } from "react";
import { Shield, Lock, Terminal, ShieldCheck, Cpu, Users } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "block", label: "1. Block Cipher", icon: Lock, activeColor: "bg-blue-600 text-white" },
    { id: "stream", label: "2. Stream Cipher", icon: Terminal, activeColor: "bg-[#00897b] text-white" },
    { id: "function", label: "3. Fungsi Utama", icon: ShieldCheck, activeColor: "bg-purple-600 text-white" },
    { id: "math", label: "4. Dasar Matematika", icon: Cpu, activeColor: "bg-rose-600 text-white" },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToTeam = () => {
    const el = document.getElementById("team");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3"
          : "bg-white border-b border-slate-100 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs group-hover:scale-105 transition">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">
                KRIPTO<span className="text-blue-600">NEXUS</span>
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center p-1 rounded-2xl bg-slate-100/80 border border-slate-200 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    const ws = document.getElementById("workspace");
                    if (ws) ws.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? `${item.activeColor} shadow-2xs font-bold`
                      : "text-slate-600 hover:text-slate-900 hover:bg-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <button
            onClick={scrollToTeam}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition shadow-2xs active:scale-95 cursor-pointer"
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span>Kelompok 3</span>
          </button>
        </div>
      </div>
    </header>
  );
}
