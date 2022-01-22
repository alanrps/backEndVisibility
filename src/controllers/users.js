import { searchUserByEmail, searchUserById } from '../services/users/search-user';
import { updateUser as updateUserService } from '../services/users/update-user';
import { createUser as createUserService } from '../services/users/create-user';
import { generateToken } from '../services/authenticate/token';
import PreconditionFailedException from '../exceptions/http/PreconditionFailedException';
import { comparePassword } from '../services/users/password/compare-password';
import { encryptPassword } from '../services/users/password/encrypt-password';
import { convertToSnakeCase } from '../utils/convertToSnakeCase';

export function createUser(request, response, next) {
    const {
        body,
    } = request;

    const bodySnakeCase = convertToSnakeCase(body);

    const {
        email,
        password,
    } = bodySnakeCase;

    return searchUserByEmail(email)
        .then(user => {
            if (user.length) {
                throw new PreconditionFailedException(21);
            }
            return user;
        })
        .then(() => encryptPassword(password))
        .then(hashPassword => Object.assign(bodySnakeCase, { password: hashPassword }))
        .then(() => createUserService(bodySnakeCase, ['id', 'birth_date', 'name', 'phone_number', 'email', 'genre']))
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
        params: {
            user_id: userId,
        },
        body: userData,
    } = request;

    return searchUserById(userId)
        .then(user => {
            if (!user) {
                throw new PreconditionFailedException(23);
            }
            return user;
        })
        .then(() => updateUserService(userId, userData, ['id', 'name', 'phone_number', 'email', 'birth_date', 'genre']))
        .then(([updatedUser]) => response.status(200).send(updatedUser))
        .catch(next);
}

export function updatePassword(request, response, next) {
    const {
        params: {
            user_id: userId,
        },
        body: userPasswords,
    } = request;

    return searchUserById(userId)
        .then(user => {
            if (!user) {
                throw new PreconditionFailedException(23);
            }
            return user;
        })
        .then(user => comparePassword(userPasswords.current_password, user.password)
            .then(comparisonResult => {
                if (!comparisonResult) throw new PreconditionFailedException(4);

                return null;
            }))
        .then(() => encryptPassword(userPasswords.new_password))
        .then(hashPassword => updateUserService(userId, {
            password: hashPassword,
        }))
        .then(() => response.status(204))
        .catch(next);
}

export default {};

