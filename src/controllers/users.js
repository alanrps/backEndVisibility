import { searchUserByEmail } from '../services/users/search-user';
import { updateUser as updateUserService } from '../services/users/update-user';
import { createUser as createUserService } from '../services/users/create-user';
import { encryptPassword } from '../services/users/password/encrypt-password';
import { generateToken } from '../services/authenticate/token';
import PreconditionFailedException from '../exceptions/http/PreconditionFailedException';

export function createUser(request, response, next) {
    const {
        body: params,
    } = request;

    const {
        email,
        password,
    } = params;

    return searchUserByEmail(email)
        .then(user => {
            if (user.length) {
                throw new PreconditionFailedException(21);
            }
            return user;
        })
        .then(() => encryptPassword(password))
        .then(hashPassword => Object.assign(params, { password: hashPassword }))
        .then(() => createUserService(params, ['id', 'name', 'phone_number', 'email', 'genre'])) // Add birth_date
        .then(([userData]) => Promise
            .resolve()
            .then(() => generateToken(userData))
            .then(token => Object.assign(userData, { token })))
        .then(userAndToken => response.status(201).send(userAndToken))
        .catch(next);
}

export function deleteUser(request, response, next) {
    const {
        id,
    } = request.params;

    return Promise
        .resolve(id)
        .then(deleteUser)
        .then(() => response.status(204).send({}))
        .catch(next);
}

export function updateUser(request, response, next) {
    const {
        body: params,
    } = request;

    const {
        id,
    } = request.params;

    return Promise
        .resolve()
        // Verificar se o user existe
        .then(() => updateUserService(id, params))
        .then(() => response.status(200).send({}))
        .catch(next);
}

export default {};

