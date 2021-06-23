const knex = require('../../../database');

function updateUser(id, params, returnData = ['id']) {
    return new Promise((resolve, reject) => knex({ us: 'users' })
        .update(params, returnData)
        .whereNull('us.deleted_at')
        .andWhere('us.id', '=', id)
        .then(resolve)
        .catch(reject));
}

module.exports = {
    updateUser,
};
