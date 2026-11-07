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
    else setErrorMsg(res?.error || "Terjadi kesalahan komputasi Caesar.");
  };

  const handleProcessSHA256 = () => {
    setErrorMsg("");
    const res = processSHA256(inputText);
    if (res?.success) setOutput(res.result);
    else setErrorMsg(res?.error || "Terjadi kesalahan komputasi SHA-256.");
  };

  const handleProcessHMAC = () => {
    setErrorMsg("");
    const res = processHMAC(inputText, secretKey);
    if (res?.success) setOutput(res.result);
    else setErrorMsg(res?.error || "Terjadi kesalahan komputasi HMAC.");
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
          <span className="w-2.5 h-6 bg-purple-600 rounded-full" />
          <h2 className="text-2xl font-bold text-slate-900">3. Fungsi Utama Kriptografi (CIA Triad)</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Implementasi tiga pilar fundamental arsitektur keamanan informasi: Kerahasiaan, Integritas, dan Otentikasi.
        </p>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
        <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
          <HelpCircle className="w-4 h-4 text-purple-600" />
          <span>Definisi & Pilar Fundamental CIA Triad</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
          Kriptografi modern menjamin tiga pilar keamanan: 1. Kerahasiaan (Confidentiality) agar data tidak terbaca pihak luar, 2. Integritas (Integrity) memastikan keutuhan data dari manipulasi pihak lain, dan 3. Otentikasi (Authenticity) memastikan keabsahan identitas pengirim pesan menggunakan kunci rahasia bersama.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
        {[
          { id: "caesar", label: "1. Kerahasiaan (Caesar)", tag: "Confidentiality" },
          { id: "sha256", label: "2. Integritas (SHA-256)", tag: "Integrity" },
          { id: "hmac", label: "3. Otentikasi (HMAC)", tag: "Authenticity" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => { setMethod(item.id); handleReset(); }}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
              method === item.id ? "bg-white text-purple-700 shadow-2xs border border-slate-200 font-bold" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>{item.label}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${method === item.id ? "bg-purple-50 text-purple-800" : "bg-slate-200 text-slate-600"}`}>{item.tag}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 sm:p-6 rounded-2xl saas-card space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Input Data Teks</label>
            <button onClick={handleReset} className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600">
              <RotateCcw className="w-3.5 h-3.5" /><span>Reset</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Masukkan teks data masukan..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none"
          />

          {method === "caesar" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Nilai Pergeseran (Shift: 0-25)</label>
              <input type="number" min="0" max="25" value={shiftKey} onChange={(e) => setShiftKey(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-mono" />
            </div>
          )}

          {method === "hmac" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Secret Key Bersama (Shared Secret)</label>
              <input type="text" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} placeholder="Masukkan kunci rahasia bersama..." className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-mono" />
            </div>
          )}

          {errorMsg && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-mono">{errorMsg}</div>}

          <div className="pt-2">
            {method === "caesar" && (
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleProcessCaesar(true)} className="py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer">Enkripsi Caesar</button>
                <button onClick={() => handleProcessCaesar(false)} className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs sm:text-sm border border-slate-200 transition active:scale-95 cursor-pointer">Dekripsi Caesar</button>
              </div>
            )}
            {method === "sha256" && (
              <button onClick={handleProcessSHA256} className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer">Hasilkan SHA-256 Digest</button>
            )}
            {method === "hmac" && (
              <button onClick={handleProcessHMAC} className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer">Hasilkan Kode Otentikasi HMAC</button>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl saas-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Hasil Pemrosesan</label>
              {output && (
                <button onClick={copyOutput} className="flex items-center gap-1.5 text-xs text-purple-700 font-semibold cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Tersalin" : "Salin"}</span>
                </button>
              )}
            </div>
            <textarea readOnly rows={5} value={output} placeholder="Hasil pemrosesan akan ditampilkan di sini..." className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-mono resize-none break-all" />
          </div>

          <div className="mt-4 p-3 bg-purple-50/70 border border-purple-100 rounded-xl text-xs text-slate-600">
            {method === "caesar" && "Caesar Cipher: Kerahasiaan dasar melalui pergeseran alfabet modular."}
            {method === "sha256" && "SHA-256: Integritas mutlak data melalui pemetaan nilai hash digest satu arah sepanjang 256-bit (64 hex)."}
            {method === "hmac" && "HMAC: Otentikasi pengirim resmi melalui penggabungan hash SHA-256 dan kunci rahasia bersama."}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl saas-card space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <BookOpen className="w-4 h-4 text-purple-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {method === "caesar" && "Formulasi & Mekanisme Caesar Cipher (Pilar Kerahasiaan)"}
            {method === "sha256" && "Formulasi & Mekanisme SHA-256 Digest (Pilar Integritas)"}
            {method === "hmac" && "Formulasi & Mekanisme HMAC SHA-256 (Pilar Otentikasi)"}
          </h4>
        </div>

        {method === "caesar" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">1. Pemetaan Alfabet: A=0, B=1, ..., Z=25</b>
              <p>Himpunan karakter alfabet dipetakan secara terstruktur ke dalam sistem bilangan bulat modulo 26.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">2. Formulasi Enkripsi Caesar</b>
              <p className="font-mono text-slate-800">C = (P + k) mod 26</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">3. Formulasi Dekripsi Caesar</b>
              <p className="font-mono text-slate-800">P = (C - k + 26) mod 26</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">4. Ruang Kunci Terbatas</b>
              <p className="font-mono text-slate-800">|K| = 26 (rentan terhadap serangan Brute Force Exhaustive Search).</p>
            </div>
          </div>
        )}

        {method === "sha256" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">1. Konstruksi Merkle-Damgard 512-bit</b>
              <p>Pesan masukan dipadatkan menjadi blok-blok 512-bit lalu diolah melalui 64 putaran kompresi searah.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">2. Output Konstan: 256-bit (64 Hex)</b>
              <p className="font-mono text-slate-800">H(M) menghasilkan sidik jari unik dengan panjang tepat 64 karakter heksadesimal.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">3. Pre-image Resistance: H(x) = h</b>
              <p>Secara komputasi mustahil merekonstruksi isi pesan asli x hanya berdasarkan nilai hash h.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">4. Avalanche Effect (Efek Longsor)</b>
              <p>Perubahan 1 bit data masukan merombak lebih dari 50% bit keluaran nilai hash secara total.</p>
            </div>
          </div>
        )}

        {method === "hmac" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">1. Standar RFC 2104</b>
              <p>Mengombinasikan fungsi hash satu arah SHA-256 dengan kunci rahasia bersama antara pengirim dan penerima.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">2. Formulasi Tag HMAC Lengkap</b>
              <p className="font-mono text-slate-800">HMAC(K, M) = H((K ⊕ opad) || H((K ⊕ ipad) || M))</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">3. Konstanta Padding Tetap</b>
              <p className="font-mono text-slate-800">ipad = 0x3636...36 dan opad = 0x5C5C...5C (sepanjang blok 64 byte)</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">4. Ketahanan Terhadap Serangan</b>
              <p>Struktur nesting ganda terbukti kebal dari Length Extension Attack yang sering menimpa hash langsung.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
