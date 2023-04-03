import { sign } from 'jsonwebtoken';
const { SECRET } = process.env;

enum Gender {
    'MALE',
    'FEMALE',
    'OTHER'
}

interface User {
    id?: number
    name: string, 
    phone_number: string,
    email: string,
    password: string,
    birth_date: Date, 
    gender: Gender,
    is_admin: boolean,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
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
