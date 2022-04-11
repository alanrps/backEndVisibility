import knex from '../../../database';

export function getMarkers(select, currentPosition) {
    return knex({ m: 'markers' })
        .select(select)
        .leftJoin({ c: 'categories' }, builder => {
            builder.on('c.id', 'm.category_id');
            builder.onNull('c.deleted_at');
        })
        .whereRaw(knex.raw(`ST_Distance('${currentPosition}', "coordinates") < 500`))
        .whereNull('m.deleted_at');
}

export function getPlaceMarker(select, markerId) {
    return knex({ m: 'markers' })
        .select(select)
        .innerJoin(({ p: 'places' }), builder => {
            builder.on('m.id', 'p.marker_id');
            builder.andOnNull('p.deleted_at');
        })
        .where('m.id', markerId)
        .whereNull('m.deleted_at');
}

export function getMarkerById(select, markerId) {
    return knex({ m: 'markers' })
        .select(select)
        .where('m.id', markerId)
        .whereNull('m.deleted_at');
}

export default {};
