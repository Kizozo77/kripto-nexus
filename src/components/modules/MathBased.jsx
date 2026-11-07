"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, HelpCircle } from "lucide-react";
import { processHill, processToyRSA, processDiffieHellman } from "../../lib/mathCipher";

export default function MathBased() {
  const [method, setMethod] = useState("hill");
  const [output, setOutput] = useState("");
  const [details, setDetails] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [hillText, setHillText] = useState("");
  const [hillMatrix, setHillMatrix] = useState("3 5 1 2");

  const [rsaP, setRsaP] = useState("61");
  const [rsaQ, setRsaQ] = useState("53");
  const [rsaE, setRsaE] = useState("17");
  const [rsaMsg, setRsaMsg] = useState("65");

  const [dhP, setDhP] = useState("23");
  const [dhG, setDhG] = useState("5");
  const [dhPrivA, setDhPrivA] = useState("6");
  const [dhPrivB, setDhPrivB] = useState("15");

  const handleReset = () => {
    setOutput("");
    setErrorMsg("");
    setDetails(null);
  };

  const handleHill = (isEncrypt) => {
    setErrorMsg("");
    const res = processHill(hillText, hillMatrix, isEncrypt);
    if (res?.success) {
      setOutput(res.result);
      setDetails(res.details);
    } else setErrorMsg(res?.error || "Terjadi kesalahan");
  };

  const handleRSA = () => {
    setErrorMsg("");
    const res = processToyRSA(rsaP, rsaQ, rsaE, rsaMsg);
    if (res?.success) {
      setOutput(res.result);
      setDetails(res.details);
    } else setErrorMsg(res?.error || "Terjadi kesalahan");
  };

  const handleDH = () => {
    setErrorMsg("");
    const res = processDiffieHellman(dhP, dhG, dhPrivA, dhPrivB);
    if (res?.success) {
      setOutput(res.result);
      setDetails(res.details);
    } else setErrorMsg(res?.error || "Terjadi kesalahan");
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
          <span className="w-2.5 h-6 bg-rose-500 rounded-full" />
          <h2 className="text-2xl font-bold text-white">4. Algoritma Dasar Matematika (Modulo 128)</h2>
        </div>
        <p className="text-xs text-slate-400">Implementasi oleh: Muhammad Al Idrisi</p>
      </div>

      <div className="p-5 rounded-2xl enterprise-card space-y-2 border-rose-500/20">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
          <HelpCircle className="w-4 h-4" />
          <span>Konsep Sederhana: Mengapa Menggunakan Modulo 128?</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Kalkulator ini menerapkan <b>Modulo 128</b>, artinya sistem dapat memproses seluruh 128 karakter tabel ASCII standar (0-127): huruf besar, huruf kecil, angka, simbol, hingga spasi tanpa perlu dibuang.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-900 rounded-xl border border-white/10">
        {[
          { id: "hill", label: "1. Aljabar Linear (Hill)", tag: "Mod 128 ASCII" },
          { id: "rsa", label: "2. Faktorisasi Prima (RSA)", tag: "Asymmetric" },
          { id: "dh", label: "3. Diffie-Hellman", tag: "Key Exchange" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => { setMethod(item.id); handleReset(); }}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              method === item.id ? "bg-rose-600 text-white shadow-md" : "text-slate-400 hover:text-white"
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
            <label className="text-xs font-bold uppercase text-slate-400">Parameter Masukan</label>
            <button onClick={handleReset} className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400">
              <RotateCcw className="w-3.5 h-3.5" /><span>Reset</span>
            </button>
          </div>

          {method === "hill" && (
            <>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Input Teks (Bisa Spasi & Simbol ASCII)</label>
                <input type="text" value={hillText} onChange={(e) => setHillText(e.target.value)} placeholder="Contoh: Kelompok 3" className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Matriks Kunci 2x2 (4 Angka: a b c d)</label>
                <input type="text" value={hillMatrix} onChange={(e) => setHillMatrix(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono" />
                <span className="text-[11px] text-slate-500 mt-1 block">Contoh valid: <b>3 5 1 2</b> (det = 1, bernilai ganjil sehingga memiliki invers modulo 128).</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button onClick={() => handleHill(true)} className="py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs shadow-lg transition active:scale-95 cursor-pointer">Enkripsi Hill</button>
                <button onClick={() => handleHill(false)} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs border border-white/10 transition active:scale-95 cursor-pointer">Dekripsi Hill</button>
              </div>
            </>
          )}

          {method === "rsa" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Prima p</label>
                  <input type="number" value={rsaP} onChange={(e) => setRsaP(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Prima q</label>
                  <input type="number" value={rsaQ} onChange={(e) => setRsaQ(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Eksponen Publik e</label>
                  <input type="number" value={rsaE} onChange={(e) => setRsaE(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Pesan Angka m (&lt; p*q)</label>
                  <input type="number" value={rsaMsg} onChange={(e) => setRsaMsg(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono" />
                </div>
              </div>
              <button onClick={handleRSA} className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs shadow-lg transition active:scale-95 cursor-pointer mt-2">Kalkulasi Toy RSA</button>
            </>
          )}

          {method === "dh" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Modulus Prima (p)</label>
                  <input type="number" value={dhP} onChange={(e) => setDhP(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Generator (g)</label>
                  <input type="number" value={dhG} onChange={(e) => setDhG(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Private Alice (a)</label>
                  <input type="number" value={dhPrivA} onChange={(e) => setDhPrivA(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Private Bob (b)</label>
                  <input type="number" value={dhPrivB} onChange={(e) => setDhPrivB(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono" />
                </div>
              </div>
              <button onClick={handleDH} className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs shadow-lg transition active:scale-95 cursor-pointer mt-2">Simulasikan Diffie-Hellman</button>
            </>
          )}

          {errorMsg && <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-mono">{errorMsg}</div>}
        </div>

        <div className="p-5 rounded-2xl enterprise-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase text-slate-400">Hasil Pemrosesan</label>
              {output && (
                <button onClick={copyOutput} className="flex items-center gap-1.5 text-xs text-rose-400 font-medium cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Tersalin" : "Salin"}</span>
                </button>
              )}
            </div>
            <textarea readOnly rows={4} value={output} placeholder="Hasil akan muncul di sini..." className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-rose-300 text-sm font-mono resize-none break-all" />
          </div>

          {details && (
            <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-slate-300 space-y-1">
              <span className="text-rose-400 font-bold block mb-1">Rincian Komputasi Matematis:</span>
              {details.modulo && <p>• Ruang Lingkup: Modulo {details.modulo} (ASCII 0-127)</p>}
              {details.determinant !== undefined && <p>• Determinan Matriks: {details.determinant}</p>}
              {details.publicKey && <p>• Kunci Publik: {details.publicKey}</p>}
              {details.privateKey && <p>• Kunci Privat: {details.privateKey}</p>}
              {details.sharedSecret !== undefined && <p>• Shared Secret Match: {details.matched ? "Cocok (Verified)" : "Gagal"}</p>}
            </div>
          )}

          <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-slate-300">
            {method === "hill" && "Hill Cipher: Memproses teks ASCII menggunakan perkalian vektor matriks 2x2 modulo 128."}
            {method === "rsa" && "RSA: Keamanan bertumpu pada sulitnya memfaktorkan bilangan prima p dan q."}
            {method === "dh" && "Diffie-Hellman: Menyepakati kunci bersama tanpa pernah mengirimkan kunci privat masing-masing."}
          </div>
        </div>
      </div>
    </div>
  );
}
