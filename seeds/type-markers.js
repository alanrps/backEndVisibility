
exports.seed = function(knex) {
  return knex('type_markers').del()
    .then(function () {
      return knex('type_markers').insert([
        {id: 'PLACE', details: 'Marcação de lugar'},
        {id: 'WHEELCHAIR_PARKING', details: 'Marcação para vaga para cadeirante'},
        {id: 'ABSENCE_RAMP', details: 'Marcação para falta de rampa'}
      ]);
    });
};
