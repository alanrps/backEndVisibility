const comparePasswordService = require('../services/users/password/compare-password');
const searchUserByEmailService = require('../services/users/search-user');
const generateTokenService = require('../services/authenticate/token');

export function login(request, response, next) {
    const {
        email,
        password,
    } = request.body;

    Promise
        .resolve()
        .then(() => searchUserByEmailService.searchUserByEmail(email, ['password']))
        .then(([user]) => {
            if (!user) return response.status(412).send({ error: 'User not found' });

            return user;
        })
        .then(user => new Promise((resolve, reject) => {

            const {
                id,
                password: encryptPassword,
            } = user;

            comparePasswordService.comparePassword(password, encryptPassword)
                .then(comparisonResult => {
                    if (!comparisonResult) return response.status(401).send({ error: 'Password incorrect' });

                    return null;
                })
                .then(() => generateTokenService.generateToken(id))
                .then(resolve)
                .catch(reject);
        }))
        .then(token => response.status(200).send({ token }))
        .catch(next);
}

export default {};
