const API_BASE_URL =
  "https://rafa-1018980344585.asia-southeast1.run.app";

async function loadNotes() {

  try {

    const response = await fetch(
      `${API_BASE_URL}/api/notes`
    );

    const data = await response.json();

    const notesContainer =
      document.getElementById("notesContainer");

    notesContainer.innerHTML = "";

    // Jika kosong
    if (data.length === 0) {

      notesContainer.innerHTML =
        "<p>Belum ada catatan</p>";

      return;
    }

    // Render notes
    data.forEach((note) => {

      const noteCard =
        document.createElement("div");

      noteCard.classList.add("note-card");

      noteCard.innerHTML = `
        <h3>${note.judul}</h3>
        <p>${note.isi}</p>

        <div class="note-actions">
          <button onclick="deleteNote(${note.id})">
            Hapus
          </button>
        </div>
      `;

      notesContainer.appendChild(noteCard);
    });

  } catch (error) {

    console.error("LOAD NOTES ERROR:", error);
  }
}

async function tambahCatatan() {

  try {

    const judulInput =
      document.getElementById("judul");

    const isiInput =
      document.getElementById("isi");

    const judul =
      judulInput.value.trim();

    const isi =
      isiInput.value.trim();

    // Validation
    if (!judul || !isi) {

      alert("Judul dan isi wajib diisi");

      return;
    }

    const response = await fetch(
      `${API_BASE_URL}/api/notes`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          judul,
          isi,
        }),
      }
    );

    // Cek response
    if (!response.ok) {

      const errorData =
        await response.json();

      console.error(errorData);

      alert("Gagal menambahkan catatan");

      return;
    }

    // Reset form
    judulInput.value = "";
    isiInput.value = "";

    // Reload notes
    loadNotes();

  } catch (error) {

    console.error("ADD NOTE ERROR:", error);
  }
}

async function deleteNote(id) {

  try {

    const confirmDelete =
      confirm("Hapus catatan ini?");

    if (!confirmDelete) return;

    const response = await fetch(
      `${API_BASE_URL}/api/notes/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {

      alert("Gagal menghapus catatan");

      return;
    }

    loadNotes();

  } catch (error) {

    console.error("DELETE NOTE ERROR:", error);
  }
}

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadNotes();

    const addButton =
      document.getElementById("addButton");

    if (addButton) {

      addButton.addEventListener(
        "click",
        tambahCatatan
      );
    }
  }
);
