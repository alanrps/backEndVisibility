import knex from '../../../database';

export function createPlace(place) {
    return new Promise((resolve, reject) => knex('places')
        .insert(place)
        .then(resolve(place))
        .catch(reject));
}

export default {};
