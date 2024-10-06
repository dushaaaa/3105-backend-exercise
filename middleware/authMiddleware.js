const jwt = require('jsonwebtoken');
const secretKey = "secret123"; 

const authMiddleware = (req, res, next) => {
    let token = req.headers['authorization']?.split(' ')[1]; // for Bearer token format

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized", error: err.message }); 
        }

        req.user = decoded; 
        next();
    });
};

module.exports = authMiddleware;
