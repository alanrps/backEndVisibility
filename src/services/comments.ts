import knex from '../../database';

interface Comment {
    id?: number,
    user_id: number,
    marker_id: number,
    description: string,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
}

interface CommentsRepository {
    create(comment: Comment, returnData: Array<string>): Promise<Array<Comment>>;
    getByMarkerId(returnData: Array<string>, id: number): Promise<Array<Comment>>;
}


export class CommentsService implements CommentsRepository {
    create(comment: Comment, returnData: Array<string>): Promise<Array<Comment>> {
        return knex('comments')
            .insert(comment, returnData);
    }

    getByMarkerId(returnData: Array<string | {}> = ['*'], id: number): Promise<Array<Comment>> {
        return knex({ c: 'comments' })
            .select(returnData)
            .innerJoin({ m: 'markers' }, builder => {
                builder.on('c.marker_id', 'm.id');
                builder.onNull('m.deleted_at');
            })
            .innerJoin({ u: 'users' }, builder => {
                builder.on('c.user_id', 'u.id');
                builder.onNull('m.deleted_at');
            })
            .where('marker_id', id)
            .whereNull('m.deleted_at');
    }
}