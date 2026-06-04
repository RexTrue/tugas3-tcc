DROP TABLE IF EXISTS notes_app;
USE notes_app;

CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(255) NOT NULL,
  isi TEXT NOT NULL,
  tanggal_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tanggal_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO notes (id, judul, isi, tanggal_dibuat, tanggal_update) VALUES
(2,'percobaan 1','Hai Ini percobaan pertama 123123','2026-03-23 16:46:33','2026-03-23 17:37:56'),
(3,'Percobaan 2','Lorem ipsum dolor sit amet','2026-03-23 16:55:42','2026-03-23 16:55:42');