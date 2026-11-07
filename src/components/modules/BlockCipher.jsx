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
      setErrorMsg(res?.error || "Terjadi kesalahan sistem komputasi.");
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
        <p className="text-xs text-slate-400">
          Transformasi kriptografi simetris berbasis partisi data berukuran tetap.
        </p>
      </div>

      {/* Penjelasan Formal Kategori Utama */}
      <div className="p-5 rounded-2xl enterprise-card space-y-2 border-blue-500/20">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
          <HelpCircle className="w-4 h-4" />
          <span>Definisi & Prinsip Kerja Block Cipher</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed text-justify">
          <b>Block Cipher</b> adalah skema enkripsi simetris yang mengelompokkan rangkaian <i>plaintext</i> ke dalam blok-blok bit dengan panjang seragam (misalnya 64 bit atau 128 bit) sebelum ditransformasikan secara utuh menggunakan kunci rahasia. Skema ini mengombinasikan dua prinsip fundamental Claude Shannon: <b>konfusi</b> (mengaburkan relasi antara kunci dan <i>ciphertext</i> via substitusi) dan <b>difusi</b> (meratakan redundansi statistik data via permutasi). Apabila blok terakhir tidak memenuhi batas kapasitas bit, teknik <i>padding</i> diterapkan secara terstandar.
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
            <label className="text-xs font-bold uppercase text-slate-400">Input Data Teks</label>
            <button onClick={handleReset} className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400">
              <RotateCcw className="w-3.5 h-3.5" /><span>Reset</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Masukkan teks yang akan dienkripsi atau didekripsi..."
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-blue-500 resize-none"
          />

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Kunci Kriptografis (Secret Key)</label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Masukkan kunci rahasia..."
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
              <label className="text-xs font-bold uppercase text-slate-400">Hasil Pemrosesan (Output)</label>
              {output && (
                <button onClick={copyOutput} className="flex items-center gap-1.5 text-xs text-blue-400 font-medium cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Tersalin" : "Salin"}</span>
                </button>
              )}
            </div>
            <textarea readOnly rows={5} value={output} placeholder="Hasil komputasi algoritma akan ditampilkan di sini..." className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-cyan-300 text-sm font-mono resize-none break-all" />
          </div>

          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-slate-300">
            {method === "aes" && "AES memproses data 128 bit menggunakan jaringan SPN dengan 10 hingga 14 putaran transformasi aljabar matriks."}
            {method === "des" && "DES memecah data 64 bit menjadi dua blok (kiri dan kanan) yang disilangkan secara bergantian dalam 16 siklus Feistel."}
            {method === "playfair" && "Playfair mengenkripsi pasangan karakter (digraf) berdasarkan relasi posisi koordinat pada matriks kunci berukuran 5x5."}
          </div>
        </div>
      </div>

      {/* Rincian Teori Algoritma yang Dipilih */}
      <div className="p-5 rounded-2xl enterprise-card space-y-3 border-white/10">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
          <BookOpen className="w-4 h-4 text-blue-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            {method === "aes" && "Karakteristik & Mekanisme Algoritma AES (Advanced Encryption Standard)"}
            {method === "des" && "Karakteristik & Mekanisme Algoritma DES (Data Encryption Standard)"}
            {method === "playfair" && "Karakteristik & Mekanisme Algoritma Playfair Cipher"}
          </h4>
        </div>

        {method === "aes" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-blue-400 block font-semibold">1. SubBytes (Substitusi Non-linear)</b>
              <p className="text-slate-400">Setiap byte dalam matriks state disubstitusi secara independen menggunakan tabel S-Box konstan berbasis invers perkalian Galois Field $GF(2^8)$.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-blue-400 block font-semibold">2. ShiftRows (Permutasi Siklik)</b>
              <p className="text-slate-400">Baris-baris pada matriks state digeser secara siklik ke kiri dengan offset berjenjang (baris 0 tetap, baris 1 geser 1 byte, baris 2 geser 2 byte, baris 3 geser 3 byte).</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-blue-400 block font-semibold">3. MixColumns (Difusi Kolom)</b>
              <p className="text-slate-400">Setiap kolom matriks dikalikan dengan polinomial tetap modulo $x^4 + 1$ untuk menyebarkan pengaruh tiap byte ke seluruh kolom secara merata.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-blue-400 block font-semibold">4. AddRoundKey (Kombinasi Kunci)</b>
              <p className="text-slate-400">Subkunci putaran yang diturunkan melalui algoritma <i>Key Expansion</i> dikombinasikan dengan matriks state menggunakan operasi logika XOR tingkat bit.</p>
            </div>
          </div>
        )}

        {method === "des" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-blue-400 block font-semibold">1. Permutasi Awal & Pembagian Blok</b>
              <p className="text-slate-400">Blok input 64 bit diacak melalui Initial Permutation (IP), lalu dibagi secara simetris menjadi dua paruh: $L_0$ (32 bit) dan $R_0$ (32 bit).</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-blue-400 block font-semibold">2. Fungsi Feistel ($F$)</b>
              <p className="text-slate-400">Paruh kanan diekspansi menjadi 48 bit via tabel $E$, di-XOR dengan subkunci putaran $K_i$, disubstitusi melalui 8 kotak S-Box, dan dipermutasi dengan tabel $P$.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-blue-400 block font-semibold">3. Struktur Iteratif 16 Putaran</b>
              <p className="text-slate-400">Berlaku relasi matematis: $L_i = R_{i-1}$ dan $R_i = L_{i-1} \oplus F(R_{i-1}, K_i)$, menjamin proses dekripsi identik dengan membalik urutan subkunci.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-blue-400 block font-semibold">4. Inverse Permutation ($IP^{-1}$)</b>
              <p className="text-slate-400">Setelah putaran ke-16 selesai, kedua paruh digabungkan kembali ($R_{16}L_{16}$) dan melewati permutasi akhir untuk membentuk <i>ciphertext</i>.</p>
            </div>
          </div>
        )}

        {method === "playfair" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-blue-400 block font-semibold">1. Konstruksi Matriks Kunci 5x5</b>
              <p className="text-slate-400">Kunci alfabet diisikan ke dalam tabel matriks 25 sel tanpa pengulangan huruf, menggabungkan karakter 'I' dan 'J' ke dalam satu koordinat yang sama.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-blue-400 block font-semibold">2. Pembentukan Digraf & Sisipan Padding</b>
              <p className="text-slate-400">Plaintext dipecah per pasang 2 huruf. Apabila terdapat huruf kembar dalam satu pasang, karakter pemisah 'X' disisipkan sebelum enkripsi dilakukan.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-blue-400 block font-semibold">3. Aturan Baris & Kolom Sejajar</b>
              <p className="text-slate-400">Bila kedua huruf berada pada baris yang sama, geser ke kanan satu kolom modulo 5. Bila berada pada satu kolom yang sama, geser ke bawah satu baris modulo 5.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1">
              <b className="text-blue-400 block font-semibold">4. Aturan Perpotongan Persegi Panjang</b>
              <p className="text-slate-400">Bila kedua huruf membentuk sudut persegi panjang, masing-masing diganti oleh huruf pada baris asalnya yang memotong kolom pasangan pasangannya.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
