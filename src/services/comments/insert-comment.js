import knex from '../../../database';

export function createComment(comment, returnData) {
    return knex('comments')
        .insert(comment, returnData);
}

export default {};

