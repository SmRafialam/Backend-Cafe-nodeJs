const connection = require("../connection");
const jwt = require("jsonwebtoken");

exports.signup = (user) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT email FROM cafeUser WHERE email = ?";
        connection.query(query, [user.email], (err, results) => {
            if (err) return reject(err);

            if (results.length > 0) {
                return resolve({ status: 400, message: "Email already exists." });
            }

            const insertQuery = `
                INSERT INTO cafeUser(name, contactNumber, email, password, status, role)
                VALUES (?, ?, ?, ?, 'false', 'user')
            `;
            connection.query(insertQuery, [user.name, user.contact, user.email, user.password], (err) => {
                if (err) return reject(err);
                resolve({ status: 200, message: "Successfully Registered" });
            });
        });
    });
};

exports.login = (user) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT email, password, role, status FROM cafeUser WHERE email = ?";
        connection.query(query, [user.email], (err, results) => {
            if (err) return reject(err);

            if (results.length === 0 || results[0].password !== user.password) {
                return resolve({ success: false, status: 401, message: "Incorrect Username or Password" });
            }

            if (results[0].status === false) {
                return resolve({ success: false, status: 401, message: "Wait for Admin Approval" });
            }

            const tokenPayload = { email: results[0].email };
            const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "8h" });
            resolve({ success: true, token: accessToken });
        });
    });
};
