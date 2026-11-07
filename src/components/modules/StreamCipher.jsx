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
      setErrorMsg("Ketik teks masukan terlebih dahulu untuk menyesuaikan panjang kunci.");
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
        <p className="text-xs text-slate-400">
          Transformasi kriptografi simetris berbasis aliran bit kontinu dan operasi XOR.
        </p>
      </div>

      <div className="p-5 rounded-2xl enterprise-card space-y-2 border-emerald-500/20">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <HelpCircle className="w-4 h-4" />
          <span>Definisi & Prinsip Kerja Stream Cipher</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed text-justify">
          <b>Stream Cipher</b> memproses teks terbuka secara berurutan digit per digit (karakter demi karakter atau bit demi bit) secara <i>real-time</i> tanpa memerlukan akumulasi blok penampung. Karakter pesan dikombinasikan dengan aliran kunci semu acak (<i>pseudorandom keystream</i>) menggunakan operasi penambahan modular atau bitwise XOR ($\oplus$). Skema ini menghasilkan latensi pemrosesan sangat rendah, menjadikannya standar utama pada protokol komunikasi suara digital dan jaringan nirkabel.
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
            <label className="text-xs font-bold uppercase text-slate-400">Input Data (Teks / Hex)</label>
            <button onClick={handleReset} className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400">
              <RotateCcw className="w-3.5 h-3.5" /><span>Reset</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Masukkan pesan yang akan diuji..."
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-emerald-500 resize-none"
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase text-slate-400">Kunci Aliran (Keystream Key)</label>
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
              placeholder="Masukkan kunci rahasia..."
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
            <textarea readOnly rows={5} value={output} placeholder="Hasil aliran byte / karakter akan muncul di sini..." className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-emerald-300 text-sm font-mono resize-none break-all" />
          </div>

          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-slate-300">
            {method === "rc4" && "RC4 menghasilkan deret bit semu melalui permutasi state berukuran 256 byte berbasis operasi KSA dan PRGA."}
            {method === "otp" && "One-Time Pad memenuhi kriteria Perfect Secrecy dengan syarat panjang kunci sama dengan pesan dan hanya dipakai satu kali."}
            {method === "autokey" && "Autokey menggunakan kunci awal singkat yang disambung secara otomatis oleh plaintext itu sendiri untuk membentuk keystream berkelanjutan."}
          </div>
        </div>
      </div>

      {/* Rincian Teori Algoritma yang Dipilih */}
      <div className="p-5 rounded-2xl enterprise-card space-y-3 border-white/10">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            {method === "rc4" && "Karakteristik & Mekanisme Algoritma RC4 (Rivest Cipher 4)"}
            {method === "otp" && "Karakteristik & Mekanisme Algoritma One-Time Pad (Vernam Cipher)"}
            {method === "autokey" && "Karakteristik & Mekanisme Algoritma Autokey Cipher"}
          </h4>
        </div>

        {method === "rc4" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-emerald-400 block font-semibold">1. Inisialisasi State Array ($S$)</b>
              <p className="text-slate-400">Array berukuran 256 elemen diinisialisasi secara berurutan dari indeks 0 hingga 255: $S[i] = i$.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-emerald-400 block font-semibold">2. Key-Scheduling Algorithm (KSA)</b>
              <p className="text-slate-400">Array $S$ dipermutasi secara acak berdasarkan nilai ASCII kunci rahasia melalui relasi $j = (j + S[i] + \text{key}[i \pmod L]) \pmod{256}$, lalu menukar posisi $S[i]$ dan $S[j]$.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-emerald-400 block font-semibold">3. Pseudo-Random Generation Algorithm (PRGA)</b>
              <p className="text-slate-400">Dua penunjuk indeks $i$ dan $j$ digerakkan secara kontinu untuk membangkitkan byte acak semu: $K = S[(S[i] + S[j]) \pmod{256}]$.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-emerald-400 block font-semibold">4. Transformasi Bitwise XOR</b>
              <p className="text-slate-400">Byte keystream $K$ digabungkan secara eksklusif dengan byte pesan terbuka ($C_i = P_i \oplus K$). Dekripsi dijalankan dengan rumus identik ($P_i = C_i \oplus K$).</p>
            </div>
          </div>
        )}

        {method === "otp" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-emerald-400 block font-semibold">1. Syarat Mutlak Kesetaraan Panjang</b>
              <p className="text-slate-400">Panjang kunci rahasia ($K$) secara matematis wajib sama persis dengan total panjang pesan terbuka ($P$): $|K| = |P|$.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-emerald-400 block font-semibold">2. Kriteria Keacakan Murni (True Randomness)</b>
              <p className="text-slate-400">Kunci tidak boleh berasal dari pola algoritma deterministik, melainkan harus dibangkitkan dari sumber entropi acak sejati.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-emerald-400 block font-semibold">3. Teorema Kerahasiaan Sempurna (Shannon)</b>
              <p className="text-slate-400">Probabilitas apriori pesan sama dengan probabilitas aposteriori setelah melihat ciphertext ($P(M|C) = P(M)$), membuat kriptanalisis frekuensi mustahil dilakukan.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-emerald-400 block font-semibold">4. Protokol Sekali Pakai (One-Time Rule)</b>
              <p className="text-slate-400">Kunci tidak boleh digunakan ulang untuk dua pesan berbeda; pemakaian ulang akan membuka celah XOR dua ciphertext ($C_1 \oplus C_2 = P_1 \oplus P_2$).</p>
            </div>
          </div>
        )}

        {method === "autokey" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-emerald-400 block font-semibold">1. Penempatan Kunci Benih (Primer Key)</b>
              <p className="text-slate-400">Kata kunci pendek yang disepakati diletakkan pada posisi awal rangkaian aliran kunci (keystream).</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-emerald-400 block font-semibold">2. Ekstensi Keystream Otomatis</b>
              <p className="text-slate-400">Karakter-karakter dari pesan terbuka (plaintext) disambungkan tepat setelah kunci benih, sehingga panjang aliran kunci otomatis setara dengan panjang teks.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-emerald-400 block font-semibold">3. Eliminasi Pola Periodik Vigenère</b>
              <p className="text-slate-400">Karena kunci tidak mengulang kata sandi secara siklis, metode analisis statistik Kasiski Examination tidak dapat digunakan untuk memecahkan cipher ini.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-emerald-400 block font-semibold">4. Penjumlahan Modular Rekursif</b>
              <p className="text-slate-400">Enkripsi dihitung via $C_i = (P_i + K_i) \pmod M$. Saat dekripsi, setiap karakter hasil rekonstruksi ($P_i$) segera ditambahkan ke antrean kunci untuk membuka karakter berikutnya.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
