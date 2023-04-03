import knex from "../../database";

enum Gender {
    'MALE',
    'FEMALE',
    'OTHER'
}

interface User {
    id?: number,
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

interface UserRepository {
    delete(id: number): Promise<boolean>;
    create(user: User, returnData: Array<string>): Promise <User>;
    getById(id: number, returnData: Array<string>): Promise<User | null>;
    getByEmail(email: string, returnData: Array<string>): Promise<User | null>;
    updateById(id: number, user: User, returnData: Array<string>): Promise<User | null>;
}

export class UserService implements UserRepository {
    create(user: User, returnData: Array<string> = ['id']) : Promise<Array<User>> {
        return new Promise((resolve, reject) => knex('users')
            .insert(user, returnData)
            .then(resolve)
            .catch(reject));
    }

    updateById(id: number, user: User, returnData: Array<string> = ['id']): Promise<Array<User>> {
        return new Promise((resolve, reject) => knex({ us: 'users' })
            .update(user, returnData)
            .whereNull('us.deleted_at')
            .andWhere('us.id', '=', id)
            .then(resolve)
            .catch(reject));
    }

    getById(id: number, returnData: Array<string> = ['*']): Promise<Array<User>> {
        return new Promise((resolve, reject) => knex({ us: 'users' })
            .select(returnData)
            .where('us.id', '=', id)
            .whereNull('us.deleted_at')
            .then(resolve)
            .catch(reject));
    }

    getByEmail(email: string, returnData: Array<string> = ['*']): Promise<Array<User>> {
        return new Promise((resolve, reject) => knex({ us: 'users' })
            .select(returnData)
            .where('us.email', '=', email)
            .whereNull('us.deleted_at')
            .then(resolve)
            .catch(reject));
    }

    delete(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => knex({ us: 'users' })
            .whereNull('us.deleted_at')
            .andWhere('us.id', '=', id)
            .del()
            .then(resolve)
            .catch(reject));
    }
}