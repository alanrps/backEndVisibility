const knex = require('../../../database');

export function searchUserById(id, atributtes = ['*']) {
    return new Promise((resolve, reject) => knex({ us: 'users' })
        .select(atributtes)
        .where('us.id', '=', id)
        .whereNull('us.deleted_at')
        .then(resolve)
        .catch(reject));
}

export function searchUserByEmail(email, atributtes = ['*']) {
    return new Promise((resolve, reject) => knex({ us: 'users' })
        .select(atributtes)
        .where('us.email', '=', email)
        .whereNull('us.deleted_at')
        .then(resolve)
        .catch(reject));
}

export default {};
