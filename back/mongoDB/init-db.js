db = db.getSiblingDB('project_db');

db.createCollection('user');

db.user.insertOne({
  first_name: "Admin",
  last_name: "Admin",
  email: "admin@admin.com",
  password: "a",
  birth_date: new Date("1990-01-01"),
  city: "Montpellier",
  postal_code: "34000",
  isAdmin: true
});

print("Admin created successfully!");
