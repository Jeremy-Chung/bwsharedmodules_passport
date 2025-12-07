/**
 * Parse and sanity check config is completed
 *
 * example:
 * {
 *   "realm": "xxx",
 *   "url": "http://xxx.xxxxxx.com/auth",
 *   "clientId": "xxx-xxxxxx",
 *   "credentials":
 *   {
 *       "secret": "xxxxxxxx-xxxx-4585-xxxx-xxxxxxxxxx"
 *   }
 * }
 */
module.exports = keycloakConfig => {
    const realKeycloakConfig = keycloakConfig;
    const {
        url, realm, clientId, credentials = {},
    } = realKeycloakConfig;
    const { secret } = credentials;
    const paramMap = {
        url,
        realm,
        clientId,
        secret,
    };
    realKeycloakConfig.secret = secret;

    Object.keys(paramMap).forEach(key => {
        if (!realKeycloakConfig[key]) {
            throw new Error(`"${ key }" is required`);
        }
    });

    return {
        url,
        realm,
        clientId,
        secret,
    };
};
