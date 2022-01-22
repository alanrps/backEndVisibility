const knex = require('../../../database');

export function updateMarker(id, params) {
    const {
        name,
        email,
        password,
        gender,
        birth_date: birthDate,
        phone_number: phoneNumber,
    } = params;

    return new Promise((resolve, reject) => knex({ us: 'users' })
        .update({
            name,
            email,
            password,
            gender,
            birth_date: birthDate,
            phone_number: phoneNumber,
        })
        .whereNull('us.deleted_at')
        .andWhere('us.id', '=', id)
        .then(resolve)
        .catch(reject));
}

export default {};
