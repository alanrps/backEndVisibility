const { createUpdateAt, removeUpdateAt } = require('../triggers/create-update-at');


exports.up = knex => knex.schema.raw(createUpdateAt('type_markers'));

exports.down = knex => knex.schema.raw(removeUpdateAt('type_markers'));
