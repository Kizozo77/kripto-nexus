"use client";

import React, { useState } from "react";
import { Lock, Unlock, Copy, Check, RotateCcw, HelpCircle, BookOpen } from "lucide-react";
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
    else setErrorMsg(res?.error || "Terjadi kesalahan sistem komputasi.");
  };

  const handleProcessSHA256 = () => {
    setErrorMsg("");
    const res = processSHA256(inputText);
    if (res?.success) setOutput(res.result);
    else setErrorMsg(res?.error || "Terjadi kesalahan sistem komputasi.");
  };

  const handleProcessHMAC = () => {
    setErrorMsg("");
    const res = processHMAC(inputText, secretKey);
    if (res?.success) setOutput(res.result);
    else setErrorMsg(res?.error || "Terjadi kesalahan sistem komputasi.");
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
        <p className="text-xs text-slate-400">
          Implementasi tiga pilar fundamental arsitektur keamanan informasi.
        </p>
      </div>

      <div className="p-5 rounded-2xl enterprise-card space-y-2 border-purple-500/20">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
          <HelpCircle className="w-4 h-4" />
          <span>Definisi & Pilar Fundamental CIA Triad</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed text-justify">
          Kriptografi modern bukan hanya sebatas perahasiaan pesan, melainkan pondasi komprehensif yang menjamin tiga pilar keamanan data (CIA Triad): <b>1. Kerahasiaan (Confidentiality)</b> untuk memastikan data tidak dapat dibaca oleh entitas tanpa otoritas, <b>2. Integritas (Integrity)</b> untuk memastikan keutuhan data dari manipulasi atau modifikasi liar, dan <b>3. Otentikasi (Authenticity)</b> untuk memverifikasi keabsahan klaim identitas pengirim pesan.
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
            <label className="text-xs font-bold uppercase text-slate-400">Input Data Teks</label>
            <button onClick={handleReset} className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400">
              <RotateCcw className="w-3.5 h-3.5" /><span>Reset</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Masukkan teks data masukan..."
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
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Secret Key Bersama (Shared Secret)</label>
              <input type="text" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} placeholder="Masukkan kunci rahasia bersama..." className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono" />
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
            <textarea readOnly rows={5} value={output} placeholder="Hasil pemrosesan akan ditampilkan di sini..." className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-purple-300 text-sm font-mono resize-none break-all" />
          </div>

          <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs text-slate-300">
            {method === "caesar" && "Caesar Cipher mendemonstrasikan kerahasiaan dasar dengan mentransformasikan alfabet melalui pergeseran posisi modular."}
            {method === "sha256" && "SHA-256 menjamin integritas data dengan memetakan pesan masukan ke dalam nilai digest tetap 256 bit secara satu arah."}
            {method === "hmac" && "HMAC menggabungkan fungsi hash dengan kunci rahasia bersama untuk menjamin integritas sekaligus otentisitas pengirim."}
          </div>
        </div>
      </div>

      {/* Rincian Teori Algoritma yang Dipilih */}
      <div className="p-5 rounded-2xl enterprise-card space-y-3 border-white/10">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
          <BookOpen className="w-4 h-4 text-purple-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            {method === "caesar" && "Karakteristik & Mekanisme Caesar Cipher (Pilar Kerahasiaan)"}
            {method === "sha256" && "Karakteristik & Mekanisme SHA-256 (Pilar Integritas Data)"}
            {method === "hmac" && "Karakteristik & Mekanisme HMAC (Pilar Otentikasi Pesan)"}
          </h4>
        </div>

        {method === "caesar" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-purple-400 block font-semibold">1. Pemetaan Alfabet ke Integer</b>
              <p className="text-slate-400">Setiap karakter alfabet dipetakan secara matematis ke himpunan bilangan bulat $\mathbb{Z}_{26}$ (A = 0, B = 1, ..., Z = 25).</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-purple-400 block font-semibold">2. Transformasi Enkripsi Modular</b>
              <p className="text-slate-400">Karakter disandikan menggunakan pergeseran sebesar kunci $k$: $C = E_k(P) = (P + k) \pmod{26}$.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-purple-400 block font-semibold">3. Transformasi Dekripsi Modular</b>
              <p className="text-slate-400">Karakter cipher dikembalikan ke karakter asli melalui invers pergeseran: $P = D_k(C) = (C - k) \pmod{26}$.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-purple-400 block font-semibold">4. Keterbatasan Ruang Kunci (Key Space)</b>
              <p className="text-slate-400">Ruang kunci hanya berjumlah 26 kombinasi sehingga rentan terhadap serangan <i>brute-force</i> dan analisis frekuensi huruf tunggal.</p>
            </div>
          </div>
        )}

        {method === "sha256" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-purple-400 block font-semibold">1. Konstruksi Merkle-Damgård</b>
              <p className="text-slate-400">Pesan masukan dipadatkan menjadi kelipatan 512 bit dan diproses secara bertahap menggunakan fungsi kompresi searah.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-purple-400 block font-semibold">2. Panjang Digest Seragam (256-bit)</b>
              <p className="text-slate-400">Berapa pun ukuran data masukan, algoritma selalu memproduksi nilai hash berukuran tetap 256 bit (direpresentasikan dalam 64 digit heksadesimal).</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-purple-400 block font-semibold">3. Karakteristik Pre-image Resistance</b>
              <p className="text-slate-400">Bersifat satu arah mutlak: secara komputasi mustahil merekonstruksi pesan asli $x$ semata-mata dari nilai hash $h = H(x)$.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-purple-400 block font-semibold">4. Efek Longsoran (Avalanche Effect)</b>
              <p className="text-slate-400">Perubahan satu bit atau satu karakter pada teks masukan akan mengubah lebih dari 50% bit pada nilai hash akhir.</p>
            </div>
          </div>
        )}

        {method === "hmac" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-purple-400 block font-semibold">1. Standardisasi RFC 2104</b>
              <p className="text-slate-400">HMAC menggabungkan fungsi hash kriptografis dengan kunci rahasia simetris menggunakan konstruksi <i>nested hash</i> bertingkat.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-purple-400 block font-semibold">2. Lapisan Dalam (Inner Hash Pad)</b>
              <p className="text-slate-400">Kunci rahasia di-XOR dengan konstanta byte $ipad$ (`0x36`), lalu digabungkan dengan pesan terbuka untuk menghasilkan hash pertama.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-purple-400 block font-semibold">3. Lapisan Luar (Outer Hash Pad)</b>
              <p className="text-slate-400">Kunci rahasia di-XOR dengan konstanta byte $opad$ (`0x5C`), lalu digabungkan dengan hasil hash lapisan dalam untuk membentuk tag otentikasi akhir: $\text{HMAC}(K, M) = H((K \oplus opad) \parallel H((K \oplus ipad) \parallel M))$.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-purple-400 block font-semibold">4. Imun Terhadap Serangan Length Extension</b>
              <p className="text-slate-400">Struktur hashing ganda ini secara matematis kebal terhadap serangan ekstensi panjang yang kerap menjangkiti fungsi hash telanjang.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
