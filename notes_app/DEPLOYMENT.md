# Deployment Notes

## Deskripsi Aplikasi
Aplikasi Notes ini adalah versi lanjutan dari Tugas 2. Backend menggunakan Express.js dan MySQL, sedangkan frontend menggunakan HTML/CSS/JavaScript murni.

## Teknologi Frontend
- HTML
- CSS
- JavaScript
- Frontend bersifat statis dan memanggil backend melalui endpoint REST API.

## Skenario Deployment yang Dipilih
Skenario 2:
- Backend Express.js di Cloud Run
- Frontend statis di App Engine

## File Konfigurasi Deployment
- `backend/Dockerfile` untuk service Cloud Run
- `frontend/app.yaml` untuk service App Engine

## Pengaturan Backend
1. Pastikan database MySQL tersedia di host `34.172.113.167`.
2. Gunakan kredensial yang sesuai dengan tugas:
   - Username: `admin`
   - Password: `mypassword`
3. Set environment variables Cloud Run:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`

## Pengaturan Frontend
1. Buka `frontend/config.js`.
2. Ganti `window.API_BASE_URL` dengan URL publik backend Cloud Run.
   Contoh:
   `window.API_BASE_URL = "https://your-cloud-run-url.a.run.app";`

## Langkah Deployment
### 1. Deploy backend ke Cloud Run
Masuk ke folder `backend` lalu jalankan:
```bash
gcloud run deploy notes-backend \
  --source . \
  --region asia-southeast2 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars DB_HOST=34.172.113.167,DB_USER=admin,DB_PASSWORD=mypassword,DB_NAME=notes_NIM
```

### 2. Update frontend API URL
Ubah `frontend/config.js` ke URL Cloud Run.

### 3. Deploy frontend ke App Engine
Dari folder `frontend` jalankan:
```bash
gcloud app deploy app.yaml --project YOUR_PROJECT_ID
```

## Pengujian
- Pastikan frontend dapat melakukan:
  - tambah catatan
  - lihat daftar catatan
  - edit catatan
  - hapus catatan
- Pastikan data tersimpan di database MySQL.

## Screenshot yang Disarankan
- Database di phpMyAdmin
- `frontend/app.yaml`
- `backend/Dockerfile`
- Proses deployment App Engine
- Proses deployment Cloud Run
- Frontend dan backend diakses via URL publik
- Pengujian API menggunakan REST client
- Pengujian CRUD dari frontend
- Data CRUD tersimpan di MySQL
