const knex = require('../../../database');

function deleteUser(params) {
    return new Promise((resolve, reject) => knex({ us: 'users' })
        .whereNull('us.deleted_at')
        .andWhere('us.id', '=', params)
        .del()
        .then(resolve)
        .catch(reject));
}

module.exports = {
    deleteUser,
};

