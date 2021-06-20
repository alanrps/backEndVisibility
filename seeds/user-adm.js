
exports.seed = knex => knex('users').del()
    .then(() => knex('users').insert(
        {
            name: 'ADMIN',
            phone_number: '99808-3017',
            email: 'alansantana@alunos.utfpr.edu.br',
            password: '$2y$10$EDf2Xi2xz210pBA1z.cIf.1yoD1RLqd24JQHrQYqMhefLmUqYazGG',
            birth_date: '1998-11-24',
            genre: 'MALE',
            is_admin: true,
        },
    ));
