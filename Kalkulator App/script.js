// Elemen DOM
const elements = {
  angka1: document.getElementById("angka1"),
  angka2: document.getElementById("angka2"),
  error: document.getElementById("error"),
  hasil: document.getElementById("hasil"),
};

// Format input angka
function formatAngka(input) {
  let value = input.value.replace(/[^\d,-]/g, "");

  // Handle leading zero
  if (value.startsWith("0") && value.length > 1 && !value.startsWith("0,")) {
    const secondChar = value.charAt(1);
    if (secondChar.match(/\d/)) value = value.substring(1);
  }

  // Handle minus sign
  if (value.includes("-")) {
    if (value.indexOf("-") !== 0) {
      value = value.replace(/-/g, "");
    } else if (value.match(/-/g)?.length > 1) {
      value = "-" + value.replace(/-/g, "");
    }
  }

  // Format number with thousands separator
  let parts = value.split(",");
  if (parts.length > 2) value = parts[0] + "," + parts.slice(1).join("");

  if (parts[0]) {
    let integerPart = parts[0].replace(/\D/g, "");

    // Remove leading zeros
    if (
      integerPart.length > 1 &&
      integerPart.startsWith("0") &&
      !integerPart.startsWith("0,")
    ) {
      integerPart = integerPart.replace(/^0+/, "") || "0";
    }

    // Add thousands separator
    if (integerPart.length > 3) {
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    parts[0] = value.startsWith("-") ? "-" + integerPart : integerPart;
  }

  input.value = parts.join(",");
}

// Main calculation function
function hitung(operasi) {
  const { angka1, angka2, hasil } = elements;
  const num1 = parseNumber(angka1.value);
  const num2 = parseNumber(angka2.value);

  // Reset error display
  elements.error.style.display = "none";

  // Input validation
  if (!validateInput(angka1.value, angka2.value, num1, num2)) return;

  try {
    const operationResult = calculate(operasi, num1, num2);
    if (!isFinite(operationResult)) {
      tampilkanErrorDiHasil("Hasil perhitungan tidak valid!");
      return;
    }

    tampilkanHasil(fixNegativeZero(operationResult));
  } catch {
    tampilkanErrorDiHasil("Terjadi kesalahan dalam perhitungan!");
  }
}

// Helper functions
function parseNumber(value) {
  return parseFloat(value.replace(/\./g, "").replace(/,/g, "."));
}

function validateInput(val1, val2, num1, num2) {
  if (!val1.trim() || !val2.trim()) {
    tampilkanErrorDiHasil("Masukkan kedua angka!");
    return false;
  }

  if (isNaN(num1) || isNaN(num2)) {
    tampilkanErrorDiHasil("Format angka tidak valid!");
    return false;
  }

  if (!isFinite(num1) || !isFinite(num2)) {
    tampilkanErrorDiHasil("Angka terlalu besar!");
    return false;
  }

  return true;
}

function calculate(operation, num1, num2) {
  const operations = {
    tambah: () => num1 + num2,
    kurang: () => num1 - num2,
    kali: () => num1 * num2,
    bagi: () => {
      if (num2 === 0) throw new Error("Division by zero");
      return num1 / num2;
    },
  };

  if (!operations[operation]) throw new Error("Invalid operation");
  return operations[operation]();
}

function fixNegativeZero(number) {
  return number === 0 || number?.toString() === "-0" ? 0 : number;
}

function formatHasil(angka) {
  if ((Math.abs(angka) < 0.000001 && angka !== 0) || Math.abs(angka) > 1e12) {
    return angka.toExponential(2);
  }

  return angka.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  });
}

// Display functions
function tampilkanHasil(angka) {
  const { hasil } = elements;
  hasil.textContent = formatHasil(angka);
  setHasilStyle("white", "25px", "bold");
}

function tampilkanErrorDiHasil(pesan) {
  const { hasil } = elements;
  hasil.textContent = pesan;
  setHasilStyle("#fed7d7", "16px", "normal");
}

function setHasilStyle(color, fontSize, fontWeight) {
  const { hasil } = elements;
  hasil.style.color = color;
  hasil.style.fontSize = fontSize;
  hasil.style.fontWeight = fontWeight;
}

function resetHasilKeNormal() {
  const { hasil } = elements;
  if (hasil.style.color === "rgb(254, 215, 215)") {
    hasil.textContent = "0";
    setHasilStyle("white", "25px", "bold");
  }
}

function resetKalkulator() {
  elements.angka1.value = "";
  elements.angka2.value = "";
  elements.hasil.textContent = "0";
  elements.error.style.display = "none";
  setHasilStyle("white", "25px", "bold");
}

// Event listeners
function initEventListeners() {
  // Format angka on input
  [elements.angka1, elements.angka2].forEach((input) => {
    input.addEventListener("input", () => {
      formatAngka(input);
      resetHasilKeNormal();
    });
  });

  // Prevent invalid minus input
  [elements.angka1, elements.angka2].forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "-" && e.target.selectionStart !== 0) {
        e.preventDefault();
      }
    });
  });

  // Enter to calculate
  document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") hitung("tambah");
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  elements.hasil.textContent = "0";
  initEventListeners();
});
