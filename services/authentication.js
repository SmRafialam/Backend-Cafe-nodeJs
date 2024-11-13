require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(' ')[1]; // Extract the token

    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token", error: err.message });
        }

        // Store decoded payload in `res.locals` for access in the next middleware
        res.locals.user = decoded; 
        next(); // Move to the next middleware/route handler
    });
}

module.exports = { authenticateToken };
