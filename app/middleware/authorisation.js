const { HELPER } = require('../../helpers');
const { UTILS } = require('../../utils');
const { UnauthorizedException } = require('../helpers/errorResponse');

module.exports = {
    isAuthenticated: (...allowedRoles) => {
        return async function (req, res, next) {
            try {
                var token;

                if ( req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer" )
                    token = req.headers.authorization.split(" ")[1];    
                else throw new UnauthorizedException(HELPER.RESPONSE_MESSAGES.AUTH_ERRORS.TOKEN_HEADER);

                if (!token) throw new UnauthorizedException(HELPER.RESPONSE_MESSAGES.AUTH_ERRORS.TOKEN);

                req.auth = UTILS.JWT.verifyAccessToken(token)

                    // const user = await db.UserModel.findOne({
                    //     id: decoded.id,
                    //     deletedAt: null,
                    // });

                    // if (!user) {
                    //     throw new UnauthorizedException(HELPER.RESPONSE_MESSAGES.AUTH_ERRORS.UNAUTHORIZED);
                    // }
                    // req.user = user


                if (allowedRoles.length === 0 && req.auth.role) {
                    return next()
                } else if (!allowedRoles.includes(req.auth.role)) {
                    throw new UnauthorizedException(HELPER.RESPONSE_MESSAGES.AUTH_ERRORS.UNAUTHORIZED);
                } else {
                    return next()
                }
            }
            catch (err) {
                delete req.auth;
                next(err);
                // return res.status(401).send("Unauthorized Access")
            }
        }
    },

    // validateRefreshToken:
    //     (...allowedRoles) =>
    //         async (req, res, next) => {
    //             try {
    //                 if (!req.headers.authorization) throw new UnauthorizedException(HELPER.RESPONSE_MESSAGES.AUTH_ERRORS.TOKEN_HEADER);

    //                 const token = req.headers.authorization.split(' ')[1]; // Extracting Bearer token from header.s
    //                 if (!token) throw new UnauthorizedException(HELPER.RESPONSE_MESSAGES.AUTH_ERRORS.TOKEN);
    //                 const decoded = await UTILS.JWT.verifyRefreshToken(token);

    //                 if (allowedRoles.includes(decoded.role)) {
    //                     req.user = decoded;
    //                     next();
    //                 } else {
    //                     throw new UnauthorizedException(HELPER.RESPONSE_MESSAGES.AUTH_ERRORS.UNAUTHORIZED);
    //                 }
    //             } catch (error) {
    //                 next(error);
    //             }
    //         },

};
