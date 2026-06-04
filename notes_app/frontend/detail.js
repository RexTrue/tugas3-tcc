const API = `${window.API_BASE_URL || "http://localhost:3000"}/api/notes`;

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

function loadNote() {
  fetch(API + "/" + id)
    .then((res) => res.json())
    .then((note) => {
      document.getElementById("judul").value = note.judul;
      document.getElementById("isi").value = note.isi;
    });
}

function updateNote() {
  const judul = document.getElementById("judul").value;
  const isi = document.getElementById("isi").value;

  fetch(API + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ judul, isi }),
  }).then(() => {
    alert("Catatan diperbarui");
    window.location.href = "index.html";
  });
}

function back() {
  window.location.href = "index.html";
}

loadNote();
