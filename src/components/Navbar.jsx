"use client";

import React, { useState, useEffect } from "react";
import { Shield, Lock, Terminal, ShieldCheck, Cpu, Users } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "block", label: "1. Block Cipher", icon: Lock, color: "text-blue-400" },
    { id: "stream", label: "2. Stream Cipher", icon: Terminal, color: "text-emerald-400" },
    { id: "function", label: "3. Fungsi Utama", icon: ShieldCheck, color: "text-purple-400" },
    { id: "math", label: "4. Dasar Matematika", icon: Cpu, color: "text-rose-400" },
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
          ? "bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner group-hover:scale-105 transition">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                KRIPTO<span className="text-blue-500">NEXUS</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-mono tracking-wider">
                ENTERPRISE SUITE
              </span>
            </div>
          </button>

          {/* Capsule Navigasi Tengah */}
          <nav className="hidden md:flex items-center p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-lg gap-1">
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : item.color}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Tombol Profil Tim */}
          <button
            onClick={scrollToTeam}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-white/10 transition shadow-sm active:scale-95 cursor-pointer"
          >
            <Users className="w-4 h-4 text-blue-400" />
            <span>Kelompok 3</span>
          </button>
        </div>
      </div>
    </header>
  );
}
