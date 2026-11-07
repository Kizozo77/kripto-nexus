"use client";

import React, { useState } from "react";
import { Lock, Unlock, Copy, Check, RotateCcw, HelpCircle } from "lucide-react";
import { processCaesar, processSHA256, processHMAC } from "../../lib/functionCipher";

export default function FunctionBased() {
  const [method, setMethod] = useState("caesar");
  const [inputText, setInputText] = useState("");
  const [shiftKey, setShiftKey] = useState("3");
  const [secretKey, setSecretKey] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleReset = () => {
    setInputText("");
    setShiftKey("3");
    setSecretKey("");
    setOutput("");
    setErrorMsg("");
  };

  const handleProcessCaesar = (isEncrypt) => {
    setErrorMsg("");
    const res = processCaesar(inputText, shiftKey, isEncrypt);
    if (res?.success) setOutput(res.result);
    else setErrorMsg(res?.error || "Terjadi kesalahan");
  };

  const handleProcessSHA256 = () => {
    setErrorMsg("");
    const res = processSHA256(inputText);
    if (res?.success) setOutput(res.result);
    else setErrorMsg(res?.error || "Terjadi kesalahan");
  };

  const handleProcessHMAC = () => {
    setErrorMsg("");
    const res = processHMAC(inputText, secretKey);
    if (res?.success) setOutput(res.result);
    else setErrorMsg(res?.error || "Terjadi kesalahan");
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-6 bg-purple-500 rounded-full" />
          <h2 className="text-2xl font-bold text-white">3. Fungsi Utama Kriptografi (CIA Triad)</h2>
        </div>
        <p className="text-xs text-slate-400">Implementasi oleh: Muhammad Fadhil Hasibuan</p>
      </div>

      <div className="p-5 rounded-2xl enterprise-card space-y-2 border-purple-500/20">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
          <HelpCircle className="w-4 h-4" />
          <span>Konsep Sederhana: 3 Pilar Keamanan Informasi</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Kriptografi melindungi 3 pilar utama: <b>1. Kerahasiaan (Caesar)</b> agar data tidak bisa dibaca pihak luar, <b>2. Integritas (SHA-256)</b> seperti sidik jari digital untuk membuktikan data tidak diubah, dan <b>3. Otentikasi (HMAC)</b> stempel resmi pembukti keabsahan pengirim.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-900 rounded-xl border border-white/10">
        {[
          { id: "caesar", label: "1. Kerahasiaan (Caesar)", tag: "Confidentiality" },
          { id: "sha256", label: "2. Integritas (SHA-256)", tag: "Integrity" },
          { id: "hmac", label: "3. Otentikasi (HMAC)", tag: "Authenticity" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => { setMethod(item.id); handleReset(); }}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              method === item.id ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <span>{item.label}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">{item.tag}</span>
          </button>
        ))}
      </div>

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
            placeholder="Ketik teks data..."
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-purple-500 resize-none"
          />

          {method === "caesar" && (
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Nilai Pergeseran (Shift: 0-25)</label>
              <input type="number" min="0" max="25" value={shiftKey} onChange={(e) => setShiftKey(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono" />
            </div>
          )}

          {method === "hmac" && (
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Secret Key Bersama</label>
              <input type="text" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} placeholder="Masukkan secret key..." className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono" />
            </div>
          )}

          {errorMsg && <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-mono">{errorMsg}</div>}

          <div className="pt-2">
            {method === "caesar" && (
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleProcessCaesar(true)} className="py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs shadow-lg transition active:scale-95 cursor-pointer">Enkripsi Caesar</button>
                <button onClick={() => handleProcessCaesar(false)} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs border border-white/10 transition active:scale-95 cursor-pointer">Dekripsi Caesar</button>
              </div>
            )}
            {method === "sha256" && (
              <button onClick={handleProcessSHA256} className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs shadow-lg transition active:scale-95 cursor-pointer">Hasilkan SHA-256 Digest</button>
            )}
            {method === "hmac" && (
              <button onClick={handleProcessHMAC} className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs shadow-lg transition active:scale-95 cursor-pointer">Hasilkan Kode Otentikasi HMAC</button>
            )}
          </div>
        </div>

        <div className="p-5 rounded-2xl enterprise-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase text-slate-400">Hasil Pemrosesan</label>
              {output && (
                <button onClick={copyOutput} className="flex items-center gap-1.5 text-xs text-purple-400 font-medium cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Tersalin" : "Salin"}</span>
                </button>
              )}
            </div>
            <textarea readOnly rows={5} value={output} placeholder="Hasil akan muncul di sini..." className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-purple-300 text-sm font-mono resize-none break-all" />
          </div>

          <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs text-slate-300">
            {method === "caesar" && "Caesar mengamankan pesan dengan menggeser letak abjad sejauh k langkah."}
            {method === "sha256" && "Perubahan 1 karakter masukan merombak total 64 digit hash (Avalanche Effect)."}
            {method === "hmac" && "HMAC memvalidasi keaslian pengirim menggunakan hash berlapis kunci rahasia."}
          </div>
        </div>
      </div>
    </div>
  );
}
