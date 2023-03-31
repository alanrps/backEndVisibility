import knex from '../../../database';

interface AchievementRepository {
    getByUser(userId: number, filter: string);
    add(userAchivement: unknown, returnData: Array<String> = ['*']);
}

export class AchievementService implements AchievementRepository {
    getByUser(userId: number, filter?: string){
        const query = knex
            .select({ id: 'a.id', description: 'a.description', category: 'a.category', actionsAmount: 'a.actions_amount', acquired: knex.raw('coalesce(ua.acquired, FALSE)')})
            .from({ a: 'achievements' })
            .leftJoin(({ ua: 'user_achievement' }), builder => {
                builder.on('ua.achievement_id', 'a.id');
                builder.andOn('ua.user_id', knex.raw('?', [userId]));
            })
            .whereNull('a.deleted_at')
            .orderBy('ua.acquired', 'DESC');
    
        if(filter === 'acquired')
            query
                .where('ua.acquired', true);
        else if(filter === 'notAcquired')
            query
                .where('ua.acquired', null);
    
        return query;
    }

    add(userAchivement: unknown, returnData: Array<String> = ['*']) {
        return knex('user_achievement')
            .insert(userAchivement, returnData);
    }
}
