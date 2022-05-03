exports.up = knex => knex.schema.createTable('user_achievement', table => {
    table 
        .integer('user_id')
        .notNull();
    table 
        .string('achievement_id')
        .notNull();
    table
        .boolean('acquired')
        .defaultTo(false);
    table
        .primary(['user_id', 'achievement_id']);
})
    .table('user_achievement', table => {
        table
            .foreign('user_id')
            .references('id')
            .inTable('users');
        table
            .foreign('achievement_id')
            .references('id')
            .inTable('achievements');
    });

exports.down = knex => knex.schema.dropTable('user_achievement');