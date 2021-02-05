const knex = require('../../../database');

function createUser(params){
    return new Promise((resolve, reject) => 
        knex('users')
            .insert(params)
            .then(resolve(params))
            .catch(reject)
    );
};

module.exports = {
    createUser,
};
