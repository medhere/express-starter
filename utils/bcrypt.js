const bcrypt = require('bcrypt');

exports.verifyPassword = (plainPassword, hashPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hashPassword, function (err, result) {
            resolve(result);
            reject(err);
        });
    });
};

exports.generatePassword = async (password) => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
};
