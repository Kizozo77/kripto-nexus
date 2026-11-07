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
          Metode enkripsi simetris yang memproses data huruf demi huruf secara mengalir (real-time).
        </p>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-teal-50/70 border border-teal-200/80 space-y-2">
        <div className="flex items-center gap-2 text-teal-900 font-bold text-sm sm:text-base">
          <HelpCircle className="w-4 h-4 text-teal-600" />
          <span>Pengertian Mudah: Apa itu Stream Cipher?</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
          Jika block cipher menunggu pesan terkumpul satu kardus, <b>Stream Cipher bekerja seperti keran air yang mengalir tanpa henti</b>. Begitu Anda mengetik satu huruf, detik itu juga huruf tersebut langsung disatukan dengan satu angka acak rahasia dari aliran kunci (keystream) menggunakan gerbang logika <b>XOR</b> (C = P ⊕ K). Karena tidak perlu menunggu penampungan data, metode ini sangat cepat dan ideal untuk panggilan telepon suara, video call, dan transmisi nirkabel.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
        {[
          { id: "rc4", label: "1. RC4 Cipher", tag: "KSA & PRGA" },
          { id: "otp", label: "2. One-Time Pad", tag: "Kunci Sekali Pakai" },
          { id: "autokey", label: "3. Autokey Cipher", tag: "Kunci Menyambung" },
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
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Input Data (Teks Plain / Hex)</label>
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
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Kunci Rahasia</label>
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
            {method === "rc4" && "Ringkasan: RC4 mengocok barisan angka 0-255 lalu memuntahkan aliran byte acak semu untuk di-XOR dengan teks."}
            {method === "otp" && "Ringkasan: OTP adalah satu-satunya cipher yang mustahil dipecahkan asalkan kunci acak sepanjang teks dan sekali pakai."}
            {method === "autokey" && "Ringkasan: Autokey menyambung kunci pendek menggunakan huruf teks aslinya sendiri agar kunci tidak berulang."}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl saas-card space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <BookOpen className="w-4 h-4 text-teal-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {method === "rc4" && "Alur Kerja Jelas: RC4 (Rivest Cipher 4)"}
            {method === "otp" && "Alur Kerja Jelas: One-Time Pad (Vernam Cipher)"}
            {method === "autokey" && "Alur Kerja Jelas: Autokey Cipher"}
          </h4>
        </div>

        {method === "rc4" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 1: Inisialisasi Barisan (0 sampai 255)</b>
              <p>Sistem menyiapkan wadah array 256 elemen yang berisi angka urut: S[0]=0, S[1]=1, ..., S[255]=255.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 2: Kocok Angka Menggunakan Kunci (KSA)</b>
              <p>Barisan 0-255 tersebut dikocok acak posisinya berulang kali mengikuti nilai huruf kata sandi yang Anda ketik.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 3: Hasilkan Kunci Aliran Acak (PRGA)</b>
              <p>Dua jarum penunjuk indeks (i dan j) berputar terus menerus mengambil satu angka acak baru dari array S.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 4: Gabungkan dengan Teks (XOR)</b>
              <p>Tiap huruf teks langsung di-XOR dengan byte acak yang baru keluar: Ciphertext = Plaintext ⊕ Keystream.</p>
            </div>
          </div>
        )}

        {method === "otp" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 1: Panjang Kunci Wajib Sama Persis</b>
              <p>Jika teks Anda terdiri dari 15 huruf, maka kunci rahasia yang dibangkitkan wajib memiliki tepat 15 huruf acak murni.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 2: Enkripsi Bit per Bit</b>
              <p>Karakter teks ke-1 di-XOR dengan kunci ke-1, karakter ke-2 dengan kunci ke-2, dan seterusnya secara independen.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 3: Dekripsi dengan Kunci yang Sama</b>
              <p>Penerima cukup melakukan operasi XOR balik antara sandi dengan kunci yang sama persis: Plaintext = Ciphertext ⊕ Kunci.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 4: Kunci Dibuang Permanen (Sekali Pakai)</b>
              <p>Kunci rahasia segera dimusnahkan dan tidak boleh dipakai lagi untuk pesan lain agar keamanan tetap absolut.</p>
            </div>
          </div>
        )}

        {method === "autokey" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 1: Pasang Kata Kunci Awal</b>
              <p>Kunci rahasia pendek yang Anda buat dipasang di posisi paling depan barisan kunci aliran.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 2: Sambung Memakai Teks Asli</b>
              <p>Sisa panjang kunci otomatis dipanjangkan menggunakan huruf-huruf dari isi pesan aslinya sendiri.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 3: Hitung Penjumlahan Modular</b>
              <p>Huruf teks dijumlahkan dengan huruf kuncinya lalu dimodulo 128: Cipher = (Plaintext + Kunci) mod 128.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 4: Dekripsi Bersambung</b>
              <p>Saat mendekripsi, huruf teks yang baru berhasil terbaca langsung dimasukkan ke belakang kunci untuk membuka huruf berikutnya.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
