
exports.seed = knex => knex('categories').del()
    .then(() => knex('categories').insert([
        { id: 'TRAVEL', description: 'Categoria de viagem' },
        { id: 'TRANSPORT', description: 'Categoria de transporte' },
        { id: 'SUPERMARKET', description: 'Categoria de supermercado' },
        { id: 'SERVICES', description: 'Categoria de serviços' },
        { id: 'LEISURE', description: 'Categoria de lazer' },
        { id: 'EDUCATION', description: 'Categoria de educação' },
        { id: 'FOOD', description: 'Categoria de alimentos' },
        { id: 'HOSPITAL', description: 'Categoria de hospitais e clínicas' },
        { id: 'ACCOMMODATION', description: 'Categoria de hospedagem' },
        { id: 'FINANCE', description: 'Categoria de financias' },
    ]));
