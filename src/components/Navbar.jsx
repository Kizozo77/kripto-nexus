"use client";

import React, { useState, useEffect } from "react";
import { Shield, Lock, Terminal, ShieldCheck, Cpu, Users } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
    };
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

  const handleNavClick = (id) => {
    setActiveTab(id);
    const ws = document.getElementById("workspace");
    if (ws) {
      ws.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTeam = () => {
    const el = document.getElementById("team");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full glass-nav shadow-xs transition-all duration-300">
      {/* Garis Progress saat Halaman Di-scroll */}
      <div
        className="h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50/90 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs group-hover:scale-105 transition">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">
                KRIPTO<span className="text-blue-600">NEXUS</span>
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center p-1 rounded-2xl bg-slate-100/70 border border-slate-200/80 backdrop-blur-md gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? `${item.activeColor} shadow-xs font-bold scale-[1.02]`
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
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
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-slate-100/80 hover:bg-slate-200 border border-slate-200 transition shadow-xs active:scale-95 cursor-pointer backdrop-blur-xs"
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span>Kelompok 3</span>
          </button>
        </div>
      </div>
    </header>
  );
}
