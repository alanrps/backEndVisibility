const knex = require('../../../database');

function updateUser(id, params) {
    const {
        name,
        phone_number,
        email,
        password,
        birth_date,
        genre,
    } = params;

    return new Promise((resolve, reject) =>
        knex({ us: 'users' })
            .update({
                name,
                phone_number,
                email,
                password,
                birth_date,
                genre,
            })
            .whereNull('us.deleted_at')
            .andWhere('us.id', '=', id)
            .then(resolve)
            .catch(reject)
    );
}

module.exports = {
    updateUser,
}