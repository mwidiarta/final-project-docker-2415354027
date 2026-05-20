# Laporan Hasil Praktikum: Final Project Aplikasi Berbasis Container

## Identitas Mahasiswa

- **Nama:** I Made Widiarta
- **NIM:** 2415354027
- **Kelas/Rombel:** 4C
- **Tanggal Praktikum:** 20 Mei 2026

---

## Teknologi & Tools yang Digunakan

- **Sistem Operasi:** Linux Ubuntu
- **Containerization:** Docker & Docker Hub
- **Bahasa Pemrograman / Framework:** Node.js dan Javascript
- **Tools Lain:** VS Code, Git, Bruno

---

## Langkah-Langkah Praktikum & Dokumentasi

### Langkah 1: Membuat struktur folder project

project-app/
├── app/
│ ├── Dockerfile
│ ├── .dockerignore
│ ├── .env
│ ├── .env.example
│ ├── package.json
│ └── app.js
└── docker-compose.yml

### Langkah 2: Melakukan npm int dan menginstall depedensi

Lakukan npm init pada folder app pada project-app kita

# Contoh perintah terminal yang dijalankan

npm init -y

```bash
# Contoh perintah terminal yang dijalankan
docker build -t app-good .
```

**Dokumentasi/Screenshot:**
![Proses Build Sukses](img/screenshot-langkah1.png)

---

### Langkah 2: [Tulis Nama Langkah 2, Contoh: Tag dan Push ke Docker Hub]

Jelaskan proses penamaan ulang _image_ dan proses unggah ke Docker Hub milik Anda.

```bash
docker tag app-good madedianpp/app-good:v1.0
docker push madedianpp/app-good:v1.0
```

**Dokumentasi/Screenshot:**
![Proses Push Berhasil](dokumentasi/push-docker-hub.png)

---

### Langkah 3: [Tulis Nama Langkah 3, Contoh: Pengujian Pull dan Run Container]

Jelaskan bagaimana cara melakukan verifikasi atau pengujian bahwa praktikum Anda berhasil berjalan.

```bash
docker run -d -p 8080:8080 madedianpp/app-good:v1.0
```

**Dokumentasi/Screenshot:**
<img src="img/screenshot-hasil-browser.png" alt="Aplikasi Berjalan di Browser" width="500">

---

## Kesimpulan

Tuliskan kesimpulan singkat atau kendala yang Anda hadapi beserta solusinya selama melakukan praktikum ini di sini.
