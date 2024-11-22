import jwt from "jsonwebtoken";

export const createJwt = async (userId) => {
    return new Promise((res, rej) => {
        jwt.sign({ userId }, "secret", { expiresIn: "1h"}, (err, token) => {
            if (err) {
                rej.apply(err);
            }
            res(token);
        });
    });
};