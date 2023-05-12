import knex from '../../config/database';

interface Achievement {
    id?: string,
    description: string,
    actions_amount: number,
    category: string,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
}

interface AchievementRepository {
    getByUser(userId: number, filter?: string): Promise<Array<Achievement>>;
    // TODO - ENCONTRAR TYPE PARA UNKNOWN
    add(userAchivement: unknown, returnData: Array<string>): Promise<Array<Achievement>>;
}

export class AchievementService implements AchievementRepository {
    // TODO - verificar retorno do knex, sem await ou promises
    getByUser(userId: number, filter?: string): Promise<Array<Achievement>>{
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

    add(userAchivement: unknown, returnData: Array<string> = ['*']): Promise<Array<Achievement>>{
        return knex('user_achievement')
            .insert(userAchivement, returnData);
    }
}
