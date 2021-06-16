import { sign } from 'jsonwebtoken';

const {
    SECRET,
} = process.env;

export function generateToken(userId) {
    return sign({ id: userId }, SECRET, {
        expiresIn: 172800,
    });
}

export default {};
