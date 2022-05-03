import knex from '../../../database';

export function searchAchievements(userId, filter){
    const query = knex
        .select({ id: 'a.id', description: 'a.description', category: 'a.category', actionsAmount: 'a.actions_amount', acquired: knex.raw('coalesce(ua.acquired, FALSE)')})
        .from({ a: 'achievements' })
        .leftJoin(({ ua: 'user_achievement' }), builder => {
            builder.on('ua.achievement_id', 'a.id');
            builder.andOn('ua.user_id', knex.raw('?', [userId]));
        })
        .whereNull('a.deleted_at');

    if(filter === 'acquired')
        query
            .where('ua.acquired', true);
    else if(filter === 'notAcquired')
        query
            .where('ua.acquired', null);
        
    return query;
}

export function createAcquiredAchievements(userAchivement, returnData = ['*']) {
    return knex('user_achievement')
        .insert(userAchivement, returnData);
}
