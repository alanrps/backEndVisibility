import knex from '../../../database';

export function searchCurrentLevelData(level, select = ['*']){
    return knex
        .select(select)
        .from({ l: 'levels' })
        .where('l.id', level)
        .whereNull('l.deleted_at');
}