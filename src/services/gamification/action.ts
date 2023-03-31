import knex from '../../../database';

interface ActionRepository {
    get(returnData: Array<string> = ['*'], action: string);
}

export class ActionService implements ActionRepository {
    async get(returnData: Array<string> = ['*'], action?: string){
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