const API = `${window.API_BASE_URL || "https://rafa-dot-g-28-489306.as.r.appspot.com"}/api/notes`;


function loadNotes() {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("notes");
      const empty = document.getElementById("emptyMessage");

      container.innerHTML = "";

      if (data.length === 0) {
        empty.style.display = "block";
        return;
      }

      empty.style.display = "none";

      data.forEach((note) => {
        const preview =
          note.isi.length > 200 ? note.isi.substring(0, 200) + "..." : note.isi;

        container.innerHTML += `

<div class="note">

<div class="note-content" onclick="openDetail(${note.id})">

<h3>${note.judul}</h3>

<p class="preview">${preview}</p>

<small>Terakhir diubah: ${new Date(note.tanggal_update).toLocaleString()}</small>

</div>

<div class="actions">

<button type "button" class="edit" onclick="openDetail(${note.id})">Edit</button>

<button type "button" class="delete" onclick="hapusNote(${note.id})">Delete</button>

</div>

</div>

`;
      });
    });
}

function showForm() {
  document.getElementById("modal").style.display = "flex";
}

function closeForm() {
  document.getElementById("modal").style.display = "none";
}

function tambahNote() {
  const judul = document.getElementById("judul").value;
  const isi = document.getElementById("isi").value;

  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ judul, isi }),
  }).then(() => {
    closeForm();
    loadNotes();
  });
}

function hapusNote(id) {
  if (!confirm("Hapus catatan?")) return;

  fetch(API + "/" + id, { method: "DELETE" }).then(() => loadNotes());
}

function openDetail(id) {
  window.location.href = "detail.html?id=" + id;
}

loadNotes();
