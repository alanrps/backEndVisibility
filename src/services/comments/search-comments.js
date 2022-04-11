import knex from '../../../database';

export function getComments(select = ['*'], markerId) {
    return knex({ c: 'comments' })
        .select(select)
        .innerJoin({ m: 'markers' }, builder => {
            builder.on('c.marker_id', 'm.id');
            builder.onNull('m.deleted_at');
        })
        .innerJoin({ u: 'users' }, builder => {
            builder.on('c.user_id', 'u.id');
            builder.onNull('m.deleted_at');
        })
        .where('marker_id', markerId)
        .whereNull('m.deleted_at');
}

export default {};
