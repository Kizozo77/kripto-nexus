"use client";

import React, { useState } from "react";
import { Lock, Unlock, Copy, Check, RotateCcw, HelpCircle, BookOpen } from "lucide-react";
import { processAES, processDES, processPlayfair } from "../../lib/blockCipher";

export default function BlockCipher() {
  const [method, setMethod] = useState("aes");
  const [inputText, setInputText] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleReset = () => {
    setInputText("");
    setKey("");
    setOutput("");
    setErrorMsg("");
  };

  const handleProcess = (isEncrypt) => {
    setErrorMsg("");
    let res;
    if (method === "aes") res = processAES(inputText, key, isEncrypt);
    else if (method === "des") res = processDES(inputText, key, isEncrypt);
    else if (method === "playfair") res = processPlayfair(inputText, key, isEncrypt);

    if (res?.success) setOutput(res.result);
    else {
      setErrorMsg(res?.error || "Terjadi kesalahan sistem");
      setOutput("");
    }
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Modul */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-6 bg-blue-500 rounded-full" />
          <h2 className="text-2xl font-bold text-white">1. Block Cipher</h2>
        </div>
        <p className="text-xs text-slate-400">Implementasi oleh: Ivanly Juan Felix Limbong</p>
      </div>

      {/* Penjelasan Ringkas yang Mudah Dijelaskan ke Dosen */}
      <div className="p-5 rounded-2xl enterprise-card space-y-2 border-blue-500/20">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
          <HelpCircle className="w-4 h-4" />
          <span>Konsep Sederhana: Apa itu Block Cipher?</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          <b>Block Cipher</b> memotong data pesan menjadi <b>kardus berukuran tetap</b> (misal 128-bit pada AES atau 64-bit pada DES). Tiap potongan dienkripsi menggunakan kunci yang sama secara berulang-ulang melalui substitusi (tukar huruf) dan permutasi (acak posisi).
        </p>
      </div>

      {/* Tab Sub-Metode */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-900 rounded-xl border border-white/10">
        {[
          { id: "aes", label: "1. AES (128/256-bit)", tag: "SPN Network" },
          { id: "des", label: "2. DES (Feistel)", tag: "16-Round" },
          { id: "playfair", label: "3. Playfair Cipher", tag: "5x5 Digraph" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => { setMethod(item.id); handleReset(); }}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              method === item.id ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <span>{item.label}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">{item.tag}</span>
          </button>
        ))}
      </div>

      {/* Workspace Kalkulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl enterprise-card space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-slate-400">Input Teks</label>
            <button onClick={handleReset} className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400">
              <RotateCcw className="w-3.5 h-3.5" /><span>Reset</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ketik teks yang ingin dienkripsi atau didekripsi..."
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-blue-500 resize-none"
          />

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Kunci Rahasia</label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Masukkan kata sandi kunci..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          {errorMsg && <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-mono">{errorMsg}</div>}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => handleProcess(true)} className="flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-lg transition active:scale-95 cursor-pointer">
              <Lock className="w-4 h-4" /><span>Enkripsi Blok</span>
            </button>
            <button onClick={() => handleProcess(false)} className="flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs border border-white/10 transition active:scale-95 cursor-pointer">
              <Unlock className="w-4 h-4" /><span>Dekripsi Blok</span>
            </button>
          </div>
        </div>

        <div className="p-5 rounded-2xl enterprise-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase text-slate-400">Hasil Pemrosesan</label>
              {output && (
                <button onClick={copyOutput} className="flex items-center gap-1.5 text-xs text-blue-400 font-medium cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Tersalin" : "Salin"}</span>
                </button>
              )}
            </div>
            <textarea readOnly rows={5} value={output} placeholder="Hasil akan muncul di sini..." className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-cyan-300 text-sm font-mono resize-none break-all" />
          </div>

          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-slate-300">
            {method === "aes" && "AES: Melakukan 10-14 kali putaran pencampuran byte (SubBytes, ShiftRows, MixColumns, AddRoundKey)."}
            {method === "des" && "DES: Membagi blok 64-bit jadi dua bagian (kiri & kanan) lalu disilangkan 16 kali putaran Feistel."}
            {method === "playfair" && "Playfair: Memproses huruf berpasangan (digraf) pada tabel matriks 5x5."}
          </div>
        </div>
      </div>
    </div>
  );
}
