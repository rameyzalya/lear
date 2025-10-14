let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let tabAktif = "aktif";
let taskEdit = null;

function tambahTugas() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text || !document.getElementById("taskDate").value) return;

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false,
    priority: document.getElementById("taskPriority").value,
    date: document.getElementById("taskDate").value,
  });

  simpan();
  render();
  input.value = "";
}

function gantiTab(tab) {
  tabAktif = tab;
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  event.target.classList.add("active");
  render();
}

function toggleSelesai(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  simpan();
  render();
}

function bukaEdit(id) {
  taskEdit = tasks.find((t) => t.id === id);
  document.getElementById("editInput").value = taskEdit.text;
  document.getElementById("editDate").value = taskEdit.date;
  document.getElementById("editPriority").value = taskEdit.priority;
  document.getElementById("editModal").style.display = "flex";
}

function hapusTugas(id) {
  if (confirm("Hapus tugas ini?")) {
    tasks = tasks.filter((task) => task.id !== id);
    simpan();
    render();
  }
}

function simpanEdit() {
  if (taskEdit) {
    taskEdit.text = document.getElementById("editInput").value.trim();
    taskEdit.date = document.getElementById("editDate").value;
    taskEdit.priority = document.getElementById("editPriority").value;
    simpan();
    render();
    tutupModal();
  }
}

function tutupModal() {
  document.getElementById("editModal").style.display = "none";
  taskEdit = null;
}

function render() {
  const list = document.getElementById("taskList");
  const filteredTasks = tasks.filter((task) =>
    tabAktif === "aktif" ? !task.completed : task.completed
  );

  if (filteredTasks.length === 0) {
    list.innerHTML = `<div style="text-align:center; color:#666; padding:40px;">
            ${
              tabAktif === "aktif"
                ? "Tidak ada tugas aktif"
                : "Tidak ada tugas selesai"
            }
        </div>`;
    return;
  }

  list.innerHTML = filteredTasks
    .map(
      (task) => `
        <div class="task-item ${task.completed ? "selesai" : ""} ${
        task.priority
      }">
            <input type="checkbox" class="task-checkbox" 
                   ${task.completed ? "checked" : ""} 
                   onchange="toggleSelesai(${task.id})">
            <div class="task-content">
                <div class="task-text ${task.completed ? "selesai" : ""}">
                    ${task.text}
                </div>
                <div class="task-details">
                    <span class="priority ${
                      task.priority
                    }">${task.priority.toUpperCase()}</span>
                    <span>📅 ${new Date(task.date).toLocaleDateString(
                      "id-ID"
                    )}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="edit-btn" onclick="bukaEdit(${
                  task.id
                })">Edit</button>
                <button class="hapus-btn" onclick="hapusTugas(${
                  task.id
                })">Hapus</button>
            </div>
        </div>
    `
    )
    .join("");
}

function simpan() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event listener untuk Enter key
document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") tambahTugas();
});

// Init
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("taskDate").value = new Date()
    .toISOString()
    .split("T")[0];
  render();
});
