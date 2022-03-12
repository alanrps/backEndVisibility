import knex from '../../../database';

export function generateRanking(){
    return knex
        .select({ userId: 'm.user_id', name: 'u.name' })
        .count({ userCount: 'user_id' })
        .from({m: 'markers'})
        .innerJoin(({ u: 'users' }), builder => {
            builder.on('m.user_id', 'u.id');
            builder.andOnNull('u.deleted_at');
        })
        .groupBy(['m.user_id', 'u.name'])
        .orderBy('userCount', 'DESC')
        .whereNull('m.deleted_at');
}