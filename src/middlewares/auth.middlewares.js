const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require("../data/config")


function authMiddleware(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
 }
};

module.exports = authMiddleware;