import { sign } from 'jsonwebtoken';
const { SECRET } = process.env;

interface User {
    id: number,
    email: string,
    name: string,
    phone_number: string
}

interface Token {
    generate(userData: User);
}

export class TokenService implements Token {
    generate(userData: User) {
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
}
