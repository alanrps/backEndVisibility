import { generatePassword } from '../utils/utils';
import { sendEmailMessage } from '../config/email';
import BadRequest from '../exceptions/http/BadRequest';
import { generateToken } from '../services/authenticate/token';
import { updateUserById } from '../services/users/update-user';
import { searchUserByEmail, searchUserById as searchUserByIdService } from '../services/users/search-user';
import { createInformationAmountByUser } from '../services/gamification/information-amount';
import { createUser as createUserService } from '../services/users/create-user';
import PreconditionFailedException from '../exceptions/http/PreconditionFailedException';
import NotFoundException from '../exceptions/http/NotFoundException';
import { comparePassword } from '../services/users/password/compare-password';
import { encryptPassword } from '../services/users/password/encrypt-password';
import { convertToSnakeCase } from '../utils/convertToSnakeCase';

export function searchUserById(request, response, next){
    const {
        id
    } = request.params;

    const atributtes = [ 'id', 'name', 'phone_number', 'birth_date'];

    if(!id){
        return new BadRequest(20);
    }

    return searchUserByIdService(id, atributtes)
        .then(([user]) => {
            if(!user){
                return new NotFoundException(23);
            }

            return user;
        })
        .then(user => response.status(200).send(user))
        .catch(next);
}


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
        .then(() => createUserService(bodySnakeCase, ['id', 'birth_date', 'name', 'phone_number', 'email', 'gender']))
        .then(([userData]) => createInformationAmountByUser({ user_id: userData.id }) 
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
            id: userId,
        },
        body: userData,
    } = request;

    const {
        name,
        phone_number,
        birth_date,
    } = convertToSnakeCase(userData);

    return searchUserByIdService(userId)
        .then(([user]) => {
            if (!user) {
                throw new PreconditionFailedException(23);
            }
            return user;
        })
        .then(() => updateUserById(userId, { name, phone_number, birth_date }, ['id', 'name', 'phone_number', 'email', 'birth_date', 'gender']))
        .then(([updatedUser]) => response.status(200).send(updatedUser))
        .catch(next);
}

export function updatePassword(request, response, next) {
    const {
        params: {
            user_id: userId,
        },
        body: {
            currentPassword: current_password,
            newPassword: new_password,
        },
    } = request;

    return searchUserByIdService(userId)
        .then(([user]) => {
            if (!user) {
                throw new PreconditionFailedException(23);
            }

            return user;
        })
        .then(user => {
            return comparePassword(current_password, user.password)
                .then(comparisonResult => {
                    if (!comparisonResult) throw new PreconditionFailedException(4);

                    return comparisonResult;
                });
        })
        .then(() => encryptPassword(new_password))
        .then(hashPassword => updateUserById(userId, {
            password: hashPassword,
        }))
        .then(() => response.status(204).send({}))
        .catch(next);
}


export function recoveryPassword(request, response, next) {
    const {
        params: {
            email,
        }
    } = request;

    return searchUserByEmail(email)
        .then(user => {
            if (!user) {
                throw new PreconditionFailedException(23);
            }
            return user;
        })
        .then(([user]) => {
            return Promise
                .resolve()
                .then(() => generatePassword())
                .then(newPassword => {
                    return encryptPassword(newPassword)
                        .then(hashPassword => updateUserById(user.id, {
                            password: hashPassword,
                        }, ["password"]))
                        .then(([{ password }]) => ({ ...user, password, new_password: newPassword }))
                })
        })
        .then(user => sendEmailMessage(user.email, user.new_password))
        .then(() => response.status(204).send({}))
        .catch(next);
}

export default {};

