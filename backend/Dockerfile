# 1. Gunakan 'image' resmi Node.js sebagai dasarnya
FROM node:18

# 2. Tentukan folder kerja di dalam container
WORKDIR /app

# 3. Copy file package.json (daftar library) ke dalam container
COPY package*.json ./

# 4. Install semua library yang ada di package.json
RUN npm install

# 5. Copy seluruh sisa kode backend (app.js, dll) ke dalam container
COPY . .

# 6. Kasih tahu Docker kalau aplikasi ini jalan di port 3000
EXPOSE 3000

# 7. Perintah untuk menjalankan aplikasi lu
CMD ["node", "app.js"]