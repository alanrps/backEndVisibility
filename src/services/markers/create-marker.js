const knex = require('../../../database');

function createMarker(marker) {
    return new Promise((resolve, reject) => knex('markers')
        .insert(marker)
        .then(resolve(marker))
        .catch(reject));
}

module.exports = {
    createMarker,
};
