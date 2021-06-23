import { NotFoundException } from '../exceptions/http/NotFoundException';
import { comparePassword } from '../services/users/password/compare-password';

const searchUserByEmailService = require('../services/users/search-user');
const generateTokenService = require('../services/authenticate/token');

export function login(request, response, next) {
    const {
        email,
        password,
    } = request.body;

    Promise
        .resolve()
        .then(() => searchUserByEmailService.searchUserByEmail(email, ['id', 'phone_number', 'email', 'password']))
        .then(([user]) => {
            if (!user) {
                throw new NotFoundException(23);
            }
            return user;
        })
        .then(user => new Promise((resolve, reject) => {

            const {
                password: encryptPassword,
            } = user;

            return comparePassword(password, encryptPassword)
                .then(comparisonResult => {
                    if (!comparisonResult) return response.status(401).send({ error: 'Password incorrect' });

                    return null;
                })
                .then(() => generateTokenService.generateToken(user))
                .then(resolve)
                .catch(reject);
        }))
        .then(token => response.status(200).send({ token }))
        .catch(next);
}

export default {};
