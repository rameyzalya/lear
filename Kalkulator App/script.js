function formatAngka(input) {
  let value = input.value;

  // Izinkan angka, koma, dan minus di depan
  value = value.replace(/[^\d,-]/g, "");

  // Hapus 0 di depan jika user mengetik angka setelahnya
  if (value.startsWith("0") && value.length > 1 && !value.startsWith("0,")) {
    // Cek karakter kedua, jika angka maka hapus 0 di depan
    const secondChar = value.charAt(1);
    if (secondChar.match(/\d/)) {
      value = value.substring(1);
    }
  }

  // Pastikan minus hanya di depan
  if (value.includes("-")) {
    if (value.indexOf("-") !== 0) {
      value = value.replace(/-/g, "");
    } else if (value.match(/-/g).length > 1) {
      value = "-" + value.replace(/-/g, "");
    }
  }

  // Hanya izinkan satu koma
  let parts = value.split(",");
  if (parts.length > 2) {
    value = parts[0] + "," + parts.slice(1).join("");
  }

  // Format bagian sebelum koma
  if (parts[0]) {
    let integerPart = parts[0].replace(/\D/g, "");

    // Hapus 0 di depan untuk integer part
    if (
      integerPart.length > 1 &&
      integerPart.startsWith("0") &&
      !integerPart.startsWith("0,")
    ) {
      integerPart = integerPart.replace(/^0+/, "");
      // Jika semua angka dihapus, kembalikan 0
      if (integerPart === "") integerPart = "0";
    }

    if (integerPart.length > 3) {
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    parts[0] = integerPart;
  }

  // Tambahkan kembali minus jika ada
  if (value.startsWith("-")) {
    parts[0] = "-" + parts[0];
  }

  input.value = parts.join(",");
}

function hitung(operasi) {
  const angka1 = document.getElementById("angka1").value;
  const angka2 = document.getElementById("angka2").value;
  const error = document.getElementById("error");
  const hasilElement = document.getElementById("hasil");

  // Reset tampilan error dan hasil
  error.style.display = "none";
  hasilElement.textContent = "0"; // Hapus hasil sebelumnya

  if (!angka1 || !angka2) {
    tampilkanError("Masukkan kedua angka!");
    return;
  }

  // Konversi ke angka - sama seperti kode diskon
  const num1 = parseFloat(angka1.replace(/\./g, "").replace(/,/g, "."));
  const num2 = parseFloat(angka2.replace(/\./g, "").replace(/,/g, "."));

  if (isNaN(num1) || isNaN(num2)) {
    tampilkanError("Format angka tidak valid!");
    return;
  }

  let hasil;
  switch (operasi) {
    case "tambah":
      hasil = num1 + num2;
      break;
    case "kurang":
      hasil = num1 - num2;
      break;
    case "kali":
      hasil = num1 * num2;
      break;
    case "bagi":
      if (num2 === 0) {
        tampilkanError("Tidak bisa membagi dengan nol!");
        hasilElement.textContent = "0"; // Pastikan hasil direset
        return;
      }
      hasil = num1 / num2;
      break;
  }

  // Format hasil sama seperti kode diskon
  hasilElement.textContent = formatHasil(hasil);
}

function tampilkanError(pesan) {
  const error = document.getElementById("error");
  const hasilElement = document.getElementById("hasil");

  error.textContent = pesan;
  error.style.display = "block";
  hasilElement.textContent = "0"; // Reset hasil ke 0 saat error
}

function formatHasil(angka) {
  return angka.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  });
}

function tampilkanError(pesan) {
  const error = document.getElementById("error");
  error.textContent = pesan;
  error.style.display = "block";
}

function resetKalkulator() {
  document.getElementById("angka1").value = "";
  document.getElementById("angka2").value = "";
  document.getElementById("hasil").textContent = "0";
  document.getElementById("error").style.display = "none";
}

// Event listeners untuk format otomatis
document.getElementById("angka1").addEventListener("input", function () {
  formatAngka(this);
});

document.getElementById("angka2").addEventListener("input", function () {
  formatAngka(this);
});

// Enter untuk menghitung
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") hitung("tambah");
});
