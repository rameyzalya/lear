function formatAngka(input) {
  let value = input.value;

  // Izinkan hanya angka dan koma
  value = value.replace(/[^\d,]/g, "");

  // Hanya izinkan satu koma
  let parts = value.split(",");
  if (parts.length > 2) {
    value = parts[0] + "," + parts.slice(1).join("");
  }

  // Format bagian sebelum koma
  if (parts[0]) {
    let integerPart = parts[0].replace(/\D/g, "");
    if (integerPart.length > 3) {
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    parts[0] = integerPart;
  }

  input.value = parts.join(",");
}

function hitung() {
  const nama = document.getElementById("nama").value.trim();
  const kategori = document.getElementById("kategori").value;
  let harga = document.getElementById("harga").value;
  const diskon = parseFloat(document.getElementById("diskon").value);

  const error = document.getElementById("error");
  const hasil = document.getElementById("hasil");

  error.classList.remove("muncul");
  hasil.classList.remove("muncul");

  if (!nama || !harga || !diskon) {
    tampilkanError("Harap isi semua field!");
    return;
  }

  // Konversi harga - ganti koma dengan titik untuk perhitungan
  const hargaNum = parseFloat(harga.replace(/\./g, "").replace(/,/g, "."));

  if (isNaN(hargaNum) || hargaNum <= 0) {
    tampilkanError("Harga harus > 0!");
    return;
  }

  if (diskon > 100 || diskon < 0) {
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
  const format = (angka) => {
    return "Rp " + angka.toLocaleString("id-ID");
  };

  document.getElementById("hasilNama").textContent = nama;
  document.getElementById("hasilKategori").textContent = kategori;
  document.getElementById("hasilHarga").textContent = format(harga);
  document.getElementById("hasilDiskon").textContent = `${diskon}% (${format(
    nilaiDiskon
  )})`;
  document.getElementById("hasilTotal").textContent = format(total);

  document.getElementById("hasil").classList.add("muncul");
}

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") hitung();
});
