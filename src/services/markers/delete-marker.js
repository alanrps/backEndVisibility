const knex = require('../../../database');

function deleteMarker(params){
    return new Promise((resolve, reject) =>
        knex({ mk: 'markers'})
            .whereNull('mk.deleted_at')
            .andWhere('mk.id', '=', params)
            .del()
            .then(resolve)
            .catch(reject)
    );
}

module.exports = {
    deleteMarker,
};

