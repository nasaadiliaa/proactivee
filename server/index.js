const express = require('express');
const app = express(); 
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
res.send('Halo dari server kami!');
});

app.listen(8082, () => {
console.log('server mendengarkan pada port 8082');
});