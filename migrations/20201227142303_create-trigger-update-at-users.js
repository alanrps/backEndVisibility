const { createUpdateAt, removeUpdateAt } = require('../triggers/create-update-at');

exports.up = knex => knex.schema.raw(createUpdateAt('users'));

exports.down = knex => knex.schema.raw(removeUpdateAt('users'));
