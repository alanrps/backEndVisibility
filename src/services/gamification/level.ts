import knex from '../../../database';

interface Level {
    id?: number,
    description: string,
    points: number,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
}

interface LevelRepository {
    getData(returnData: Array<string | Object>, level?: number): Promise<Array<Level>>;
}

export class LevelService implements LevelRepository {
    getData(returnData: Array<string | Object> = ['*'], level?: number): Promise<Array<Level>>{
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
