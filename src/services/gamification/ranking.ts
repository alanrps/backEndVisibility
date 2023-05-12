import knex from '../../config/database';

interface Pagination {
    total: number,
    lastPage: number,
    perPage: number,
    currentPage: number,
    from: number,
    to: number
}

interface Ranking {
    name: string,
    weekly_points: number,
    level: number
}

interface RankingPaginate {
    ranking: Ranking,
    pagination: Pagination
}

interface RankingRepository {
    create(page: number): Promise<RankingPaginate>;
}

export class RankingService implements RankingRepository {
    create(page: number): Promise<RankingPaginate>{
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
