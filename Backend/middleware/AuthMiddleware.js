const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'Server misconfiguration: JWT_SECRET is not set' });
    }

    const authorization = req.headers.authorization || '';
    const [scheme, ...rest] = authorization.trim().split(/\s+/);
    const headerToken = scheme && rest.length ? rest.join(' ') : null;
    const token = headerToken || req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Session expired, please log in again' });
        }
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
};

module.exports = authMiddleware;
