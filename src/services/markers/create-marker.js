const knex = require('../../../database');

function createMarker(params){
    return new Promise((resolve, reject) => 
        knex('markers')
            .insert(params)
            .then(resolve(params))
            .catch(reject)
    );
};

module.exports = {
    createMarker,
};
