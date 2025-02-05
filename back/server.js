const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc'); // Add this line
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require('dotenv').config({path: '.env'});
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const dbUri = process.env.MONGO_DBURL;
let server;
mongoose.connect(dbUri)


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
    email: {type: String, unique: true},
    password: String,
    birthDate: Date,
    city: String,
    postalCode: String,
    isAdmin: Boolean
});

const User = mongoose.model('Users', userSchema);

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./server.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// Endpoint pour créer un nouvel utilisateur (enregistre le mot de passe haché)
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               city:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */
app.post('/users', async (req, res) => {
    const {firstName, lastName, email, password, birthDate, city, postalCode, isAdmin} = req.body;

    try {
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            birthDate,
            city,
            postalCode,
            isAdmin
        });

        const user = await newUser.save();
        res.status(201).json({id: user._id});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Endpoint pour lister tous les utilisateurs (sans le mot de passe)
/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   birthDate:
 *                     type: string
 *                     format: date
 *                   city:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *                   isAdmin:
 *                     type: boolean
 *       500:
 *         description: Internal server error
 */
app.get('/users', (req, res) => {
    User.find({}, '-password') // Exclut le champ password
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({error: err.message}));
});

// Endpoint pour obtenir un utilisateur par ID (sans le mot de passe)
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 birthDate:
 *                   type: string
 *                   format: date
 *                 city:
 *                   type: string
 *                 postalCode:
 *                   type: string
 *                 isAdmin:
 *                   type: boolean
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    User.findById(userId, '-password') // Exclut le champ password
        .then(user => {
            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json({error: err.message}));
});

// Endpoint pour mettre à jour un utilisateur
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               city:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const {firstName, lastName, email, password, birthDate, city, postalCode, isAdmin} = req.body;

    User.findById(userId)
        .then(async user => {
            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }
            user.password = password;
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
        .catch(err => res.status(500).json({error: err.message}));
});

// Endpoint pour supprimer un utilisateur
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }
            res.status(200).json({message: 'User deleted successfully'});
        })
        .catch(err => res.status(500).json({error: err.message}));
});

// Endpoint pour la connexion
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        if (password !== user.password) {
            return res.status(401).json({error: 'Invalid email or password'});
        }
        const {password: _, ...userWithoutPassword} = user.toObject();
        res.status(200).json(userWithoutPassword);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

if (process.env.NODE_ENV !== 'test') {
    server = app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}
module.exports = {app, server};