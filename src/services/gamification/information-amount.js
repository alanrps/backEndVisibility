import knex from '../../../database';

export function searchAmountInformation(userId, select = ['*']){
    return knex
        .select(select)
        .from({ ia: 'information_amount' })
        .where('ia.user_id', userId)
        .whereNull('ia.deleted_at');
}

export function updateAmountInformation(userId, informationAmount = {}){
    return knex({ ia: 'information_amount' })
        .update(informationAmount)
        .where('ia.user_id', userId)
        .whereNull('ia.deleted_at');
}