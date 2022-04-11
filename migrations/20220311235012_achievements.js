
exports.up = knex => knex.schema.createTable('achievements', table => {
    table
        .string('id')
        .primary()
        .notNull();
    // table
    //     .integer('points')
    //     .notNull();
    table
        .string('description', 100)
        .defaultTo(null);
    table
        .integer('actions_amount')
        .notNull();
    table 
        .string('category')
        .notNull();
    table
        .dateTime('created_at')
        .notNull()
        .defaultTo(knex.raw('now()'));
    table
        .dateTime('updated_at')
        .notNull()
        .defaultTo(knex.raw('now()'));
    table
        .dateTime('deleted_at')
        .defaultTo(null);
});

exports.down = knex => knex.schema.dropTable('achievements');
