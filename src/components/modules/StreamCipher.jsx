"use client";

import React, { useState } from "react";
import { Lock, Unlock, Copy, Check, RotateCcw, HelpCircle, Key } from "lucide-react";
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
      setErrorMsg(res?.error || "Terjadi kesalahan sistem");
      setOutput("");
    }
  };

  const generateOTPKey = () => {
    if (!inputText) {
      setErrorMsg("Ketik teks pesan terlebih dahulu.");
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
          <span className="w-2.5 h-6 bg-emerald-500 rounded-full" />
          <h2 className="text-2xl font-bold text-white">2. Stream Cipher</h2>
        </div>
        <p className="text-xs text-slate-400">Implementasi oleh: Rofli</p>
      </div>

      <div className="p-5 rounded-2xl enterprise-card space-y-2 border-emerald-500/20">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <HelpCircle className="w-4 h-4" />
          <span>Konsep Sederhana: Apa itu Stream Cipher?</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          <b>Stream Cipher bekerja seperti keran air mengalir</b>. Karakter atau bit pesan langsung digabungkan seketika dengan aliran angka acak semu (<i>keystream</i>) menggunakan operasi logika <b>XOR</b>. Sangat cepat untuk komunikasi nirkabel dan streaming audio/video.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-900 rounded-xl border border-white/10">
        {[
          { id: "rc4", label: "1. RC4 Cipher", tag: "KSA & PRGA" },
          { id: "otp", label: "2. One-Time Pad", tag: "Perfect Secrecy" },
          { id: "autokey", label: "3. Autokey Cipher", tag: "Self-Key" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => { setMethod(item.id); handleReset(); }}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              method === item.id ? "bg-emerald-600 text-white shadow-md" : "text-slate-400 hover:text-white"
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
            <label className="text-xs font-bold uppercase text-slate-400">Input Data</label>
            <button onClick={handleReset} className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400">
              <RotateCcw className="w-3.5 h-3.5" /><span>Reset</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ketik pesan yang ingin diuji..."
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-emerald-500 resize-none"
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase text-slate-400">Kunci Rahasia</label>
              {method === "otp" && (
                <button onClick={generateOTPKey} className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 cursor-pointer">
                  <Key className="w-3 h-3" /><span>Generate Kunci Otomatis</span>
                </button>
              )}
            </div>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Masukkan kunci..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          {errorMsg && <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-mono">{errorMsg}</div>}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => handleProcess(true)} className="flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg transition active:scale-95 cursor-pointer">
              <Lock className="w-4 h-4" /><span>Enkripsi Stream</span>
            </button>
            <button onClick={() => handleProcess(false)} className="flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs border border-white/10 transition active:scale-95 cursor-pointer">
              <Unlock className="w-4 h-4" /><span>Dekripsi Stream</span>
            </button>
          </div>
        </div>

        <div className="p-5 rounded-2xl enterprise-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase text-slate-400">Hasil Pemrosesan</label>
              {output && (
                <button onClick={copyOutput} className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Tersalin" : "Salin"}</span>
                </button>
              )}
            </div>
            <textarea readOnly rows={5} value={output} placeholder="Hasil akan muncul di sini..." className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-emerald-300 text-sm font-mono resize-none break-all" />
          </div>

          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-slate-300">
            {method === "rc4" && "RC4: Mengacak barisan 0-255 (KSA) lalu memuntahkan byte acak yang di-XOR dengan pesan."}
            {method === "otp" && "OTP: Mengharuskan kunci acak murni seukuran pesan yang dimusnahkan setelah 1 kali pakai."}
            {method === "autokey" && "Autokey: Menyambung kunci menggunakan huruf teks aslinya sendiri agar tidak berulang."}
          </div>
        </div>
      </div>
    </div>
  );
}
