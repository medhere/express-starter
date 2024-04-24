const { HTTP_CODES, RESPONSE_MESSAGES } = require("./http_responses");

exports.routeHandler = async (req, res) => {
    res.status(HTTP_CODES.NOT_FOUND || 500).json({
        success: false,
        code: HTTP_CODES.NOT_FOUND || 500,
        message: RESPONSE_MESSAGES.ROUTE_NOT_FOUND,
        data: {},
    });
};
