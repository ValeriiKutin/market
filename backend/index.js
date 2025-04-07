import express from 'express'
import mysql2 from 'mysql2'
import cors from 'cors'
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));


const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

const PORT = process.env.PORT || 8800;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.listen(PORT, () => {
    console.log('Connected to backend server!');
})
/* manipulate with sportstuff*/
app.get('/sportstuff', (req, res) => {
    const { id } = req.query;
    const query = id
        ? "SELECT * FROM sportstuff WHERE id = ?"
        : "SELECT * FROM sportstuff";

    db.query(query, id ? [id] : [], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) {
            return res.status(404).json({ message: "sportstuff not found" });
        }
        return res.json(data);
    });
});

app.post('/sportstuff', upload.single("image"), (req, res) => {
    console.log("Received data:", req.body);
    console.log("Received file:", req.file);

    const imageUrl = req.file ? `${BASE_URL}/uploads/${req.file.filename}` : null;

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
/* delete product */
app.delete("/sportstuff/:id", (req, res) => {
    //отримує значення параметра id з URL
    const sportstuffId = req.params.id;
    //створюється SQL запит для видалення книги
    //знак питання "?" в запиті для безпеки в нього буде підставлено значення з [bookId] 
    const q = "DELETE FROM sportstuff WHERE id = ?";
    db.query(q, [sportstuffId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Product has been delete successfully")
    });
})
/* delete product */
/* updating product */
app.put('/sportstuff/:id', (req, res) => {
    const sportStuffId = req.params.id;
    const query = "UPDATE sportstuff SET `article` = ?, `title` = ?, `price` = ?, `image` = ?, `category` = ?, `characteristics` = ?, `sizeS` = ?, `sizeM` = ?, `sizeL` = ?, `sizeXL` = ?, `sizeXXL` = ? WHERE id = ?"

    const values = [req.body.article, req.body.title, req.body.price, req.body.image, req.body.category, req.body.characteristics, req.body.sizeS, req.body.sizeM, req.body.sizeL, req.body.sizeXL, req.body.sizeXXL];

    db.query(query, [...values, sportStuffId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Product has been update successfully!")
    })
})
/* updating product */