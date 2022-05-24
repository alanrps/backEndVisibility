import knex from '../../../database';

export function searchAmountInformation(userId, select = ['*']){
    return knex
        .select(select)
        .from({ ia: 'information_amount' })
        .leftJoin({ l: 'levels' }, builder => {
            builder.on('ia.level', 'l.id');
            builder.onNull('l.deleted_at');
        })
        .where('ia.user_id', userId)
        .whereNull('ia.deleted_at');
}

export function updateAmountInformation(userId, informationAmount = {}){
    return knex({ ia: 'information_amount' })
        .update(informationAmount)
        .where('ia.user_id', userId)
        .whereNull('ia.deleted_at');
}