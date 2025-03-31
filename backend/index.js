import express from 'express'
import mysql2 from 'mysql2'
import cors from 'cors'
import multer from 'multer';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));


const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '321snickers123',
    database: 'marketProduct'
})

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

app.listen(8800, () => {
    console.log('Connected to backend server!');
})

app.get('/sportstuff', (req, res) => {
    const query = "SELECT * FROM sportstuff";

    db.query(query, (err, data) => {
        if (err) return res.json(err)

        return res.json(data);
    })
})

app.post('/sportstuff', upload.single("image"), (req, res) => {

    const imageUrl = req.file ? `http://localhost:8800/uploads/${req.file.filename}` : null;
    console.log(req.file);
    
    const query = 'INSERT INTO sportstuff (`title`, `description`, `price`, `image`, `category`, `characteristics`) VALUES (?)';

    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        imageUrl,
        req.body.category,
        req.body.characteristics
    ];

    db.query(query, [values], (err, data) => {
        if (err) return res.json(err)

        return res.json('Product has been create.');
    })
})

