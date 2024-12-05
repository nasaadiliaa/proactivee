const express = require('express');
const router = express.Router();
const db = require('./db'); // Pastikan file db.js sesuai

// Endpoint /api
router.get('/', (req, res) => {
    res.send('Ini adalah data dari express');
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, hashed_password } = req.body;
    return res.status(200).json(email);
    return res.status(200).json({ email, hashed_password });

    // Validasi input
    if (!email || !hashed_password) {
        return res.status(400).json({ error: "Username dan password harus diisi" });
    }

    // Cari user berdasarkan email
    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(404).json({ error: "Pengguna tidak ditemukan" });
    }

    // Cek password
    const isPasswordValid = await bcrypt.compare(hashed_password, user.password_hash);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Password salah" });
    }

    // Jika berhasil login
    res.status(200).json({
        message: "Login berhasil",
        user: {
            user_id: user.user_id,
            full_name: user.full_name,
            username: user.username,
            email: user.email
        }
    });
});


// Endpoint /api/tasks
router.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Endpoint /api/tasks
router.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Endpoint /api/haha
router.post('/haha', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO haha (name) VALUES (?)', [name], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

module.exports = router;
