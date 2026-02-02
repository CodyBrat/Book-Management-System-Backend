export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

export const authMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (req.method === 'GET') {
        return next();
    }

    if (apiKey && apiKey === 'secret-token') {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized: Missing or invalid API key' });
    }
};
