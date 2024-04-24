exports.HELPER = {
    ERROR_HANDLER: require('./errorHandler').errorHandler,
    HTTP_CODES: require('./http_responses').HTTP_CODES,
    RESPONSE_MESSAGES: require('./http_responses').RESPONSE_MESSAGES,
    ROUTE_HANDLER: require('./routeHandler').routeHandler,
    ERROR_RESPONSES: require('./errorResponses'),
};
