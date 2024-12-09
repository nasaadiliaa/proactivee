import express from 'express';
// import cors from 'cors';
import router from './routes.js'; // Menggunakan import sesuai dengan ekspor default
import db from './config/database.js';
// import router from './routes/index.js';

const app = express();
const port = 8083;

const startServer = async () => {
    try {
        await db.authenticate();
        console.log('Database connected..');
        // await Users.sync();
    } catch (error) {
        console.error(error);
    }
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use('/', router);
    // app.use(cors());
    // app.use(express.json()); // Middleware untuk parsing JSON
    // app.use('/api', router);  // Gunakan router yang sudah dibuat

    // app.get('/', (req, res) => {
    //     res.send('Halo dari server kami!');
    // });

    app.listen(port, () => {
        console.log(`Server mendengarkan pada port ${port}`);
    });
};

startServer();  // Panggil fungsi async startServer untuk menjalankan server
