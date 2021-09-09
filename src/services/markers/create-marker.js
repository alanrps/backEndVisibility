import knex from '../../../database';

export function createMarker(marker, returnData) {
    return knex('markers')
        .insert(marker, returnData);
}

export default {};

