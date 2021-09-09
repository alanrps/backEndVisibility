import knex from '../../../database';

export function getMarkers(select, currentPosition) {
    return knex({ m: 'markers' })
        .select(select)
        .leftJoin({ c: 'categories' }, builder => {
            builder.on('c.id', 'm.category_id');
            builder.onNull('c.deleted_at');
        })
        .whereRaw(knex.raw(`ST_Distance('${currentPosition}', "coordinates") < 50`))
        .whereNull('m.deleted_at');
}


export default {};
