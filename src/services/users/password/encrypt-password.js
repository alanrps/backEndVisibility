const bcrypt = require('bcrypt');

function encryptPassword(password) {
    const saltRounds = 10;

    return new Promise((resolve, reject) =>
        genSalt(saltRounds)
            .then((saltRounds) => bcrypt.hash(password, saltRounds))
            .then(resolve)
            .catch(reject)
    );
}

module.exports = {
    encryptPassword,
};