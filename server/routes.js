import express from 'express';  
import db from './db.js';  
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
router.post('/users', async (req, res) => {
    const { full_name, username, email, phone_number, password_hash } = req.body;

    if (!full_name || !username || !email || !phone_number || !password_hash) {
        return res.status(400).json({ error: "Semua kolom harus diisi" });
    }

    try {
        const saltRounds = 10;  
        const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

        db.query('INSERT INTO users (full_name, username, email, phone_number, password_hash) VALUES (?, ?, ?, ?, ?)', 
        [full_name, username, email, phone_number, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error saat menambahkan pengguna:', err);
                return res.status(500).json({ error: "Gagal menambahkan pengguna" });
            }
            res.status(201).json({ message: "Pengguna berhasil ditambahkan", userId: result.insertId });
        });
    } catch (err) {
        console.error('Error saat hashing password:', err);
        return res.status(500).json({ error: "Gagal memproses password" });
    }
});

// Endpoint untuk menambahkan pengguna baru (POST /tasks)
router.post('/tasks', (req, res) => {
    
    const { user_id, name, date, status } = req.body;
    // res.status(200).json(res.body);

    if (!user_id || !name || !date || !status) {
        return res.status(400).json({ error: "Semua kolom harus diisi" });
    }

    db.query('INSERT INTO tasks (user_id, name, date, status) VALUES (?, ?, ?, ?)', [user_id, name, date, status], (err, result) => {
        if (err) {
            console.error('Error saat menambahkan tugas:', err);
            return res.status(500).json({ error: "Gagal menambahkan tugas" });
        }
        res.status(201).json({ message: "Tugas berhasil ditambahkan", userId: result.insertId });
    });
});

   // Endpoint login (POST /login)
   router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password harus diisi' });
    }
  
    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (err, results) => {
        if (err) {
          console.error('Error saat login:', err);
          return res.status(500).json({ error: 'Gagal memproses login' });
        }
  
        if (results.length === 0) {
          return res.status(401).json({ error: 'Email atau password salah' });
        }
  
        const user = results[0];
  
        bcrypt.compare(password, user.password_hash, (bcryptErr, isMatch) => {
          if (bcryptErr) {
            console.error('Error saat validasi password:', bcryptErr);
            return res.status(500).json({ error: 'Gagal memproses login' });
          }
  
          if (!isMatch) {
            return res.status(401).json({ error: 'Email atau password salah' });
          }

          const token = jwt.sign(
            { email: user.email },  
            process.env.ACCESS_TOKEN_SECRET,  
            { expiresIn: '1h' } 
        );

        const refreshToken = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            // secure: true, 
            path: '/api/refresh-token',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
  
          db.query(
            'INSERT INTO login (email, password) VALUES (?, ?)',
            [email, password], 
            (insertErr, insertResult) => {
              if (insertErr) {
                console.error('Error saat menyimpan data login:', insertErr);
                return res.status(500).json({ error: 'Gagal menyimpan data login' });
              }
  
              console.log('Data berhasil masuk ke tabel login:', insertResult);
  
              res.status(200).json({
                message: 'Login berhasil',
                token: token,
                user: {
                  id: user.id,
                  full_name: user.full_name,
                  username: user.username,
                  email: user.email,
                  phone_number: user.phone_number,
                },
              });
            }
          );
        });
      }
    );
  });

//   refresh token
  router.get('/refresh-token', (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token tidak ditemukan' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Refresh token tidak valid' });
        }

        const { id, email } = decoded;
        const newAccessToken = jwt.sign(
            { id, email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            accessToken: newAccessToken,
        });
    });
});

// logout
router.delete('/logout', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401); 

    const user = await Users.findAll({
        where: { refresh_token: refreshToken }
    });

    if (!user[0]) return res.sendStatus(204); 

    const userId = user[0].id;

    await Users.update({ refresh_token: null }, { where: { id: userId } });

    res.clearCookie('refreshToken');

    return res.sendStatus(200); 
});


  
export default router;
