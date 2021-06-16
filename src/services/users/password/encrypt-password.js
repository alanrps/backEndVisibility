const bcrypt = require('bcrypt');

function encryptPassword(password) {
    const rounds = 10;

    return new Promise((resolve, reject) => bcrypt.genSalt(rounds)
        .then(saltRounds => bcrypt.hash(password, saltRounds))
        .then(resolve)
        .catch(reject));
}

module.exports = {
    encryptPassword,
};
