
exports.seed = knex => knex('markers_type').del()
    .then(() => knex('markers_type').insert([
        { id: 'PLACE', details: 'Marcação de lugar' },
        { id: 'WHEELCHAIR_PARKING', details: 'Marcação para vaga para cadeirante' },
        { id: 'ABSENCE_RAMP', details: 'Marcação para falta de rampa' },
    ]));
