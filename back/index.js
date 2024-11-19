const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connexion à MongoDB
const dbUri = 'mongodb://admin:password@localhost:27017/project_db?authSource=admin';

mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

// Définir le modèle User avec Mongoose
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    birthDate: Date,
    city: String,
    postalCode: String,
});

const User = mongoose.model('user', userSchema);

// Create a new user
app.post('/users', (req, res) => {
    const { firstName, lastName, email, birthDate, city, postalCode } = req.body;

    const newUser = new User({
        firstName,
        lastName,
        email,
        birthDate,
        city,
        postalCode,
    });

    newUser.save()
        .then(user => res.status(201).json({ id: user._id }))
        .catch(err => res.status(500).json({ error: err.message }));
});

// List all users
app.get('/users', (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Get a user by ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// Update a user
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, email, birthDate, city, postalCode } = req.body;

    User.findByIdAndUpdate(userId, { firstName, lastName, email, birthDate, city, postalCode }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
