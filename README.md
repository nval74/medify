Medify - Smart Medicine Management
Medify adalah aplikasi web yang berfungsi sebagai kotak obat digital cerdas. Aplikasi ini membantu pengguna mengelola inventaris obat-obatan di rumah, melacak tanggal kedaluwarsa, dan memantau stok untuk memastikan keamanan dan kesehatan keluarga.

Link Deployment: https://app.netlify.com/projects/tiny-cendol-6f322b/deploys/

Latar Belakang Masalah
Banyak keluarga menyimpan obat-obatan di rumah, namun seringkali lupa tanggal kedaluwarsa atau jumlah stok yang tersisa. Hal ini dapat berisiko pada penggunaan obat yang sudah tidak efektif atau bahkan berbahaya. Medify hadir sebagai solusi modern untuk mengatasi masalah ini dengan menyediakan sistem manajemen yang mudah digunakan dan proaktif.

Fitur Utama
Dashboard Cerdas: Menampilkan ringkasan informasi terpenting secara visual, seperti obat yang sudah kedaluwarsa, akan kedaluwarsa, dan stoknya menipis.

Manajemen Inventaris (CRUD): Pengguna dapat dengan mudah menambah, melihat, mengedit, dan menghapus data obat.

Peringatan Dinamis: Sistem secara otomatis menghitung sisa hari sebelum obat kedaluwarsa dan menampilkannya dalam format yang mudah dipahami (misalnya, "kedaluwarsa dalam 15 hari lagi").

Tampilan Ganda (List & Grid): Pengguna dapat memilih untuk melihat daftar obat dalam format daftar (list) atau kisi (grid) sesuai preferensi. Pilihan ini akan disimpan di browser.

Pencarian Real-time: Fitur pencarian untuk memfilter dan menemukan obat secara cepat.

Pusat Informasi: Halaman terpisah yang berisi artikel-artikel kesehatan relevan, lengkap dengan sistem filter kategori.

Desain Responsif: Tampilan yang optimal baik di desktop maupun di perangkat mobile.

Teknologi yang Digunakan
HTML5: Sebagai struktur dasar aplikasi web.

CSS3: Untuk styling kustom dan animasi.

Tailwind CSS: Framework CSS untuk membangun antarmuka yang modern dan responsif dengan cepat.

JavaScript (Vanilla JS): Sebagai otak dari aplikasi untuk mengelola semua logika, interaktivitas, dan manipulasi data.

Font Awesome: Untuk ikonografi yang informatif dan menarik.

LocalStorage: Sebagai media penyimpanan data obat di sisi klien (browser).

Setup & Instalasi
Untuk menjalankan proyek ini secara lokal:

Clone repositori ini: git clone https://www.andarepository.com/

Buka folder proyek.

Buka file index.html di browser favorit Anda.

Penjelasan Dukungan AI (AI Support Explanation)
Dalam pengembangan Medify, IBM Granite digunakan sebagai asisten AI untuk mempercepat proses, memecahkan masalah kompleks, dan mengoptimalkan kode. Berikut adalah beberapa contoh bagaimana AI memberikan dampak nyata pada proyek ini:

1. Perancangan Logika Inti & Algoritma
AI membantu merancang fungsi-fungsi krusial yang menjadi inti dari aplikasi.

Contoh Prompt: "Buatkan saya sebuah fungsi JavaScript yang menerima array berisi objek obat. Setiap objek memiliki properti expiry dalam format 'YYYY-MM-DD'. Fungsi ini harus mengembalikan objek yang berisi tiga array terpisah: expired, expiringSoon (kurang dari 30 hari), dan safe berdasarkan tanggal hari ini."

Dampak: Menghemat waktu signifikan dalam merancang dan menulis logika klasifikasi status obat yang menjadi fitur utama dashboard.

2. Implementasi Fitur Kompleks (Perhitungan Tanggal)
Menangani tanggal dan zona waktu seringkali rumit. AI membantu memastikan akurasi perhitungan.

Contoh Prompt: "Saya perlu menghitung selisih hari antara tanggal kedaluwarsa dan tanggal hari ini di JavaScript. Pastikan perhitungannya akurat dan tidak terpengaruh oleh zona waktu (timezone) pengguna untuk menghindari 'off-by-one error'."

Dampak: Menghasilkan fitur peringatan dinamis yang andal dan akurat, yang merupakan nilai jual utama dari aplikasi.

3. Refactoring dan Optimasi Kode
Seiring berkembangnya aplikasi, beberapa fungsi menjadi terlalu besar. AI membantu merapikan kode agar lebih mudah dikelola.

Contoh Prompt: "Fungsi renderApp saya sekarang melakukan terlalu banyak hal (memfilter, mengatur style, dan membuat elemen). Bantu saya memecahnya (refactor) menjadi beberapa fungsi yang lebih kecil dan spesifik, seperti filterMedicines, createMedicineCard, dan applyViewMode."

Dampak: Meningkatkan kualitas dan keterbacaan kode, membuatnya lebih mudah untuk di-debug dan dikembangkan di masa depan.

4. Penulisan Kode Boilerplate & Debugging
AI digunakan untuk tugas-tugas repetitif dan membantu menemukan bug.

Contoh Prompt: "Buatkan saya struktur HTML dan CSS menggunakan Tailwind untuk sebuah kartu artikel yang memiliki gambar di bagian atas, serta judul dan deskripsi di bagian bawah."

Dampak: Mempercepat pengembangan antarmuka (UI) dan memungkinkan saya untuk lebih fokus pada logika fungsionalitas.
