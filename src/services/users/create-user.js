const knex = require('../../../database');

function createUser(params){
    return new Promise((resolve, reject) => 
        knex('users')
            .insert(params)
            .then(resolve)
            .catch(reject)
    );
};

module.exports = {
    createUser,
};
