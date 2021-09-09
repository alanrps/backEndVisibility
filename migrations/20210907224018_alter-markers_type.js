
exports.up = knex => knex.schema.alterTable('markers', table => {
    table
        .string('category_id', 50);
})
    .table('markers', table => {
        table
            .foreign('category_id')
            .references('id')
            .inTable('categories');
    });

exports.down = () => Promise.resolve();
