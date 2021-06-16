const jwt = require('jsonwebtoken');

const {
    SECRET,
} = process.env;

export function verifyJwt(request, response, next) {
    return new Promise((resolve, reject) => {
        const headerToken = request.headers['x-acess-token'];
        if (!headerToken) return response.status(401).send({ auth: false, message: 'No token provided' });

        const parts = headerToken.split(' ');

        if (!parts.lenght === 2) return response.status(401).send({ auth: false, message: 'Token error' });

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) return response.status(401).send({ auth: false, message: 'Token mal formatted' });

        return jwt.verify(token, SECRET, (err, decoded) => {
            if (err) return response.status(401).send({ auth: false, message: 'Token invalid' });

            return resolve(decoded);
        });
    });
}

export default {};
