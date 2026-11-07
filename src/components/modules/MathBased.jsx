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
          Transformasi kriptografis berbasis aljabar linear matriks ASCII, faktorisasi prima, dan logaritma diskret.
        </p>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
        <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
          <HelpCircle className="w-4 h-4 text-rose-600" />
          <span>Konsep Fundamental: Ruang Lingkup Aljabar Modulo 128</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
          Berbeda dari kriptografi sekolah biasa yang hanya mendukung alfabet A-Z (modulo 26), modul ini diimplementasikan di atas gelanggang komutatif Modulo 128 (Z_128). Desain ini mencakup seluruh 128 karakter tabel ASCII standar (0–127): huruf besar, huruf kecil, angka, spasi, dan simbol tanpa perlu menghapus spasi. Syarat mutlak pembalikan (dekripsi) adalah nilai penentu matriks atau parameter eksponen wajib ganjil (gcd(det, 128) = 1).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
        {[
          { id: "hill", label: "1. Aljabar Linear (Hill)", tag: "Mod 128 ASCII" },
          { id: "rsa", label: "2. Faktorisasi Prima (RSA)", tag: "Asymmetric" },
          { id: "dh", label: "3. Diffie-Hellman", tag: "Key Exchange" },
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
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Parameter Komputasi</label>
            <button onClick={handleReset} className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600">
              <RotateCcw className="w-3.5 h-3.5" /><span>Reset</span>
            </button>
          </div>

          {method === "hill" && (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Input Teks (Mendukung Spasi & Simbol ASCII)</label>
                <input type="text" value={hillText} onChange={(e) => setHillText(e.target.value)} placeholder="Contoh: Kelompok 3" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-mono" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Matriks Kunci 2x2 (4 Nilai: a b c d)</label>
                <input type="text" value={hillMatrix} onChange={(e) => setHillMatrix(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-mono" />
                <span className="text-[11px] text-slate-500 mt-1 block">Contoh valid: <b>3 5 1 2</b> (det = 1, ganjil sehingga memiliki invers modulo 128).</span>
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Prima p</label>
                  <input type="number" value={rsaP} onChange={(e) => setRsaP(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Prima q</label>
                  <input type="number" value={rsaQ} onChange={(e) => setRsaQ(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Eksponen Publik e</label>
                  <input type="number" value={rsaE} onChange={(e) => setRsaE(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Pesan Integer m (&lt; p*q)</label>
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Generator Basis (g)</label>
                  <input type="number" value={dhG} onChange={(e) => setDhG(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Private Alice (a)</label>
                  <input type="number" value={dhPrivA} onChange={(e) => setDhPrivA(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Private Bob (b)</label>
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
            {method === "hill" && "Hill Cipher: Transformasi aljabar linear perkalian matriks 2x2 terhadap vektor karakter ASCII."}
            {method === "rsa" && "RSA: Keamanan kriptografi asimetris berbasis kesulitan komputasi pemfaktoran bilangan prima."}
            {method === "dh" && "Diffie-Hellman: Kesepakatan kunci simetris aman melalui kanal publik berbasis logaritma diskret."}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl saas-card space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <BookOpen className="w-4 h-4 text-rose-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {method === "hill" && "Formulasi & Mekanisme Hill Cipher Modulo 128"}
            {method === "rsa" && "Formulasi & Mekanisme Kriptosistem Asimetris RSA"}
            {method === "dh" && "Formulasi & Mekanisme Protokol Diffie-Hellman"}
          </h4>
        </div>

        {method === "hill" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">1. Vektorisasi Pasangan Karakter</b>
              <p className="font-mono text-slate-800">P = [p1, p2]^T berdasarkan indeks tabel ASCII 0 hingga 127.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">2. Formulasi Enkripsi Matriks</b>
              <p className="font-mono text-slate-800">C = (K × P) mod 128</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">3. Syarat Inversibilitas Modular</b>
              <p className="font-mono text-slate-800">gcd(det(K), 128) = 1 (determinan ad - bc wajib berupa bilangan ganjil).</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">4. Formulasi Dekripsi Matriks Invers</b>
              <p className="font-mono text-slate-800">P = (K^-1 × C) mod 128 di mana K^-1 = det^-1 × adj(K) mod 128.</p>
            </div>
          </div>
        )}

        {method === "rsa" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">1. Modulus dan Totien Euler</b>
              <p className="font-mono text-slate-800">n = p × q dan phi(n) = (p - 1) × (q - 1)</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">2. Kunci Publik (e)</b>
              <p className="font-mono text-slate-800">1 &lt; e &lt; phi(n) dan gcd(e, phi(n)) = 1</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">3. Kunci Privat (d)</b>
              <p className="font-mono text-slate-800">d × e ≡ 1 mod phi(n) (invers modular Extended Euclidean)</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">4. Eksponensiasi Modular</b>
              <p className="font-mono text-slate-800">Enkripsi: c = (m^e) mod n | Dekripsi: m = (c^d) mod n</p>
            </div>
          </div>
        )}

        {method === "dh" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">1. Parameter Domain Publik: Prima (p) dan Generator (g)</b>
              <p>Disepakati secara terbuka oleh Alice dan Bob melalui kanal publik tanpa rahasia.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">2. Kunci Publik Alice dan Bob</b>
              <p className="font-mono text-slate-800">Alice: A = (g^a) mod p | Bob: B = (g^b) mod p</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">3. Komputasi Shared Secret Bersama</b>
              <p className="font-mono text-slate-800">Alice: K = (B^a) mod p | Bob: K = (A^b) mod p</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <b className="text-slate-900 block font-semibold">4. Kesetaraan Nilai Kunci Rahasia</b>
              <p className="font-mono text-slate-800">K = (g^(a × b)) mod p (kedua belah pihak menghasilkan nilai identik).</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
