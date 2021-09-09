const { createUpdateAt, removeUpdateAt } = require('../triggers/create-update-at');

exports.up = knex => knex.schema.raw(createUpdateAt('markers_type'));

exports.down = knex => knex.schema.raw(removeUpdateAt('markers_type'));
