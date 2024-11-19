const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

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
    password: String,
    birthDate: Date,
    city: String,
    postalCode: String,
    isAdmin: Boolean
});

const User = mongoose.model('user', userSchema);

// Endpoint pour créer un nouvel utilisateur (enregistre le mot de passe haché)
app.post('/users', async (req, res) => {
    const { firstName, lastName, email, password, birthDate, city, postalCode, isAdmin } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,  // Enregistre le mot de passe haché
            birthDate,
            city,
            postalCode,
            isAdmin
        });

        const user = await newUser.save();
        res.status(201).json({ id: user._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint pour lister tous les utilisateurs (sans le mot de passe)
app.get('/users', (req, res) => {
    User.find({}, '-password') // Exclut le champ password
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Endpoint pour obtenir un utilisateur par ID (sans le mot de passe)
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    User.findById(userId, '-password') // Exclut le champ password
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// Endpoint pour mettre à jour un utilisateur
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, email, password, birthDate, city, postalCode, isAdmin } = req.body;

    User.findById(userId)
        .then(async user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (password) {
                user.password = await bcrypt.hash(password, 10); // Hache le nouveau mot de passe s'il est fourni
            }
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.birthDate = birthDate;
            user.city = city;
            user.postalCode = postalCode;
            user.isAdmin = isAdmin;

            return user.save();
        })
        .then(updatedUser => res.status(200).json(updatedUser))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Endpoint pour supprimer un utilisateur
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

// Endpoint pour la connexion
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Exclut le mot de passe du résultat
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json(userWithoutPassword);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
