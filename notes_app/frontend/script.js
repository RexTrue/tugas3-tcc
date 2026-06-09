const API_BASE_URL =
  "https://rafa-1018980344585.asia-southeast1.run.app";


// ======================
// LOAD NOTES
// ======================

async function loadNotes() {

  try {

    const response = await fetch(
      `${API_BASE_URL}/api/notes`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }

    const data = await response.json();

    const notesContainer =
      document.getElementById("notes");

    const emptyMessage =
      document.getElementById("emptyMessage");

    notesContainer.innerHTML = "";

    // Jika kosong
    if (data.length === 0) {

      emptyMessage.style.display = "block";

      return;
    }

    emptyMessage.style.display = "none";

    // Render Notes
    data.forEach((note) => {

      const noteCard =
        document.createElement("div");

      noteCard.classList.add("note-card");

      noteCard.innerHTML = `
        <h3>${note.judul}</h3>

        <p>${note.isi}</p>

        <small>
          ${new Date(
            note.tanggal_dibuat
          ).toLocaleString()}
        </small>

        <div class="note-actions">

          <button
            onclick="deleteNote(${note.id})"
          >
            Hapus
          </button>

        </div>
      `;

      notesContainer.appendChild(noteCard);
    });

  } catch (error) {

    console.error(
      "LOAD NOTES ERROR:",
      error
    );
  }
}


// ======================
// TAMBAH NOTE
// ======================

async function tambahNote() {

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

    if (!response.ok) {

      throw new Error(
        "Failed to create note"
      );
    }

    // Reset Form
    judulInput.value = "";
    isiInput.value = "";

    // Close Modal
    closeForm();

    // Reload Notes
    loadNotes();

  } catch (error) {

    console.error(
      "ADD NOTE ERROR:",
      error
    );
  }
}


// ======================
// DELETE NOTE
// ======================

async function deleteNote(id) {

  try {

    const confirmDelete =
      confirm(
        "Apakah yakin ingin menghapus catatan?"
      );

    if (!confirmDelete) return;

    const response = await fetch(
      `${API_BASE_URL}/api/notes/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {

      throw new Error(
        "Failed to delete note"
      );
    }

    loadNotes();

  } catch (error) {

    console.error(
      "DELETE NOTE ERROR:",
      error
    );
  }
}


// ======================
// MODAL FUNCTIONS
// ======================

function showForm() {

  document.getElementById(
    "modal"
  ).style.display = "flex";
}

function closeForm() {

  document.getElementById(
    "modal"
  ).style.display = "none";
}


// ======================
// INIT
// ======================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadNotes();
  }
);
