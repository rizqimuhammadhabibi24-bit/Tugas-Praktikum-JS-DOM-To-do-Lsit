// 1. DOM Selection
const inputTask = document.getElementById("inputTask");
const btnTambah = document.getElementById("btnTambah");
const listContainer = document.getElementById("listContainer");
const totalTaskElem = document.getElementById("totalTask");
const completedTaskElem = document.getElementById("completedTask");
const uncompletedTaskElem = document.getElementById("uncompletedTask");
const pesanKosong = document.getElementById("pesanKosong");

// 2. Fungsi Update Rekap Statistik
function updateStatistik() {
    const total = listContainer.children.length;
    // Menghitung jumlah tugas yang dicentang/selesai
    const selesai = listContainer.querySelectorAll(".task-text.completed").length;
    const belum = total - selesai;

    totalTaskElem.innerText = total;
    completedTaskElem.innerText = selesai;
    uncompletedTaskElem.innerText = belum;

    if (total === 0) {
        pesanKosong.classList.remove("hidden");
    } else {
        pesanKosong.classList.add("hidden");
    }
}

// 3. Fungsi Tambah Tugas Baru
function tambahTugas() {
    const teks = inputTask.value.trim();

    // Validasi input kosong
    if (teks === "") {
        alert("Peringatan: Ketikkan tugas terlebih dahulu!");
        return;
    }

    // Buat elemen <li> baru
    const li = document.createElement("li");

    // Buat pembungkus bagian kiri (Checkbox + Teks)
    const leftGroup = document.createElement("div");
    leftGroup.className = "task-left";

    // 1. Buat Tombol Ceklis (Checkbox)
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    // 2. Buat Teks Tugas
    const spanTeks = document.createElement("span");
    spanTeks.innerText = teks;
    spanTeks.className = "task-text";

    // EventListener khusus Tombol Ceklis (Mencoret Teks)
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            spanTeks.classList.add("completed");
        } else {
            spanTeks.classList.remove("completed");
        }
        updateStatistik(); // Update angka statistik
    });

    // 3. Buat Tombol Hapus[span_9
    const btnHapus = document.createElement("button");
    btnHapus.innerText = "Hapus";
    btnHapus.className = "btn-hapus";

    // EventListener Tombol Hapus
    btnHapus.addEventListener("click", function () {
        li.remove();
        updateStatistik();
    });

    // Masukkan Checkbox & Teks ke pembungkus kiri
    leftGroup.appendChild(checkbox);
    leftGroup.appendChild(spanTeks);

    // Masukkan Pembungkus Kiri & Tombol Hapus ke dalam <li>
    li.appendChild(leftGroup);
    li.appendChild(btnHapus);

    // Masukkan <li> ke dalam <ul>
    listContainer.appendChild(li);

    // Bersihkan input teks
    inputTask.value = "";

    // Update angka statistik
    updateStatistik();
}

// 4. Event Listener Aksi Klik & Tombol Enter
btnTambah.addEventListener("click", tambahTugas);

inputTask.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        tambahTugas();
    }
});

// RUN statistik saat pertama kali dimuat
updateStatistik();