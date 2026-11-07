"use client";

import React, { useState } from "react";
import { Lock, Unlock, Copy, Check, RotateCcw, HelpCircle, Key, BookOpen } from "lucide-react";
import { processRC4, processOTP, processAutokey } from "../../lib/streamCipher";

export default function StreamCipher() {
  const [method, setMethod] = useState("rc4");
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
    if (method === "rc4") res = processRC4(inputText, key, isEncrypt);
    else if (method === "otp") res = processOTP(inputText, key, isEncrypt);
    else if (method === "autokey") res = processAutokey(inputText, key, isEncrypt);

    if (res?.success) setOutput(res.result);
    else {
      setErrorMsg(res?.error || "Terjadi kesalahan sistem komputasi.");
      setOutput("");
    }
  };

  const generateOTPKey = () => {
    if (!inputText) {
      setErrorMsg("Ketik teks masukan terlebih dahulu.");
      return;
    }
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let rand = "";
    for (let i = 0; i < inputText.length; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setKey(rand);
    setErrorMsg("");
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
          <span className="w-2.5 h-6 bg-[#00897b] rounded-full" />
          <h2 className="text-2xl font-bold text-slate-900">2. Stream Cipher</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Transformasi kriptografi simetris berbasis aliran bit kontinu dan operasi XOR real-time.
        </p>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-teal-50/70 border border-teal-200/80 space-y-2">
        <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
          <HelpCircle className="w-4 h-4 text-teal-600" />
          <span>Definisi & Prinsip Kerja Stream Cipher</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
          Stream Cipher memproses teks secara kontinu digit per digit atau bit per bit secara langsung. Karakter pesan dikombinasikan dengan aliran kunci semu acak (keystream) menggunakan operasi penambahan modular atau bitwise XOR (C_i = P_i ⊕ K_i).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
        {[
          { id: "rc4", label: "1. RC4 Cipher", tag: "KSA & PRGA" },
          { id: "otp", label: "2. One-Time Pad", tag: "Perfect Secrecy" },
          { id: "autokey", label: "3. Autokey Cipher", tag: "Self-Key" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => { setMethod(item.id); handleReset(); }}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
              method === item.id ? "bg-white text-teal-800 shadow-2xs border border-slate-200 font-bold" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>{item.label}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${method === item.id ? "bg-teal-50 text-teal-800" : "bg-slate-200 text-slate-600"}`}>{item.tag}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 sm:p-6 rounded-2xl saas-card space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Input Data (Teks / Hex)</label>
            <button onClick={handleReset} className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600">
              <RotateCcw className="w-3.5 h-3.5" /><span>Reset</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Masukkan pesan yang akan diuji..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none"
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Kunci Aliran (Keystream Key)</label>
              {method === "otp" && (
                <button onClick={generateOTPKey} className="flex items-center gap-1 text-[11px] text-teal-700 font-bold bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200 cursor-pointer">
                  <Key className="w-3 h-3" /><span>Generate Kunci Otomatis</span>
                </button>
              )}
            </div>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Masukkan kunci rahasia..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          {errorMsg && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-mono">{errorMsg}</div>}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => handleProcess(true)} className="flex items-center justify-center gap-2 py-2.5 bg-[#00897b] hover:bg-[#00796b] text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer">
              <Lock className="w-4 h-4" /><span>Enkripsi Stream</span>
            </button>
            <button onClick={() => handleProcess(false)} className="flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs sm:text-sm border border-slate-200 transition active:scale-95 cursor-pointer">
              <Unlock className="w-4 h-4" /><span>Dekripsi Stream</span>
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl saas-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Hasil Pemrosesan</label>
              {output && (
                <button onClick={copyOutput} className="flex items-center gap-1.5 text-xs text-teal-700 font-semibold cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Tersalin" : "Salin"}</span>
                </button>
              )}
            </div>
            <textarea readOnly rows={5} value={output} placeholder="Hasil aliran byte / karakter akan muncul di sini..." className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-mono resize-none break-all" />
          </div>

          <div className="mt-4 p-3 bg-teal-50/70 border border-teal-100 rounded-xl text-xs text-slate-600">
            {method === "rc4" && "RC4 menghasilkan deret bit semu melalui permutasi state 256 byte berbasis KSA dan PRGA."}
            {method === "otp" && "One-Time Pad memenuhi kriteria Perfect Secrecy dengan syarat panjang kunci sama persis dengan pesan."}
            {method === "autokey" && "Autokey menggunakan kunci awal singkat yang disambung oleh plaintext untuk membentuk keystream tanpa batas."}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl saas-card space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <BookOpen className="w-4 h-4 text-teal-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {method === "rc4" && "Formulasi & Mekanisme Algoritma RC4 (Rivest Cipher 4)"}
            {method === "otp" && "Formulasi & Mekanisme Algoritma One-Time Pad (Vernam Cipher)"}
            {method === "autokey" && "Formulasi & Mekanisme Algoritma Autokey Cipher"}
          </h4>
        </div>

        {method === "rc4" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">1. Inisialisasi: S[i] = i</b>
              <p>State array 256 byte diisi berurutan dari angka 0 sampai 255.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">2. Formulasi KSA (Key-Scheduling)</b>
              <p className="font-mono text-slate-800">j = (j + S[i] + key[i mod keylen]) mod 256, swap(S[i], S[j])</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">3. Formulasi PRGA (Keystream Generation)</b>
              <p className="font-mono text-slate-800">i = (i + 1) mod 256; j = (j + S[i]) mod 256; K = S[(S[i] + S[j]) mod 256]</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">4. Enkripsi/Dekripsi Bitwise</b>
              <p className="font-mono text-slate-800">C_i = P_i ⊕ K dan P_i = C_i ⊕ K</p>
            </div>
          </div>
        )}

        {method === "otp" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">1. Syarat Panjang: |K| = |P|</b>
              <p>Panjang kunci rahasia secara mutlak harus setara dengan jumlah karakter pesan terbuka.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">2. Formulasi Enkripsi Vernam</b>
              <p className="font-mono text-slate-800">C_i = P_i ⊕ K_i (operasi eksklusif OR bit per bit)</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">3. Formulasi Dekripsi Vernam</b>
              <p className="font-mono text-slate-800">P_i = C_i ⊕ K_i (identitas involutif operasi XOR)</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">4. Teorema Kerahasiaan Sempurna Shannon</b>
              <p className="font-mono text-slate-800">P(M | C) = P(M) untuk setiap pesan terbuka M dan sandi C.</p>
            </div>
          </div>
        )}

        {method === "autokey" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">1. Pembentukan Keystream: K_stream = Seed || P</b>
              <p>Kunci awal disambung langsung dengan karakter plaintext untuk membentuk deret kunci panjang.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">2. Formulasi Enkripsi Autokey</b>
              <p className="font-mono text-slate-800">C_i = (P_i + K_i) mod 128</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">3. Formulasi Dekripsi Autokey</b>
              <p className="font-mono text-slate-800">P_i = (C_i - K_i + 128) mod 128</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">4. Rekonstruksi Rekursif</b>
              <p>Tiap karakter plaintext hasil dekripsi P_i langsung dimasukkan ke antrean keystream berikutnya.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
