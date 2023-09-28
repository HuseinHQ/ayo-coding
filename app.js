const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:true }));

app.listen(port, () => console.log(`app listen to localhost:${port}`));

// LIST PATH
/**
 * 
 * /                    - landing page
 * /login               - login page
 * /register            - register page
 * 
 * /courses             - tampilkan seluruh courses
 * /courses/add         - menambah course (khusus admin)
 * /courses/:id         - menampilkan detail course
 * /course/:id/buy      - membeli course
 * /courses/:id/edit    - mengedit course (khusus admin)
 * /courses/:id/delete  - mendelete course (khusus admin)
 * 
 * /users/:id           - profile user
 * /users/:id/edit      - edit profile user
 * /users/:id/courses   - daftar course yang diambil user
 * 
 * /categories          - tampilkan list kategori
 * /categories/:id      - tampilkan
 * 
 */ 