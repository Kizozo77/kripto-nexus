import React from "react";
import { Users, Award, Shield, Terminal, Key, Cpu } from "lucide-react";

export default function TeamSection() {
  const members = [
    {
      name: "Muhammad Rizki Aulia",
      role: "Lead Coordinator & UI/UX Architect",
      desc: "Project Architecture, UI/UX Design & Deployment",
      icon: Award,
      badge: "LEAD ARCHITECT",
      cardBg: "bg-blue-50/40 border-blue-200 hover:border-blue-400",
      badgeStyle: "bg-blue-100 text-blue-700 border-blue-200",
      iconStyle: "bg-blue-100/80 text-blue-600 border-blue-200",
      roleColor: "text-blue-700",
      dotColor: "bg-blue-500",
    },
    {
      name: "Ivanly Juan Felix Limbong",
      role: "Block Cipher Specialist",
      desc: "AES, DES/3DES & Playfair Cipher Engine",
      icon: Shield,
      badge: "MODULE 1",
      cardBg: "bg-cyan-50/40 border-cyan-200 hover:border-cyan-400",
      badgeStyle: "bg-cyan-100 text-cyan-700 border-cyan-200",
      iconStyle: "bg-cyan-100/80 text-cyan-600 border-cyan-200",
      roleColor: "text-cyan-700",
      dotColor: "bg-cyan-500",
    },
    {
      name: "Rofli",
      role: "Stream Cipher Engineer",
      desc: "RC4, One-Time Pad & Autokey Stream Engine",
      icon: Terminal,
      badge: "MODULE 2",
      cardBg: "bg-emerald-50/40 border-emerald-200 hover:border-emerald-400",
      badgeStyle: "bg-emerald-100 text-emerald-700 border-emerald-200",
      iconStyle: "bg-emerald-100/80 text-emerald-600 border-emerald-200",
      roleColor: "text-emerald-700",
      dotColor: "bg-emerald-500",
    },
    {
      name: "Muhammad Fadhil Hasibuan",
      role: "Security Function Specialist",
      desc: "Caesar, SHA-256 Digest & HMAC Integrity",
      icon: Key,
      badge: "MODULE 3",
      cardBg: "bg-purple-50/40 border-purple-200 hover:border-purple-400",
      badgeStyle: "bg-purple-100 text-purple-700 border-purple-200",
      iconStyle: "bg-purple-100/80 text-purple-600 border-purple-200",
      roleColor: "text-purple-700",
      dotColor: "bg-purple-500",
    },
    {
      name: "Muhammad Al Idrisi",
      role: "Mathematical Cryptography Specialist",
      desc: "Hill Cipher Mod 128, Toy RSA & Diffie-Hellman",
      icon: Cpu,
      badge: "MODULE 4",
      cardBg: "bg-rose-50/40 border-rose-200 hover:border-rose-400",
      badgeStyle: "bg-rose-100 text-rose-700 border-rose-200",
      iconStyle: "bg-rose-100/80 text-rose-600 border-rose-200",
      roleColor: "text-rose-700",
      dotColor: "bg-rose-500",
    },
  ];

  return (
    <section className="py-16 sm:py-20 border-t border-slate-200/80 bg-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>Development Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kelompok 3 <span className="text-blue-600">Engineering Team</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
            Pengembang dan perancang sistem kriptografi interaktif KRIPTO-NEXUS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-300 shadow-2xs hover:shadow-xs ${m.cardBg}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shadow-2xs ${m.iconStyle}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border ${m.badgeStyle}`}>
                    {m.badge}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-slate-900">{m.name}</h4>
                  <p className={`text-xs font-semibold ${m.roleColor}`}>{m.role}</p>
                  
                  <div className="pt-3 border-t border-slate-200/60 mt-3 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                      Fokus Tugas:
                    </span>
                    <p className="text-xs text-slate-600 font-mono leading-relaxed">{m.desc}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <span className={`w-2 h-2 rounded-full ${m.dotColor}`} />
                    <span className="text-[11px] font-medium text-slate-500">Active Contributor</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
