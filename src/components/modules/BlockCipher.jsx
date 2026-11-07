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
          Metode enkripsi simetris yang memotong teks menjadi blok-blok berukuran tetap sebelum dikunci.
        </p>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
        <div className="flex items-center gap-2 text-blue-900 font-bold text-sm sm:text-base">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Apa itu Block Cipher?</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
          Block Cipher bekerja seperti <b>mengepak barang ke dalam kardus yang ukurannya selalu sama</b>. Pesan panjang tidak diproses huruf per huruf, melainkan dipotong menjadi paket berukuran tetap (misalnya 128 bit pada AES atau 64 bit pada DES). Setiap potongan paket tersebut kemudian diacak posisinya dan ditukar isinya berkali-kali menggunakan kunci rahasia yang sama. Jika potongan teks terakhir kurang panjang, sistem akan menambahkan karakter pengganjal (padding) agar ukurannya pas satu blok utuh.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
        {[
          { id: "aes", label: "1. AES (128/256-bit)", tag: "Standar Modern" },
          { id: "des", label: "2. DES (Feistel)", tag: "16 Putaran Silang" },
          { id: "playfair", label: "3. Playfair Cipher", tag: "Tabel Matriks 5x5" },
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
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Input Plaintext / Ciphertext</label>
            <button onClick={handleReset} className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600">
              <RotateCcw className="w-3.5 h-3.5" /><span>Reset</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ketik teks yang ingin dienkripsi atau didekripsi..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
          />

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Kunci Rahasia (Secret Key)</label>
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
            {method === "aes" && "Ringkasan: AES adalah standar enkripsi terkuat saat ini, memproses blok 128-bit melalui 10-14 kali putaran pencampuran data."}
            {method === "des" && "Ringkasan: DES adalah cipher klasik 64-bit yang membelah data jadi dua lalu menyilangkannya sebanyak 16 kali putaran."}
            {method === "playfair" && "Ringkasan: Playfair mengunci huruf berpasangan (2 huruf sekaligus) di dalam kotak matriks 5x5."}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl saas-card space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {method === "aes" && "Alur Kerja: AES (Advanced Encryption Standard)"}
            {method === "des" && "Alur Kerja: DES (Data Encryption Standard)"}
            {method === "playfair" && "Alur Kerja: Playfair Cipher"}
          </h4>
        </div>

        {method === "aes" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 1: SubBytes (Tukar Nilai Byte)</b>
              <p>Tiap byte data diganti dengan byte baru dari tabel kamus acak tetap (S-Box) agar polanya tidak mudah ditebak.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 2: ShiftRows (Geser Baris ke Samping)</b>
              <p>Data disusun dalam kotak 4x4. Baris 1 tetap, baris 2 digeser 1 langkah, baris 3 digeser 2 langkah, dan baris 4 digeser 3 langkah ke kiri.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 3: MixColumns (Aduk Kolom Data)</b>
              <p>Setiap kolom dikalikan dengan rumus matematika khusus sehingga jika 1 karakter saja berubah, seluruh kolom akan rusak teracak.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 4: AddRoundKey (Kombinasi Kunci)</b>
              <p>Hasil adukan digabung dengan potongan kunci rahasia putaran memakai operasi bitwise XOR (State ⊕ Kunci Putaran).</p>
            </div>
          </div>
        )}

        {method === "des" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 1: Initial Permutation & Belah Dua</b>
              <p>Blok data 64 bit diacak posisinya, lalu dibelah simetris menjadi dua paruh: Paruh Kiri (L = 32 bit) dan Paruh Kanan (R = 32 bit).</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 2: Fungsi Pengacak Feistel</b>
              <p>Paruh kanan diekspansi, digabung dengan kunci putaran memakai XOR, lalu dimasukkan ke 8 kotak S-Box untuk diperkecil kembali ke 32 bit.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 3: Silangkan 16 Kali Putaran</b>
              <p>Hasil fungsi pengacak di-XOR dengan paruh kiri. Posisi paruh kiri dan kanan lalu ditukar. Siklus silang ini diulang sebanyak 16 putaran penuh.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 4: Inverse Permutation (Hasil Akhir)</b>
              <p>Setelah putaran ke-16 selesai, kedua paruh digabungkan kembali dan posisinya diputar ulang lewat permutasi balik untuk menjadi ciphertext.</p>
            </div>
          </div>
        )}

        {method === "playfair" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 1: Buat Kotak Huruf 5x5</b>
              <p>Kunci dimasukkan ke kotak 25 sel tanpa huruf kembar. Huruf 'I' dan 'J' ditaruh di dalam satu sel yang sama.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 2: Pecah Teks Jadi Pasangan (2 Huruf)</b>
              <p>Teks dipotong per pasang. Jika ada dua huruf kembar dalam satu pasang (misal LL), disisipkan huruf 'X' di tengahnya.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 3: Geser Sebaris atau Sekolom</b>
              <p>Jika kedua huruf sebaris, geser ke kanan satu kolom. Jika kedua huruf sekolom, geser ke bawah satu baris di dalam tabel.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 4: Ambil Sudut Persegi</b>
              <p>Jika huruf berada di baris dan kolom berbeda, ambil huruf pada sudut diagonal seberangnya di baris asalnya masing-masing.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


