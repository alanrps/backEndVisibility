import knex from '../../../database';

interface RankingRepository {
    create(page: number);
}


export class RankingService implements RankingRepository {
    create(page: number){
        return knex
            .select(['name', 'weekly_points', 'level'])
            .from({ u: 'users' })
            .innerJoin(({ ia: 'information_amount' }), builder => {
                builder.on('ia.user_id', 'u.id');
                builder.andOnNull('u.deleted_at');
            })
            .orderBy('weekly_points', 'DESC')
            .whereNull('u.deleted_at')
            .paginate({
                perPage: 10,
                currentPage: page
            });
    }

    // generate(){
    //     return knex
    //         .select({ userId: 'm.user_id', name: 'u.name' })
    //         .count({ userCount: 'user_id' })
    //         .from({m: 'markers'})
    //         .innerJoin(({ u: 'users' }), builder => {
    //             builder.on('m.user_id', 'u.id');
    //             builder.andOnNull('u.deleted_at');
    //         })
    //         .groupBy(['m.user_id', 'u.name'])
    //         .orderBy('userCount', 'DESC')
    //         .whereNull('m.deleted_at');
    // }
} 
