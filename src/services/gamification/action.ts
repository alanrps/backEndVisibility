import knex from '../../config/database';

interface Action {
    id?: number
    points: number,
    description: string,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
}

interface ActionRepository {
    get(returnData: Array<string>, action: string): Promise<Array<Action>>;
}

export class ActionService implements ActionRepository {
    get(returnData: Array<string> = ['*'], action?: string): Promise<Array<Action>> {
        const query = knex
            .select(returnData)
            .from({ a: 'actions' })
            .whereNull('a.deleted_at');
    
        if(action)
            query
                .where('l.id', action);
    
        return query;
    }
}