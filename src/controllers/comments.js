import BadRequest from '../exceptions/http/BadRequest';
import PreconditionFailedException from '../exceptions/http/PreconditionFailedException';
import { getComments } from '../services/comments/search-comments';
import { createComment } from '../services/comments/insert-comment';
import { searchUserById } from '../services/users/search-user';
import { getMarkerById } from '../services/markers/get-marker';
import { convertToSnakeCase } from '../utils/convertToSnakeCase';

export function searchComments(request, response, next){
    const {
        id: markerId,
    } = request.params;

    const select = [
        'name',
        { message: 'description' },
    ];

    if(!markerId) {
        return new BadRequest(40);
    }

    return getComments(select, markerId)
        .then((comments) => response.status(200).send(comments))
        .catch(next);
}

export function insertComments(request, response, next){
    const {
        body,
    } = request;


    if(!body.userId) {
        return new BadRequest(20);
    }

    if(!body.markerId) {
        return new BadRequest(40);
    }

    const bodySnakeCase = convertToSnakeCase(body);
    const select = ['id', 'description'];

    return searchUserById(body.userId, ['id'])
        .then((user) => {
            if(!user){
                return new PreconditionFailedException(23);
            }

            return user;
        })
        .then(() => getMarkerById(['id'], body.markerId))
        .then((marker) => {
            if(!marker){
                return new PreconditionFailedException(41);
            }

            return marker;
        })
        .then(() => createComment(bodySnakeCase, select))
        .then(([comments]) => response.status(200).send(comments))
        .catch(next);
}