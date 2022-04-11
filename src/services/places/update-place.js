const knex = require('../../../database');

export function updatePlace(id, params, select = ['*']) {
    return new Promise((resolve, reject) => knex({ p: 'places' })
        .returning(select)
        .update(params)
        .where('p.marker_id', id)
        .whereNull('p.deleted_at')
        .then(resolve)
        .catch(reject));
}