import knex from '../../../database';

interface InformationAmountRepository {
    getByUser(userId: number, returnData: Array<string> = ['*']);
    updateByUser(userId: number, informationAmount: Object = {});
    createByUser(params: unknown, returnData: Array<string> = ['id']);
}


export class InformationAmountService implements InformationAmountRepository {
    getByUser(userId: number, returnData: Array<string> = ['*']){
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

    createByUser(params: unknown, returnData: Array<string> = ['id']) {
        return new Promise((resolve, reject) => knex('information_amount')
            .insert(params, returnData)
            .then(resolve)
            .catch(reject));
    }
}