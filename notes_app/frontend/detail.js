const API =
  `${window.API_BASE_URL}/api/notes`;

const params =
  new URLSearchParams(
    window.location.search
  );

const id =
  params.get("id");

async function loadNote() {

  try {

    const response =
      await fetch(
        `${API}/${id}`
      );

    if (!response.ok) {

      throw new Error(
        "Note not found"
      );
    }

    const note =
      await response.json();

    document.getElementById(
      "judul"
    ).value = note.judul;

    document.getElementById(
      "isi"
    ).value = note.isi;

  } catch (error) {

    console.error(error);

    alert(
      "Gagal memuat catatan"
    );
  }
}

async function updateNote() {

  try {

    const judul =
      document
        .getElementById("judul")
        .value
        .trim();

    const isi =
      document
        .getElementById("isi")
        .value
        .trim();

    if (!judul || !isi) {

      alert(
        "Judul dan isi wajib diisi"
      );

      return;
    }

    const response =
      await fetch(
        `${API}/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            judul,
            isi,
          }),
        }
      );

    if (!response.ok) {

      throw new Error(
        "Failed to update note"
      );
    }

    alert(
      "Catatan berhasil diperbarui"
    );

    window.location.href =
      "index.html";

  } catch (error) {

    console.error(error);

    alert(
      "Gagal memperbarui catatan"
    );
  }
}

function back() {

  window.location.href =
    "index.html";
}

loadNote();
