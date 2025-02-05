const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

const testUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    password: 'password123',
    birthDate: '2000-01-01',
    city: 'TestCity',
    postalCode: '12345',
    isAdmin: false
};

describe('User API Tests', () => {
    let userId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_DBURL);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });


    it('should create a new user', async () => {
        const res = await request(app)
            .post('/users')
            .send(testUser);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        userId = res.body.id;
    });

    it('should list all users without passwords', async () => {
        const res = await request(app).get('/users');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body[0]).not.toHaveProperty('password');
    });

    it('should get a user by ID', async () => {
        const res = await request(app).get(`/users/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id', userId);
        expect(res.body).not.toHaveProperty('password');
    });

    it('should update a user', async () => {
        const updatedUser = {
            ...testUser,
            city: 'UpdatedCity',
        };

        const res = await request(app)
            .put(`/users/${userId}`)
            .send(updatedUser);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('city', 'UpdatedCity');
    });

    it('should fail to login with incorrect password', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: testUser.email,
                password: 'wrongpassword',
            });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error', 'Invalid email or password');
    });

    it('should login successfully', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: testUser.email,
                password: testUser.password,
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('email', testUser.email);
        expect(res.body).not.toHaveProperty('password');
    });

    it('should delete a user', async () => {
        const res = await request(app).delete(`/users/${userId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'User deleted successfully');

        // Verify user is deleted
        const resCheck = await request(app).get(`/users/${userId}`);
        expect(resCheck.statusCode).toBe(404);
    });
});
