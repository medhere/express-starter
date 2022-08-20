const { conn } = require('../app/databaseConnection')

const getUserPermissions = (userid) => {
    return function (req,res,next) {
        conn.select('*').from('user_permissions').where('userid', userid)
        //store in session variable
        next()
    }
}

const getAllActivePermissions = (superid, userid) => {
    var enabled_perms=[];
    conn.raw('SELECT * FROM user_permissions WHERE userid = ?',superid).then(rows =>{
        enabled_perms = rows[0]
        enabled_perms.forEach(row => {
            conn.raw('SELECT * FROM can_give_permissions WHERE userid = ? AND perm_id = ?',[userid, row.perm_id]).first().then(nextrows => {
                //if true, add active=yes to object
                //if false, add active=no to object
            }).catch(err=>{
        
            })
        });        
    }).catch(err=>{

    })

    return enabled_perms;
}

const checkRole = (userid,role) => {
    return function (req,res,next) {
        conn.raw('SELECT * FROM user_permissions WHERE userid = ? AND perm_type = ? AND perm_value = ?',[userid, 'Role', role]).first().then(rows => {
            //if yes, next()
            //if no, return false
        }).catch(err=>{

        })
    }
}

const checkAuthPermissions = (userid, ...perms) => {
    return function (req,res,next) {
        //write a where in clause using params as [...perms]
        conn.select('*').from('user_permissions').where('userid', userid).first().then(rows => {
            //if yes, next()
            //if no, return false
        }).catch(err=>{

        })
    }
}


exports.checkAuth = (...permissions) =>{
    return function (req,res,next) {
        try { 
            req.auth = jwt.verify(req.headers["authorization"].split(" ")[1] || req.cookies.auth, process.env.CRYPTO_KEY)
            // TODO: compare jwt expiry and reload perms from database in req.auth.permissions as array
            if(!permissions.includes(req.auth.role)){
                return res.status(403).send("Cannot Access This resource")
            }
        } 
        catch (err) {
            delete req.auth;
            return res.status(401).send("Invalid")
        }
        return next()
    }
}



function rolesToken(role) {
    return function(req, res, next) {
      var decoded = jwt.decode(req.token);
      if (!decoded.permissions.includes(role)) {
        res.json("Not Permitted");
      } else {
        next();
      }
    };
}


