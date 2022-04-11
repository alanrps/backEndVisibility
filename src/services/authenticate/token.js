import { sign } from 'jsonwebtoken';

const {
    SECRET,
} = process.env;

export function generateToken(userData) {
    const {
        id,
        email,
        name,
        phone_number: phoneNumber,
    } = userData;

    return sign({
        id,
        email,
        name,
        phone_number: phoneNumber,
    }, SECRET, {
        expiresIn: 172800,
    });
}

export default {};
