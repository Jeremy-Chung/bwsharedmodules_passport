/**
 * base request
 */
const rp = require("request-promise");
const accessTokenErrorHandler = require("./token-error-handler");
const handlerCamelcase = require("./hanlder-camelcase");

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

module.exports = (baseURL) => {
    const createInstance = (method, endPoint, params, reqHeaders = {}) => {
        const realHeaders = reqHeaders;
        const options = {
            method,
            resolveWithFullResponse: true,
            uri: `${ baseURL }${ endPoint }`,
            json: true,
        };

        switch (method) {
        case GET: {
            options.qs = params;
            break;
        }
        default: {
            realHeaders["Content-Type"] = "application/json";

            if (params.body) {
                options.body = params.body;
            }
            else {
                options.form = params;
            }
        }
        }

        options.headers = realHeaders;

        return rp(options).then(response => {
            const { body = {} } = response.toJSON();

            return handlerCamelcase(body);
        }).catch(accessTokenErrorHandler);
    };

    return {
        get: (endPoint, params = {}, headers = {}) =>
            createInstance(GET, endPoint, params, headers),
        post: (endPoint, params = {}, headers = {}) =>
            createInstance(POST, endPoint, params, headers),
        put: (endPoint, params = {}, headers = {}) =>
            createInstance(PUT, endPoint, params, headers),
        delete: (endPoint, params = {}, headers = {}) =>
            createInstance(DELETE, endPoint, params, headers),
    };
};
