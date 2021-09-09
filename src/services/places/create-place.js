import knex from '../../../database';

export function createPlace(place) {
    return knex('places')
        .insert(place);
}

export default {};
