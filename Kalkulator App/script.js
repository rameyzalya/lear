// 1. Struktur Data
const data = {
  angka1: 0,
  angka2: 0,
  hasil: 0,
};

// 2. Validasi Input
function validasiInput() {
  const angka1 = document.getElementById("angka1").value;
  const angka2 = document.getElementById("angka2").value;
  const error = document.getElementById("error");

  error.style.display = "none";

  if (angka1 === "" || angka2 === "") {
    tampilkanError("Masukkan kedua angka!");
    return false;
  }

  if (isNaN(angka1) || isNaN(angka2)) {
    tampilkanError("Input harus berupa angka!");
    return false;
  }

  data.angka1 = parseFloat(angka1);
  data.angka2 = parseFloat(angka2);
  return true;
}

// 3. Logika Perhitungan
function hitung(operasi) {
  if (!validasiInput()) return;

  switch (operasi) {
    case "tambah":
      data.hasil = data.angka1 + data.angka2;
      break;
    case "kurang":
      data.hasil = data.angka1 - data.angka2;
      break;
    case "kali":
      data.hasil = data.angka1 * data.angka2;
      break;
    case "bagi":
      if (data.angka2 === 0) {
        tampilkanError("Tidak bisa membagi dengan nol!");
        return;
      }
      data.hasil = data.angka1 / data.angka2;
      break;
  }

  tampilkanHasil();
}

// 4. Tampilkan Hasil
function tampilkanHasil() {
  document.getElementById("hasil").textContent = data.hasil;
}

// 5. Tampilkan Error
function tampilkanError(pesan) {
  const error = document.getElementById("error");
  error.textContent = pesan;
  error.style.display = "block";
}

// 6. Reset Kalkulator
function resetKalkulator() {
  document.getElementById("angka1").value = "";
  document.getElementById("angka2").value = "";
  document.getElementById("hasil").textContent = "0";
  document.getElementById("error").style.display = "none";
}

// Event Listener untuk validasi input angka
document.getElementById("angka1").addEventListener("input", function (e) {
  this.value = this.value.replace(/[^0-9.-]/g, "");
});

document.getElementById("angka2").addEventListener("input", function (e) {
  this.value = this.value.replace(/[^0-9.-]/g, "");
});
