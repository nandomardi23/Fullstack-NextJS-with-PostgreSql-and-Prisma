# FULLSTACK NEXTJS DENGAN MENGGUNAKAN PRISMA, AXIOS DAN POSTGRE SQL

Pada kali ini saya mengimplemetasikan CRUD sederhana pada nextjs dan menggunakan join table, pada kali ini menggunakan prisma sebagai management database yang ada pada nodejs biasanya, serta menggunakan postgres sql sebagai database untuk menyimpan data

terdapat 2 table yaitu :

1. Brands
2. Products

## PostgreSql

Pada impelementasi kali saya menggunakan PostgreSql pada docker, teman teman bebas menggunakan cara teman teman masing-masing. jalan postgre pada port defaultnya yaitu 5432 dan jika teman-teman mengikuti saya dengan menggunakan docker juga maka copy command yang ada dibawah ini dan sesuaikan dengan config teman teman

```
    docker run -d \
    -e POSTGRES_PASSWORD=mypassword \
    -e POSTGRES_USER=myuser \
    -p 5432:5432 \
    --name mypostgres postgres
```

## NextJs

Saya menggunakan Nextjs sebagai framework untuk membuat aplikasi CRUD sederhana, pastikan teman-teman sudah menginstall node js pada komputer teman-teman masing-masing

```
    npx create-next-app@latest
```

setelah menggunakan command diatas untuk meginstall framework nextjs ke komputer teman-teman ikuti saja langkah-langkah yang perlukan dalam menginstall framework, perhatikan jika ada pertanyaan apakah mau menggunakan /src/ ? pilih no. dan jika ada pertanyaan apakah mau menggunakan /app/ ? pilih yes.

## DaisyUi

Serta untuk memberikan tampilan yang menarik saat menggunakan website maka saya menggunakan dasiy ui untuk memperindah tampilan website yang saya buat, pastikan saat menginstall nextjs maka kamu harus menginstall juga tailwind css pada project nextjs yang akan digunakan jikan sudah makan tinggal jalankan command yang ada dibawah ini

```
    npm i daisyui
```

Jika sudah selesai maka teman-teman wajib menambahakn config di tailwind.config.js pada bagian plugin

```
    module.exports = {
  //...
  plugins: [require("daisyui")],
}
```

## Prisma

Saya Menggunakan supayah mempermudah kita dalam membuat table brand dan product pada postgre, intinya supayah kayak laravel aja gampang untuk migration databasenya entar.

```
    npm install prisma
```

setelah selesai menginstall prisma langkah selanjut meng initializati postgres di prisma supayah prisma dapat mengakses postgres

```
    npx prisma init --datasource-provider postgres
```

setelah selesai menginitialization maka akan digenerate folder prisma dan file .env

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Brand {
  id       Int       @id @default(autoincrement())
  name     String
  products Product[]
}

model Product {
  id        Int      @id @default(autoincrement())
  title     String
  price     Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  brand     Brand    @relation(fields: [brandId], references: [id])
  brandId   Int
}
```

ikuti config ini untuk membuat table dengan menggunakan prisma

```
DATABASE_URL="postgresql://admin:admin1234@localhost:5432/next_db?schema=public"
```

pastikan env ini seprti ini yaa teman teman, jika semua sudah selesai maka teman teman bisa menjalankan command

```
npx prisma migrate dev
```

dan

```
npm run dev
```

untuk melihat hasil website yang sudah dibuat
