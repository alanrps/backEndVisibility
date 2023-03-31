import knex from '../../../database';

interface LevelRepository {
    getData(returnData: Array<string | Object> = ['*'], level: number);
}

export class LevelService implements LevelRepository {
    getData(returnData: Array<string | Object> = ['*'], level?: number){
        const query = knex
            .select(returnData)
            .from({ l: 'levels' })
            .whereNull('l.deleted_at');
    
        if(level)
            query
                .where('l.id', level);
    
        return query;
    }
} 
