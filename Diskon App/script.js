function formatAngka(input) {
  let value = input.value;

  // Hapus karakter minus jika ada
  value = value.replace(/-/g, "");

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

function validasiDiskon(input) {
  let value = parseFloat(input.value);

  // Jika nilai negatif, set ke 0
  if (value < 0) {
    input.value = 0;
  }

  // Jika nilai lebih dari 100, set ke 100
  if (value > 100) {
    input.value = 100;
  }

  // Jika NaN, set ke empty string
  if (isNaN(value)) {
    input.value = "";
  }
}

function hitung() {
  const nama = document.getElementById("nama").value.trim();
  const kategori = document.getElementById("kategori").value;
  let harga = document.getElementById("harga").value;
  let diskon = parseFloat(document.getElementById("diskon").value);

  const error = document.getElementById("error");
  const hasil = document.getElementById("hasil");

  error.classList.remove("muncul");
  hasil.classList.remove("muncul");

  if (!nama || !harga || isNaN(diskon)) {
    tampilkanError("Harap isi semua field!");
    return;
  }

  // Validasi harga tidak boleh kosong atau hanya berisi format
  if (harga.replace(/[.,]/g, "") === "") {
    tampilkanError("Harga tidak valid!");
    return;
  }

  // Konversi harga - ganti koma dengan titik untuk perhitungan
  const hargaNum = parseFloat(harga.replace(/\./g, "").replace(/,/g, "."));

  if (isNaN(hargaNum) || hargaNum <= 0) {
    tampilkanError("Harga harus lebih besar dari 0!");
    return;
  }

  // Jika diskon lebih dari 100, otomatis set ke 100
  if (diskon > 100) {
    diskon = 100;
    document.getElementById("diskon").value = 100;
  }

  if (diskon < 0) {
    tampilkanError("Diskon harus antara 0-100%!");
    return;
  }

  const nilaiDiskon = hargaNum * (diskon / 100);
  const total = hargaNum - nilaiDiskon;

  // Validasi total tidak boleh negatif
  if (total < 0) {
    tampilkanError("Total harga tidak boleh negatif!");
    return;
  }

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

// Event listener untuk real-time validation pada diskon
document.getElementById("diskon").addEventListener("input", function (e) {
  let value = parseFloat(this.value);

  if (value > 100) {
    this.value = 100;
  }

  if (value < 0) {
    this.value = 0;
  }
});

// Event listener untuk mencegah input minus pada field diskon
document.getElementById("diskon").addEventListener("keydown", function (e) {
  // Prevent minus sign
  if (e.key === "-" || e.key === "Subtract") {
    e.preventDefault();
  }
});

// Event listener untuk mencegah paste nilai negatif pada diskon
document.getElementById("diskon").addEventListener("paste", function (e) {
  const pasteData = e.clipboardData.getData("text");
  if (pasteData.includes("-")) {
    e.preventDefault();
    // Replace dengan nilai positif
    const positiveValue = pasteData.replace(/-/g, "");
    this.value = positiveValue;
  }
});

// Event listener untuk mencegah input minus pada field harga
document.getElementById("harga").addEventListener("keydown", function (e) {
  // Prevent minus sign
  if (e.key === "-" || e.key === "Subtract") {
    e.preventDefault();
  }
});

// Event listener untuk mencegah paste nilai negatif pada harga
document.getElementById("harga").addEventListener("paste", function (e) {
  const pasteData = e.clipboardData.getData("text");
  if (pasteData.includes("-")) {
    e.preventDefault();
    // Replace dengan nilai positif
    const positiveValue = pasteData.replace(/-/g, "");
    this.value = positiveValue;
  }
});

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") hitung();
});
