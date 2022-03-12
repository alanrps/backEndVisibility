const { createUpdateAt, removeUpdateAt } = require('../triggers/create-update-at');

exports.up = knex => knex.schema.raw(createUpdateAt('badges'));

exports.down = knex => knex.schema.raw(removeUpdateAt('badges'));
