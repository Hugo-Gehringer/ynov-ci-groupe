db.createUser({
    user: "admin",
    pwd: "adminpassword",
    roles: [
        {
            role: "userAdminAnyDatabase",
            db: "admin"
        }
    ]
});

db = db.getSiblingDB('ynov_ci'); // Change to your database name

db.createCollection('users');
db.users.insert({
    username: "admin",
    password: "adminpassword", // Ideally, hash the password
    role: "admin"
});