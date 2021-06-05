const jwt = require('jsonwebtoken');
const {
    SECRET,
} = process.env;

function verifyJwt(request, response, next) {
    const headerToken = request.headers['x-acess-token'];
    if (!headerToken) return response.status(401).send({ auth: false, message: 'No token provided' });

    const parts = authHeader.split(' ');

    if (!parts.lenght === 2) return response.status(401).send({ auth: false, message: 'Token error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) return response.status(401).send({ auth: false, message: 'Token mal formatted' });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return response.status(401).send({ auth: false, message: 'Token invalid' });

        request.userId = decoded.id;
        next();
    })
}

module.exports = {
    verifyJwt,
}