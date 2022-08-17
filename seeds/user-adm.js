
exports.seed = knex => knex('users').del()
    .then(() => knex('users').insert(
        {
            name: 'ADMIN',
            phone_number: '99808-3017',
            email: 'alansantana@alunos.utfpr.edu.br',
            password: '$2b$10$CDtj7KIHNXtY5oAaV6t8oe/cCsFSPrYIVp.VvO76uKReL8fNJTOa2', // masterkey
            birth_date: '1998-11-24',
            gender: 'MALE',
            is_admin: true,
        }, ['id'],
    ));
