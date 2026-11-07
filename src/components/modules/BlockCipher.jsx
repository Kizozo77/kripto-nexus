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
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-6 bg-blue-600 rounded-full" />
          <h2 className="text-2xl font-bold text-slate-900">1. Block Cipher</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Transformasi kriptografi simetris berbasis partisi data berukuran tetap (64-bit dan 128-bit).
        </p>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
        <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Definisi & Prinsip Kerja Block Cipher</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
          Block Cipher mengelompokkan rangkaian plaintext ke dalam blok-blok bit dengan panjang seragam sebelum ditransformasikan secara utuh menggunakan kunci rahasia. Skema ini mengombinasikan dua prinsip fundamental Shannon: konfusi (mengaburkan relasi antara kunci dan ciphertext via substitusi S-Box) dan difusi (meratakan redundansi statistik data via permutasi P-Box).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
        {[
          { id: "aes", label: "1. AES (128/256-bit)", tag: "SPN Network" },
          { id: "des", label: "2. DES (Feistel)", tag: "16-Round" },
          { id: "playfair", label: "3. Playfair Cipher", tag: "5x5 Digraph" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => { setMethod(item.id); handleReset(); }}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
              method === item.id ? "bg-white text-blue-700 shadow-2xs border border-slate-200 font-bold" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>{item.label}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${method === item.id ? "bg-blue-50 text-blue-700" : "bg-slate-200 text-slate-600"}`}>{item.tag}</span>
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
            placeholder="Masukkan teks yang akan dienkripsi atau didekripsi..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
          />

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Kunci Kriptografis (Secret Key)</label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Masukkan kunci rahasia..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {errorMsg && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-mono">{errorMsg}</div>}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => handleProcess(true)} className="flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer">
              <Lock className="w-4 h-4" /><span>Enkripsi Blok</span>
            </button>
            <button onClick={() => handleProcess(false)} className="flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs sm:text-sm border border-slate-200 transition active:scale-95 cursor-pointer">
              <Unlock className="w-4 h-4" /><span>Dekripsi Blok</span>
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl saas-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Hasil Pemrosesan (Output)</label>
              {output && (
                <button onClick={copyOutput} className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Tersalin" : "Salin"}</span>
                </button>
              )}
            </div>
            <textarea readOnly rows={5} value={output} placeholder="Hasil komputasi algoritma akan ditampilkan di sini..." className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-mono resize-none break-all" />
          </div>

          <div className="mt-4 p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-slate-600">
            {method === "aes" && "AES memproses data 128-bit menggunakan jaringan SPN dengan 10 hingga 14 putaran matriks."}
            {method === "des" && "DES memecah data 64-bit menjadi blok L dan R yang disilangkan bergantian dalam 16 siklus Feistel."}
            {method === "playfair" && "Playfair mengenkripsi pasangan karakter (digraf) berdasarkan koordinat matriks kunci 5x5."}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl saas-card space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {method === "aes" && "Formulasi & Mekanisme Algoritma AES (Advanced Encryption Standard)"}
            {method === "des" && "Formulasi & Mekanisme Algoritma DES (Data Encryption Standard)"}
            {method === "playfair" && "Formulasi & Mekanisme Algoritma Playfair Cipher"}
          </h4>
        </div>

        {method === "aes" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">1. SubBytes: S(a_i,j)</b>
              <p>Tiap byte disubstitusi non-linear menggunakan tabel S-Box konstan pada medan berhingga Galois Field GF(2^8).</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">2. ShiftRows: Rotasi Baris Siklis</b>
              <p>Baris ke-r digeser siklis ke kiri sebesar r byte: Row 0 tetap, Row 1 geser 1, Row 2 geser 2, Row 3 geser 3 byte.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">3. MixColumns: Perkalian Polinomial</b>
              <p>Tiap kolom dikalikan dengan matriks polinomial konstan c(x) = 03·x^3 + 01·x^2 + 01·x + 02 modulo x^4 + 1.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">4. AddRoundKey: State ⊕ K_round</b>
              <p>Matriks state hasil pembauran dikombinasikan dengan subkunci putaran menggunakan operasi logika XOR tingkat bit.</p>
            </div>
          </div>
        )}

        {method === "des" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">1. Permutasi Awal: IP(Block) → L_0 || R_0</b>
              <p>Blok input 64-bit diacak posisinya dan dibagi dua bagian simetris berukuran masing-masing 32-bit.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">2. Fungsi Feistel: F(R_i-1, K_i)</b>
              <p>Ekspansi E(32→48 bit) dilanjutkan XOR subkunci, substitusi 8 kotak S-Box (48→32 bit), dan permutasi P.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">3. Persamaan Rekursif 16 Putaran</b>
              <p className="font-mono text-slate-800">L_i = R_i-1 dan R_i = L_i-1 ⊕ F(R_i-1, K_i) untuk i = 1, 2, ..., 16.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">4. Permutasi Balikan: IP^-1(R_16 || L_16)</b>
              <p>Kedua paruh ditukar posisi akhirnya lalu dilewatkan permutasi balik untuk membentuk ciphertext 64-bit.</p>
            </div>
          </div>
        )}

        {method === "playfair" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">1. Matriks 5x5 dan Digraf</b>
              <p>Teks dipecah menjadi pasangan 2 huruf (m1, m2). Karakter kembar disisipi 'X', dan 'I'/'J' berada di sel yang sama.</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">2. Aturan Baris Sejajar (Row Rule)</b>
              <p className="font-mono text-slate-800">c1 = M[row, (col1 + 1) mod 5], c2 = M[row, (col2 + 1) mod 5]</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">3. Aturan Kolom Sejajar (Column Rule)</b>
              <p className="font-mono text-slate-800">c1 = M[(row1 + 1) mod 5, col], c2 = M[(row2 + 1) mod 5, col]</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">4. Aturan Sudut Persegi (Rectangle Rule)</b>
              <p className="font-mono text-slate-800">c1 = M[row1, col2] dan c2 = M[row2, col1]</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
