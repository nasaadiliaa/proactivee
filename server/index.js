const express = require('express');
const app = express(); 
const cors = require('cors');
const router = require('./routes'); // Import file route

app.use(cors());
app.use(express.json()); // Middleware untuk parsing JSON

// Gunakan route yang sudah dibuat
app.use('/api', router); 

app.get('/', (req, res) => {
    res.send('Halo dari server kami!');
});

app.listen(8082, () => {
    console.log('Server mendengarkan pada port 8082');
});
