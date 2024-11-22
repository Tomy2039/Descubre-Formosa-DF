import jwt from "jsonwebtoken";

export const validateJwt = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: "Acceso denegado, no se proporciono un token"});
    }

    try {
        const { userId } = jwt.verify(token, 'secret');
        req.userId = userId;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Token invalido'});
    }
}