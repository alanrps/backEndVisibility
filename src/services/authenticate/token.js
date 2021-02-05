const jwt = require('jsonwebtoken');

const {
    SECRET,
} = process.env;

function generateToken(userId){
    return jwt.sign({id: userId}, SECRET, {
        expiresIn: 172800,
    })
}

module.exports = {
    generateToken,
}