const jwt = require('jsonwebtoken')
const { knex } = require('../../config/database')

/* A function that is used to check if a user is authenticated. It takes the request and response
object as parameters. */

const getUserPermissions = (userid) => {
    return function (req, res, next) {
        knex.select('*').from('user_permissions').where('userid', userid)
        //store in session variable
        next()
    }
}

const getAllActivePermissions = (superid, userid) => {
    var enabled_perms = [];
    knex.raw('SELECT * FROM user_permissions WHERE userid = ?', superid).then(rows => {
        enabled_perms = rows[0]
        enabled_perms.forEach(row => {
            knex.raw('SELECT * FROM can_give_permissions WHERE userid = ? AND perm_id = ?', [userid, row.perm_id]).first().then(nextrows => {
                //if true, add active=yes to object
                //if false, add active=no to object
            }).catch(err => {

            })
        });
    }).catch(err => {

    })

    return enabled_perms;
}

const checkRole = (userid, role) => {
    return function (req, res, next) {
        knex.raw('SELECT * FROM user_permissions WHERE userid = ? AND perm_type = ? AND perm_value = ?', [userid, 'Role', role]).first().then(rows => {
            //if yes, next()
            //if no, return false
        }).catch(err => {

        })
    }
}

const checkAuthPermissions = (userid, ...perms) => {
    return function (req, res, next) {
        //write a where in clause using params as [...perms]
        knex.select('*').from('user_permissions').where('userid', userid).first().then(rows => {
            //if yes, next()
            //if no, return false
        }).catch(err => {

        })
    }
}


function rolesToken(role) {
    return function (req, res, next) {
        var decoded = jwt.decode(req.token);
        if (!decoded.permissions.includes(role)) {
            res.json("Not Permitted");
        } else {
            next();
        }
    };
}


