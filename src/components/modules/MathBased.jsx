"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, HelpCircle, BookOpen } from "lucide-react";
import { processHill, processToyRSA, processDiffieHellman } from "../../lib/mathCipher";

export default function MathBased() {
  const [method, setMethod] = useState("hill");
  const [output, setOutput] = useState("");
  const [details, setDetails] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [hillText, setHillText] = useState("");
  const [hillMatrix, setHillMatrix] = useState("3 5 1 2");

  const [rsaP, setRsaP] = useState("61");
  const [rsaQ, setRsaQ] = useState("53");
  const [rsaE, setRsaE] = useState("17");
  const [rsaMsg, setRsaMsg] = useState("65");

  const [dhP, setDhP] = useState("23");
  const [dhG, setDhG] = useState("5");
  const [dhPrivA, setDhPrivA] = useState("6");
  const [dhPrivB, setDhPrivB] = useState("15");

  const handleReset = () => {
    setOutput("");
    setErrorMsg("");
    setDetails(null);
  };

  const handleHill = (isEncrypt) => {
    setErrorMsg("");
    const res = processHill(hillText, hillMatrix, isEncrypt);
    if (res?.success) {
      setOutput(res.result);
      setDetails(res.details);
    } else setErrorMsg(res?.error || "Terjadi kesalahan sistem komputasi.");
  };

  const handleRSA = () => {
    setErrorMsg("");
    const res = processToyRSA(rsaP, rsaQ, rsaE, rsaMsg);
    if (res?.success) {
      setOutput(res.result);
      setDetails(res.details);
    } else setErrorMsg(res?.error || "Terjadi kesalahan sistem komputasi.");
  };

  const handleDH = () => {
    setErrorMsg("");
    const res = processDiffieHellman(dhP, dhG, dhPrivA, dhPrivB);
    if (res?.success) {
      setOutput(res.result);
      setDetails(res.details);
    } else setErrorMsg(res?.error || "Terjadi kesalahan sistem komputasi.");
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
          <span className="w-2.5 h-6 bg-rose-600 rounded-full" />
          <h2 className="text-2xl font-bold text-slate-900">4. Algoritma Dasar Matematika (Modulo 128)</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Penerapan teori matematika aljabar linear matriks ASCII, faktorisasi prima, dan logaritma diskret.
        </p>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
        <div className="flex items-center gap-2 text-rose-900 font-bold text-sm sm:text-base">
          <HelpCircle className="w-4 h-4 text-rose-600" />
          <span>Mengapa Menggunakan Modulo 128?</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
          Kalkulator kriptografi sekolah pada umumnya hanya bisa huruf A sampai Z (modulo 26). Pada aplikasi ini, kita menggunakan <b>Modulo 128</b>, artinya kita dapat mengenkripsi <b>seluruh 128 karakter tabel ASCII standar</b>: huruf besar, huruf kecil, angka (0-9), spasi, serta tanda baca lengkap tanpa perlu membuang spasi. Agar pesan sandi bisa didekripsi kembali, kunci matematika yang dipakai wajib memiliki nilai determinan ganjil (faktor pengali tidak boleh genap terhadap 128).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
        {[
          { id: "hill", label: "1. Aljabar Linear (Hill)", tag: "Mod 128 ASCII" },
          { id: "rsa", label: "2. Faktorisasi Prima (RSA)", tag: "Asimetris Publik-Privat" },
          { id: "dh", label: "3. Diffie-Hellman", tag: "Pertukaran Kunci" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => { setMethod(item.id); handleReset(); }}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
              method === item.id ? "bg-white text-rose-700 shadow-2xs border border-slate-200 font-bold" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>{item.label}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${method === item.id ? "bg-rose-50 text-rose-800" : "bg-slate-200 text-slate-600"}`}>{item.tag}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 sm:p-6 rounded-2xl saas-card space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Parameter Masukan</label>
            <button onClick={handleReset} className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600">
              <RotateCcw className="w-3.5 h-3.5" /><span>Reset</span>
            </button>
          </div>

          {method === "hill" && (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Input Teks (Bebas Spasi & Simbol ASCII)</label>
                <input type="text" value={hillText} onChange={(e) => setHillText(e.target.value)} placeholder="Contoh: Kelompok 3" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-mono" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Matriks Kunci 2x2 (4 Angka: a b c d)</label>
                <input type="text" value={hillMatrix} onChange={(e) => setHillMatrix(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-mono" />
                <span className="text-[11px] text-slate-500 mt-1 block">Contoh kunci valid: <b>3 5 1 2</b> (determinan = 1, bernilai ganjil sehingga memiliki invers modulo 128).</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button onClick={() => handleHill(true)} className="py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer">Enkripsi Hill</button>
                <button onClick={() => handleHill(false)} className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs sm:text-sm border border-slate-200 transition active:scale-95 cursor-pointer">Dekripsi Hill</button>
              </div>
            </>
          )}

          {method === "rsa" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Bilangan Prima p</label>
                  <input type="number" value={rsaP} onChange={(e) => setRsaP(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Bilangan Prima q</label>
                  <input type="number" value={rsaQ} onChange={(e) => setRsaQ(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Eksponen Publik e</label>
                  <input type="number" value={rsaE} onChange={(e) => setRsaE(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Pesan Angka m (&lt; p*q)</label>
                  <input type="number" value={rsaMsg} onChange={(e) => setRsaMsg(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" />
                </div>
              </div>
              <button onClick={handleRSA} className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer mt-2">Kalkulasi Toy RSA</button>
            </>
          )}

          {method === "dh" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Modulus Prima (p)</label>
                  <input type="number" value={dhP} onChange={(e) => setDhP(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Basis Generator (g)</label>
                  <input type="number" value={dhG} onChange={(e) => setDhG(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Kunci Privat Alice (a)</label>
                  <input type="number" value={dhPrivA} onChange={(e) => setDhPrivA(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Kunci Privat Bob (b)</label>
                  <input type="number" value={dhPrivB} onChange={(e) => setDhPrivB(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" />
                </div>
              </div>
              <button onClick={handleDH} className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer mt-2">Simulasikan Pertukaran Kunci</button>
            </>
          )}

          {errorMsg && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-mono">{errorMsg}</div>}
        </div>

        <div className="p-5 sm:p-6 rounded-2xl saas-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Hasil Pemrosesan</label>
              {output && (
                <button onClick={copyOutput} className="flex items-center gap-1.5 text-xs text-rose-700 font-semibold cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Tersalin" : "Salin"}</span>
                </button>
              )}
            </div>
            <textarea readOnly rows={4} value={output} placeholder="Hasil komputasi aljabar akan muncul di sini..." className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-mono resize-none break-all" />
          </div>

          {details && (
            <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
              <span className="text-rose-700 font-bold block mb-1">Rincian Komputasi Matematis:</span>
              {details.modulo && <p>• Ruang Lingkup: Modulo {details.modulo} (ASCII 0-127)</p>}
              {details.determinant !== undefined && <p>• Determinan Matriks: {details.determinant}</p>}
              {details.matrixUsed && <p>• Matriks Operasi: {details.matrixUsed}</p>}
              {details.publicKey && <p>• Kunci Publik (e, n): {details.publicKey}</p>}
              {details.privateKey && <p>• Kunci Privat (d, n): {details.privateKey}</p>}
              {details.sharedSecret !== undefined && <p>• Shared Secret Verification: {details.matched ? "Valid & Identik" : "Inkonsisten"}</p>}
            </div>
          )}

          <div className="mt-4 p-3 bg-rose-50/70 border border-rose-100 rounded-xl text-xs text-slate-600">
            {method === "hill" && "Hill Cipher: Pasangan huruf dikalikan dengan kotak matriks angka 2x2 di dalam Modulo 128."}
            {method === "rsa" && "RSA: Siapa saja bisa mengunci pesan dengan kunci publik, tapi hanya pemilik kunci privat yang bisa membukanya."}
            {method === "dh" && "Diffie-Hellman: Dua orang saling bertukar data di internet terbuka untuk menyepakati kunci rahasia yang sama persis."}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl saas-card space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <BookOpen className="w-4 h-4 text-rose-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {method === "hill" && "Alur Kerja: Hill Cipher Modulo 128"}
            {method === "rsa" && "Alur Kerja: Toy RSA (Asimetris Publik-Privat)"}
            {method === "dh" && "Alur Kerja: Protokol Pertukaran Kunci Diffie-Hellman"}
          </h4>
        </div>

        {method === "hill" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 1: Ambil 2 Karakter ASCII</b>
              <p>Teks dipotong per pasangan 2 huruf (p1, p2), lalu masing-masing diubah ke nomor urut kode tabel ASCII (0 hingga 127).</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 2: Kalikan dengan Matriks Kunci 2x2</b>
              <p>Pasangan angka dikalikan dengan matriks kunci [a b; c d]: c1 = (a*p1 + b*p2) mod 128 dan c2 = (c*p1 + d*p2) mod 128.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 3: Syarat Determinan Wajib Ganjil</b>
              <p>Determinan (ad - bc) wajib bernilai ganjil agar matriks memiliki kebalikan (invers) di dalam hitungan Modulo 128.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 4: Dekripsi Memakai Matriks Balikan</b>
              <p>Untuk membaca kembali teks sandi, pasangan huruf dikalikan dengan matriks balikan modularnya (K invers) modulo 128.</p>
            </div>
          </div>
        )}

        {method === "rsa" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 1: Buat Gembok dari Dua Angka Prima</b>
              <p>Dua angka prima (p dan q) dikalikan untuk menghasilkan angka gembok: n = p * q dan totien phi = (p - 1) * (q - 1).</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 2: Terbitkan Kunci Publik (e, n)</b>
              <p>Kunci publik diumumkan secara bebas ke publik agar siapa saja bisa mengunci pesan menggunakan rumus: Cipher = (m^e) mod n.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 3: Simpan Kunci Pembuka Privat (d)</b>
              <p>Kunci pembuka d dihitung memakai Extended Euclidean Algorithm (d * e mod phi = 1) dan dirahasiakan oleh pemilik.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 4: Buka Pesan Rahasia</b>
              <p>Penerima membuka angka pesan rahasia menggunakan kunci privatnya: Pesan Asli = (Cipher^d) mod n.</p>
            </div>
          </div>
        )}

        {method === "dh" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 1: Sepakati Angka Terbuka di Publik</b>
              <p>Alice dan Bob mengumumkan angka modulus prima p dan generator basis g secara bebas tanpa takut disadap pihak luar.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 2: Buat Angka Rahasia Sendiri</b>
              <p>Alice memilih angka rahasia privat a, sedangkan Bob memilih angka rahasia privat b di perangkatnya masing-masing.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 3: Tukar Hasil Campuran</b>
              <p>Alice mengirimkan A = (g^a) mod p kepada Bob, dan Bob mengirimkan B = (g^b) mod p kepada Alice lewat jaringan internet.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">Tahap 4: Kunci Akhir Otomatis Sama</b>
              <p>Alice menghitung (B^a) mod p dan Bob menghitung (A^b) mod p. Keduanya menghasilkan angka kunci yang sama persis: K = (g^(a*b)) mod p.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


