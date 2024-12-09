// import express from 'express'; // Ganti require dengan import
// import db from './db.js'; // Ganti require dengan import

// const router = express.Router();
// // Endpoint /api
// router.get('/', (req, res) => {
//     res.send('Ini adalah data dari express');
// });

// // // Login endpoint
// // router.post('/login', async (req, res) => {
// //     const { email, hashed_password } = req.body;
// //     return res.status(200).json(email);
// //     return res.status(200).json({ email, hashed_password });

// //     // Validasi input
// //     if (!email || !hashed_password) {
// //         return res.status(400).json({ error: "Username dan password harus diisi" });
// //     }

// //     // Cari user berdasarkan email
// //     const user = users.find((u) => u.email === email);
// //     if (!user) {
// //         return res.status(404).json({ error: "Pengguna tidak ditemukan" });
// //     }

// //     // Cek password
// //     const isPasswordValid = await bcrypt.compare(hashed_password, user.password_hash);
// //     if (!isPasswordValid) {
// //         return res.status(401).json({ error: "Password salah" });
// //     }

// //     // Jika berhasil login
// //     res.status(200).json({
// //         message: "Login berhasil",
// //         user: {
// //             user_id: user.user_id,
// //             full_name: user.full_name,
// //             username: user.username,
// //             email: user.email
// //         }
// //     });
// // });


// // Endpoint /api/tasks
// router.get('/users', (req, res) => {
//     db.query('SELECT * FROM users', (err, results) => {
//         if (err) throw err;
//         res.send(results);
//     });
// });

// // Endpoint /api/tasks
// router.get('/tasks', (req, res) => {
//     db.query('SELECT * FROM tasks', (err, results) => {
//         if (err) throw err;
//         res.send(results);
//     });
// });

// // Endpoint /api/haha
// router.post('/haha', (req, res) => {
//     const { name } = req.body;
//     db.query('INSERT INTO haha (name) VALUES (?)', [name], (err, results) => {
//         if (err) throw err;
//         res.send(results);
//     });
// });

// export default router;

import express from 'express';  // Ganti require dengan import
import db from './db.js';  // Ganti require dengan import

const router = express.Router();

// Endpoint untuk mendapatkan semua pengguna (GET /users)
router.get('/users', (req, res) => {
    console.log(req.body);
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error
            ('Error saat mengambil pengguna:', err);
            return res.status(500).json({ error: "Gagal mengambil data pengguna" });
        }
        res.status(200).json(results); // Mengirimkan hasil query sebagai JSON
    });
});

// Endpoint untuk menambahkan pengguna baru (POST /users)
router.post('/users', (req, res) => {
    
    const { full_name, username, email, phone_number, password_hash } = req.body;
    // res.status(200).json(res.body);

    if (!full_name || !username || !email || !phone_number ||!password_hash) {
        return res.status(400).json({ error: "Semua kolom harus diisi" });
    }

    // Query untuk memasukkan pengguna baru ke dalam database
    db.query('INSERT INTO users (full_name, username, email, phone_number, password_hash) VALUES (?, ?, ?, ?, ?)', [full_name, username, email, phone_number, password_hash], (err, result) => {
        if (err) {
            console.error('Error saat menambahkan pengguna:', err);
            return res.status(500).json({ error: "Gagal menambahkan pengguna" });
        }
        res.status(201).json({ message: "Pengguna berhasil ditambahkan", userId: result.insertId });
    });
});

// Endpoint untuk menambahkan pengguna baru (POST /tasks)
router.post('/tasks', (req, res) => {
    
    const { user_id, name, date, status } = req.body;
    // res.status(200).json(res.body);

    if (!user_id || !name || !date || !status) {
        return res.status(400).json({ error: "Semua kolom harus diisi" });
    }


    // Query untuk memasukkan pengguna baru ke dalam database
    db.query('INSERT INTO tasks (user_id, name, date, status) VALUES (?, ?, ?, ?)', [user_id, name, date, status], (err, result) => {
        if (err) {
            console.error('Error saat menambahkan tugas:', err);
            return res.status(500).json({ error: "Gagal menambahkan tugas" });
        }
        res.status(201).json({ message: "Tugas berhasil ditambahkan", userId: result.insertId });
    });
});

export default router;
