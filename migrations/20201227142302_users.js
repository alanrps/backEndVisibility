
exports.up = knex => knex.schema.createTable('users', table => {
    table
        .bigIncrements('id');
    table
        .string('name', 100)
        .notNull();
    table
        .string('phone_number', 20)
        .notNull();
    table
        .string('email', 120)
        .notNull();
    table
        .string('password', 100)
        .notNull();
    table
        .date('birth_date')
        .notNull();
    table
        .enum('genre', ['MALE', 'FEMALE', 'OTHER'])
        .notNull();
    table
        .boolean('is_admin')
        .defaultTo(false)
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

exports.down = knex => knex.schema.dropTable('users');
