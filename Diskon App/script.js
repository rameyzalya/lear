function formatAngka(input) {
  let value = input.value.replace(/[^\d,]/g, "");

  // Hapus 0 di awal angka (kecuali 0,)
  if (value.length > 1 && value[0] === "0" && value[1] !== ",") {
    value = value.substring(1);
  }

  let parts = value.split(",");

  if (parts.length > 2) {
    value = parts[0] + "," + parts.slice(1).join("");
  }

  if (parts[0]) {
    let integerPart = parts[0].replace(/\D/g, "");
    if (integerPart.length > 3) {
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    parts[0] = integerPart;
  }

  input.value = parts.join(",");
}

function formatDiskon(input) {
  let value = input.value.replace(/[^\d.]/g, "");

  // Hapus 0 di awal angka (kecuali 0.)
  if (value.length > 1 && value[0] === "0" && value[1] !== ".") {
    value = value.substring(1);
  }

  // Validasi range
  const numValue = parseFloat(value);
  if (numValue < 0) value = "0";
  if (numValue > 100) value = "100";

  input.value = value;
}

function hitung() {
  const nama = document.getElementById("nama").value.trim();
  const kategori = document.getElementById("kategori").value;
  let harga = document.getElementById("harga").value;
  let diskon = document.getElementById("diskon").value;

  const error = document.getElementById("error");
  const hasil = document.getElementById("hasil");

  error.classList.remove("muncul");
  hasil.classList.remove("muncul");

  if (!nama || !harga || !diskon) {
    tampilkanError("Harap isi semua field!");
    return;
  }

  // Validasi dan konversi harga
  const hargaNum = parseFloat(harga.replace(/\./g, "").replace(/,/g, "."));
  if (isNaN(hargaNum) || hargaNum <= 0) {
    tampilkanError("Harga harus lebih dari 0!");
    return;
  }

  // Validasi diskon
  diskon = parseFloat(diskon);
  if (isNaN(diskon) || diskon < 0 || diskon > 100) {
    tampilkanError("Diskon harus 0-100%!");
    return;
  }

  const nilaiDiskon = hargaNum * (diskon / 100);
  const total = hargaNum - nilaiDiskon;

  tampilkanHasil(nama, kategori, hargaNum, diskon, nilaiDiskon, total);
}

function tampilkanError(pesan) {
  const error = document.getElementById("error");
  error.textContent = pesan;
  error.classList.add("muncul");
}

function tampilkanHasil(nama, kategori, harga, diskon, nilaiDiskon, total) {
  const format = (angka) => "Rp " + angka.toLocaleString("id-ID");

  document.getElementById("hasilNama").textContent = nama;
  document.getElementById("hasilKategori").textContent = kategori;
  document.getElementById("hasilHarga").textContent = format(harga);
  document.getElementById("hasilDiskon").textContent = `${diskon}% (${format(
    nilaiDiskon
  )})`;
  document.getElementById("hasilTotal").textContent = format(total);

  document.getElementById("hasil").classList.add("muncul");
}

// Validasi real-time untuk diskon
document.getElementById("diskon").addEventListener("input", function (e) {
  formatDiskon(this);
});

// Validasi real-time untuk harga
document.getElementById("harga").addEventListener("input", function (e) {
  this.value = this.value.replace(/-/g, "");
});

// Enter untuk hitung
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") hitung();
});
