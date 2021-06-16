const knex = require('../../../database');

export function createUser(params, returnData = []) {
    return new Promise((resolve, reject) => knex('users')
        .insert(params, returnData)
        .then(resolve)
        .catch(reject));
}

export default {};
