
exports.up = function (knex) {
    return knex.schema.createTable('type_markers', table => {
        table
            .string('id', 50)
            .primary()
            .notNull();
        table
            .string('details', 100)
            .notNull();
        table
            .enum('deficiency', ['PHYSICS', 'AUDITORY', 'VISUAL'])
            .defaultTo(null);
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
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('type_markers');
};
