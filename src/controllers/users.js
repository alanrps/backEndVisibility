const searchUserByIdService = require('../services/users/search-user');
const encryptPasswordService = require('../services/users/password/encrypt-password');
const createUserService = require('../services/users/create-user');
const deleteUserService = require('../services/users/delete-user');
const updateUserService = require('../services/users/update-user');

function createUser(request, response, next) {
    const {
        body: params
    } = request;


    return Promise
        .resolve()
        .then(() => {
            const {
                password,
            } = params;

            return encryptPasswordService(password)
                .then((password) => Object.assign(params.password, password));
        })
        .then(() => createUserService.createUser(params))
        .then((user) => response.status(201).send(user))
        .catch(next);
}

function deleteUser(request, response, next) {
    const {
        id,
    } = request.params;

    return Promise
        .resolve(id)
        .then(deleteUserService.deleteUser)
        .then(() => response.status(204).send({}))
        .catch(next);
}

function updateUser(request, response, next) {
    const {
        body: params,
    } = request;

    const {
        id,
    } = request.params;

    return Promise
        .resolve()
        // Verificar se o user existe
        .then(() => updateUserService.updateUser(id, params))
        .then(() => response.status(200).send({}))
        .catch(next);
}

module.exports = {
    createUser,
    deleteUser,
    updateUser,
}

