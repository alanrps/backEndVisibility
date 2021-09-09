
exports.up = knex => knex.schema.alterTable('places', table => {
    table
        .dropForeign('category_id');
    table
        .dropColumn('category_id');
});

exports.down = () => Promise.resolve();
