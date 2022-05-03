
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {id: "EP", points: 15, description: "Avaliação de Lugar"},
        {id: "EP200", points: 25, description: "Avaliação de Lugar com 200 caracteres"},
        {id: "EWP", points: 10, description: "Avaliação de vaga cadeirante"},
        {id: "C", points: 5, description: "Comentário"},
        {id: "EE", points: 10, description: "Edição de avaliação"}
      ]);
    });
};
