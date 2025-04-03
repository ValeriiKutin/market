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
/* manipulate with sportstuff*/
app.get('/sportstuff', (req, res) => {
    const query = "SELECT * FROM sportstuff";

    db.query(query, (err, data) => {
        if (err) return res.json(err)

        return res.json(data);
    })
})


app.post('/sportstuff', upload.single("image"), (req, res) => {
    console.log("Received data:", req.body);
    console.log("Received file:", req.file);

    const imageUrl = req.file ? `http://localhost:8800/uploads/${req.file.filename}` : null;

    const query = 'INSERT INTO sportstuff (`article`,`title`, `description`, `price`, `image`, `category`, `characteristics`, `sizeS`, `sizeM`, `sizeL`, `sizeXL`, `sizeXXL`) VALUES (?)';

    const values = [
        req.body.article,
        req.body.title,
        req.body.description,
        req.body.price,
        imageUrl,
        req.body.category,
        req.body.characteristics,
        req.body.sizeS || null,
        req.body.sizeM || null,
        req.body.sizeL || null,
        req.body.sizeXL || null,
        req.body.sizeXXL || null,
    ];

    db.query(query, [values], (err, data) => {
        if (err) return res.json(err)

        return res.json('Product has been create.');
    })
})
/* manipulate with sportstuff*/
/* ------------------------------------------------------------------- */
/* users table */
app.get('/users', (req, res) => {
    const { uid } = req.query;

    if (uid) {
        const query = "SELECT * FROM users WHERE uid = ?";
        db.query(query, [uid], (err, data) => {
            if (err) return res.json(err);
            if (data.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(data);
        });
    } else {
        const query = "SELECT * FROM users";
        db.query(query, (err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        });
    }
});

app.post('/users', (req, res) => {

    const query = 'INSERT INTO users (`displayName`, `email`, `photoURL`, `role`, `uid`) VALUES (?)';

    const values = [
        req.body.displayName,
        req.body.email,
        req.body.photoURL,
        req.body.role,
        req.body.uid
    ];

    db.query(query, [values], (err, data) => {
        if (err) return res.json(err)

        return res.json('User has been add.');
    })
})
/* users table */