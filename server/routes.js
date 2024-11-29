const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) =>{
    res.send('ini adalah data dari express')
})

router.get('/haha', (req,res) => {
    db.query('SELECT * FROM haha', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

router.post('/haha', (req,res) => {
    const {name} = req.body;
    db.query('INSERT INTO haha (name) VALUES (?)', [name], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

module.exports = router;