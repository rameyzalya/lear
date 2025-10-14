function formatAngka(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length > 3) {
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  input.value = value;
}

function hitung() {
  const nama = document.getElementById("nama").value.trim();
  const kategori = document.getElementById("kategori").value;
  const harga = document.getElementById("harga").value;
  const diskon = parseFloat(document.getElementById("diskon").value);

  const error = document.getElementById("error");
  const hasil = document.getElementById("hasil");

  error.classList.remove("muncul");
  hasil.classList.remove("muncul");

  if (!nama || !harga || !diskon) {
    tampilkanError("Harap isi semua field!");
    return;
  }

  const hargaNum = parseInt(harga.replace(/\./g, ""));

  if (hargaNum <= 0) {
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
  const format = (angka) =>
    "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
