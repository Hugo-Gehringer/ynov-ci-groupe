const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');
const cors = require('cors');
var connection = mysql.createConnection({
    user: 'root',
    password: 'pwd',
    database: 'ynov_ci'
});

const app = express();
const port = 3000;
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.json());
app.use(cors())

// Create User table
db.serialize(() => {
    db.run(`CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    birthDate TEXT,
    city TEXT,
    postalCode TEXT
  )`);
});

// Create a new user
app.post('/users', (req, res) => {
    console.log(req.body)
    const { firstName, lastName, email, birthDate, city, postalCode } = req.body;
    const stmt = db.prepare(`INSERT INTO User (firstName, lastName, email, birthDate, city, postalCode) VALUES (?, ?, ?, ?, ?, ?)`);
    stmt.run(firstName, lastName, email, birthDate, city, postalCode, function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).send({ id: this.lastID });
    });
    stmt.finalize();
});

// List all users
app.get('/users', (req, res) => {
    db.all(`SELECT * FROM User`, [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});