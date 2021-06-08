
exports.seed = function(knex) {
  return knex('categories').del()
    .then(function () {
      return knex('categories').insert([
        {id: 'TRAVEL', description: 'Categoria de viagem'},
        {id: 'CLOTHING', description: 'Categoria de vestuário'},
        {id: 'TRANSPORT', description: 'Categoria de transporte'},
        {id: 'SUPERMARKET', description: 'Categoria de supermercado'},
        {id: 'SERVICES', description: 'Categoria de serviços'},
        {id: 'LEISURE', description: 'Categoria de lazer'},
        {id: 'ELETRONICS', description: 'Categoria de eletrônicos'},
        {id: 'EDUCATION', description: 'Categoria de educação'},
        {id: 'OTHERS', description: 'Categoria de outros'},
      ]);
    });
};
