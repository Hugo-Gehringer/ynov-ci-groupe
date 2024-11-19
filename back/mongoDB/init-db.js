db = db.getSiblingDB('project_db');

db.createCollection('user');

db.user.insertOne({
  firstName: "Admin",
  lastName: "Admin",
  email: "admin@admin.com",
  password: "a",
  birthDate: new Date("1990-01-01"),
  city: "Montpellier",
  postalCode: "34000",
  isAdmin: true
});

print("Admin created successfully!");
