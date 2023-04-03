import knex from '../../../database';

interface InformationAmount {
    id?: number,
    user_id: number,
    points: number,
    weekly_points: number,
    level: number,
    marking: number,
    edit_evaluations: number,
    public_evaluations: number,
    private_evaluations: number,
    accessible_place: number,
    not_accessible_place: number,
    partially_accessible_place: number,
    place: number,
    wheelchair_parking: number,
    travel: number,
    transport: number,
    supermarket: number,
    services: number,
    leisure: number,
    education: number,
    food: number,
    hospital: number,
    accommodation: number,
    finance: number,
    comments: number,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
}

interface InformationAmountRepository {
    getByUser(userId: number, returnData: Array<string>): Promise<Array<InformationAmount>>;
    // TODO - Verificar o que o update retorna
    updateByUser(userId: number, informationAmount: Object = {});
    // TODO - Verificar TYPE unknown
    createByUser(params: unknown, returnData: Array<string>): Promise<Array<InformationAmount>>;
}


export class InformationAmountService implements InformationAmountRepository {
    getByUser(userId: number, returnData: Array<string | Object> = ['*']): Promise<Array<InformationAmount>>{
        return knex
            .select(returnData)
            .from({ ia: 'information_amount' })
            .leftJoin({ l: 'levels' }, builder => {
                builder.on('ia.level', 'l.id');
                builder.onNull('l.deleted_at');
            })
            .where('ia.user_id', userId)
            .whereNull('ia.deleted_at');
    }

    updateByUser(userId: number, informationAmount: Object = {}){
        return knex({ ia: 'information_amount' })
            .update(informationAmount)
            .where('ia.user_id', userId)
            .whereNull('ia.deleted_at');
    }

    createByUser(params: unknown, returnData: Array<string> = ['id']): Promise<Array<InformationAmount>>{
        return new Promise((resolve, reject) => knex('information_amount')
            .insert(params, returnData)
            .then(resolve)
            .catch(reject));
    }
}