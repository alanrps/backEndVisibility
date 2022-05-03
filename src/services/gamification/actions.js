import knex from '../../../database';

export function searchAction(select = ['*'], action){
    const query = knex
        .select(select)
        .from({ a: 'actions' })
        .whereNull('a.deleted_at');

    if(action)
        query
            .where('l.id', action);

    return query;
}