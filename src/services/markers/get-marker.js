import knex from '../../../database';

export function getMarkers(select, currentPosition, filter = {}) {
    console.log(filter);

    const subqueryPlaces = knex({ m: 'markers' })
        .select('m.id')
        .leftJoin({ p: 'places' }, builder => {
            builder.on('m.id', 'p.marker_id');
            builder.onNull('p.deleted_at');
        })
        .where('m.markers_type_id', 'PLACE')
        .whereRaw(knex.raw(`ST_Distance('${currentPosition}', "coordinates") < 500`))
        .whereNull('m.deleted_at');
    
    if(filter.acessibilities)
        subqueryPlaces
            .whereIn('p.classify', filter.acessibilities);

    if(filter.categories)
        subqueryPlaces   
            .whereIn('m.category_id', filter.categories);
    
    const subqueryParking = knex({ m: 'markers' }).select('m.id')
        .where('m.markers_type_id', 'WHEELCHAIR_PARKING')
        .whereRaw(knex.raw(`ST_Distance('${currentPosition}', "coordinates") < 500`))
        .whereNull('m.deleted_at');

    const query = knex.select(select)
        .from({ m: 'markers' })
        .whereIn('m.id',subqueryParking)
        .orWhereIn('m.id', subqueryPlaces);

        return query
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
