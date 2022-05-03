import knex from '../../../database';

export function searchCurrentLevelData(select = ['*'], level){
    const query = knex
        .select(select)
        .from({ l: 'levels' })
        .whereNull('l.deleted_at');

    if(level)
        query
            .where('l.id', level);

    return query;
}