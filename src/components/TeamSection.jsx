import React from "react";
import { Users, Award, Shield, Cpu, Terminal, Key } from "lucide-react";

export default function TeamSection() {
  const members = [
    {
      name: "Muhammad Rizki Aulia",
      role: "Lead Coordinator & UI/UX Architect",
      desc: "Arsitektur proyek, desain UI/UX, dan deployment",
      icon: Award,
      badge: "LEAD ARCHITECT",
      color: "border-blue-500/30 text-blue-400",
    },
    {
      name: "Ivanly Juan Felix Limbong",
      role: "Block Cipher Specialist",
      desc: "Implementasi AES, DES, dan Playfair Cipher Engine",
      icon: Shield,
      badge: "MODULE 1",
      color: "border-cyan-500/30 text-cyan-400",
    },
    {
      name: "Rofli",
      role: "Stream Cipher Engineer",
      desc: "Implementasi RC4, One-Time Pad, dan Autokey Cipher",
      icon: Terminal,
      badge: "MODULE 2",
      color: "border-emerald-500/30 text-emerald-400",
    },
    {
      name: "Muhammad Fadhil Hasibuan",
      role: "Security Function Specialist",
      desc: "Implementasi Caesar Cipher, SHA-256 Digest, dan HMAC",
      icon: Key,
      badge: "MODULE 3",
      color: "border-purple-500/30 text-purple-400",
    },
    {
      name: "Muhammad Al Idrisi",
      role: "Mathematical Cryptography Specialist",
      desc: "Implementasi Hill Cipher Modulo 128, Toy RSA, dan Diffie-Hellman",
      icon: Cpu,
      badge: "MODULE 4",
      color: "border-rose-500/30 text-rose-400",
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>Development Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Kelompok 3 Engineering Team
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Perancang dan pengembang sistem simulasi kriptografi interaktif KRIPTO-NEXUS.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl enterprise-card border border-white/10 space-y-4 hover:border-blue-500/40 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${m.color}`}>
                    {m.badge}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{m.name}</h4>
                  <p className="text-xs text-blue-400 font-medium mt-0.5">{m.role}</p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
