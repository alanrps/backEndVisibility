const bcrypt = require('bcrypt');

function comparePassword(password, encryptPassword) {
    return new Promise((resolve, reject) => bcrypt.compare(password, encryptPassword)
        .then(resolve)
        .catch(reject));
}

module.exports = {
    comparePassword,
};
