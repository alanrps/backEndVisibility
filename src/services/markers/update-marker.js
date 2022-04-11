const knex = require('../../../database');

export function updateMarker(id, params, select = ['*']) {
    return new Promise((resolve, reject) => knex({ m: 'markers' })
        .returning(select)
        .update(params)
        .where('m.id', id)
        .whereNull('m.deleted_at')
        .then(resolve)
        .catch(reject));
}

export default {};
