
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('levels').del()
    .then(function () {
      // Inserts seed entries
      return knex('levels').insert([
        {description: "Contribuidor Júnior", points: 0},
        {description: "Contribuidor Ferro", points: 15},
        {description: "Contribuidor Bronze", points: 75},
        {description: "Contribuidor Prata", points: 250},
        {description: "Contribuidor Ouro", points: 500},
        {description: "Contribuidor Platina", points: 1500},
        {description: "Contribuidor Diamante 1", points: 5000},
        {description: "Contribuidor Diamante 2 ", points: 15000},
        {description: "Contribuidor Diamante 3", points: 50000},
        {description: "Contribuidor Mestre", points: 100000},
      ]);
    });
};
