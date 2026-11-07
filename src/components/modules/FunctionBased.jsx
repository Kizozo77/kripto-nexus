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
          Uji coba tiga pilar utama keamanan data: Kerahasiaan (Confidentiality), Integritas (Integrity), dan Otentikasi (Authenticity).
        </p>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
        <div className="flex items-center gap-2 text-purple-900 font-bold text-sm sm:text-base">
          <HelpCircle className="w-4 h-4 text-purple-600" />
          <span>3 Pilar Keamanan Informasi</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
          Kriptografi bukan hanya sekadar mengacak teks agar tidak bisa dibaca orang. Keamanan sistem digital bersandar pada 3 pilar: 
          <b> 1. Kerahasiaan (Caesar)</b> memastikan pesan hanya bisa dibaca oleh penerima yang berhak, 
          <b> 2. Integritas (SHA-256)</b> seperti sidik jari digital untuk mendeteksi apakah isi dokumen pernah diubah diam-diam di perjalanan, dan 
          <b> 3. Otentikasi (HMAC)</b> seperti cap stempel tanda tangan basah menggunakan kunci rahasia bersama untuk membuktikan bahwa pengirimnya adalah orang yang sah.
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
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Kunci Rahasia Bersama (Secret Key)</label>
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
              <button onClick={handleProcessSHA256} className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer">Hasilkan SHA-256 Digest (Sidik Jari)</button>
            )}
            {method === "hmac" && (
              <button onClick={handleProcessHMAC} className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer">Hasilkan Stempel Otentikasi HMAC</button>
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
            {method === "caesar" && "Caesar mengamankan pesan dengan menggeser letak abjad sejauh k langkah ke depan."}
            {method === "sha256" && "SHA-256 menghasilkan sidik jari 64 heksadesimal tetap; ubah 1 titik kecil, seluruh kodenya berubah total."}
            {method === "hmac" && "HMAC memastikan dokumen tidak dimanipulasi sekaligus membuktikan bahwa pengirimnya adalah pemilik kunci yang sah."}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl saas-card space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <BookOpen className="w-4 h-4 text-purple-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {method === "caesar" && "Alur Kerja: Caesar Cipher (Pilar Kerahasiaan)"}
            {method === "sha256" && "Alur Kerja: SHA-256 Digest (Pilar Integritas Data)"}
            {method === "hmac" && "Alur Kerja: HMAC SHA-256 (Pilar Otentikasi Pengirim)"}
          </h4>
        </div>

        {method === "caesar" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 1: Ubah Abjad Menjadi Angka</b>
              <p>Huruf A dipetakan ke angka 0, B ke 1, C ke 2, dan seterusnya hingga huruf Z ke angka 25.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 2: Tambah Jarak Pergeseran (Shift)</b>
              <p>Nilai angka huruf ditambah dengan nilai pergeseran kunci k: Cipher = (Plaintext + k) mod 26.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 3: Putar Balik jika Lewat Huruf Z</b>
              <p>Operasi sisa bagi (mod 26) memastikan jika huruf digeser melampaui huruf Z, nilainya otomatis memutar kembali ke huruf A.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 4: Dekripsi Balik</b>
              <p>Untuk mengembalikan pesan, huruf sandi cukup dikurangi kembali dengan nilai kuncinya: Plaintext = (Cipher - k + 26) mod 26.</p>
            </div>
          </div>
        )}

        {method === "sha256" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 1: Masukkan Data Ukuran Berapa Saja</b>
              <p>Anda bisa memasukkan satu huruf, satu kata, maupun teks dokumen tebal tanpa ada batasan panjang awal.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 2: Hasil Selalu Sepanjang 64 Karakter</b>
              <p>Output hash dipastikan selalu memiliki ukuran tetap 256-bit (tampil dalam 64 karakter heksadesimal 0-9 dan a-f).</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 3: Fungsi Satu Arah (Mustahil Dibalik)</b>
              <p>Sangat mudah menghitung teks menjadi kode hash, namun secara komputasi mustahil membedah kode hash kembali menjadi teks aslinya.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 4: Efek Longsoran (Avalanche Effect)</b>
              <p>Jika isi teks diubah satu spasi saja, lebih dari 50% karakter kode hash langsung berubah total, membuktikan integritas pesan rusak.</p>
            </div>
          </div>
        )}

        {method === "hmac" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 1: Sepakati Satu Kunci Rahasia Bersama</b>
              <p>Pengirim dan penerima harus sama-sama memegang satu kata kunci rahasia yang tidak diketahui oleh orang lain.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 2: Lapisan Hash Pertama (Inner Hash)</b>
              <p>Kunci dicampur dengan kode pengganjal tetap (ipad), lalu digabung dengan teks pesan dan di-hash pertama kali memakai SHA-256.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 3: Lapisan Hash Kedua (Outer Hash)</b>
              <p>Kunci dicampur lagi dengan kode pengganjal berbeda (opad), digabung dengan hasil hash tahap 1, lalu di-hash ulang untuk membentuk stempel akhir.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 4: Verifikasi Keabsahan Pengirim</b>
              <p>Penerima menghitung ulang HMAC pesan tersebut dengan kunci rahasianya. Jika kodenya cocok, pesan dijamin asli dan pengirimnya valid.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


