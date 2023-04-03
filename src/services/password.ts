import bcrypt from 'bcrypt';

interface PasswordRepository {
    compare(password: string, encryptPassword: string): Promise<boolean>;
    encrypt(password: string): Promise<string>;
    generate(): string;
}

export class PasswordService implements PasswordRepository {
    compare(password: string, encryptPassword: string): Promise<boolean> {
        return new Promise((resolve, reject) => bcrypt.compare(password, encryptPassword)
            .then(resolve)
            .catch(reject));
    }

    encrypt(password: string): Promise<string> {
        const rounds = 10;
    
        return new Promise((resolve, reject) => bcrypt.genSalt(rounds)
            .then(saltRounds => bcrypt.hash(password, saltRounds))
            .then(resolve)
            .catch(reject));
    }

    generate(): string{
        return Math.random().toString(36).slice(-8);
    }
}