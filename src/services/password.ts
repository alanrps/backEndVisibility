import bcrypt from 'bcrypt';

interface PasswordRepository {
    compare(password: string, encryptPassword: string): Promise<void>;
    encrypt(password: string): Promise<void>;
    generate(): string;
}

export class PasswordService implements PasswordRepository {
    compare(password: string, encryptPassword: string): Promise<void> {
        return new Promise((resolve, reject) => bcrypt.compare(password, encryptPassword)
            .then(resolve)
            .catch(reject));
    }

    encrypt(password: string): Promise<void> {
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