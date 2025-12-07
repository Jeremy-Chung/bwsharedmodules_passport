/*
 * Passport - Account
 */
const requestInstance = require("../../core/request-instance");
const keycloakParser = require("./middleware/keycloak-parser");
const isRequied = require("../../core/is-required");
const setTokenInHeaders = require("./middleware/set-token-header");

module.exports = class Account {
    constructor(keycloakConfig, accessToken = "") {
        this.props = {
            accessToken,
            keycloakConfig: keycloakParser(keycloakConfig),
        };
    }

    set token(accessToken) {
        this.props.accessToken = accessToken;
    }

    get token() {
        return this.props.accessToken;
    }

    get keyclockConfig() {
        return this.props.keycloakConfig;
    }

    login(
        username = isRequied("username"),
        password = isRequied("password")
    ) {
        const {
            url,
            realm,
            clientId,
            secret,
        } = this.keyclockConfig;
        let realUrl = url
        if (url === "http://dev-sld-sso1.xyz858.com/auth") {
            realUrl = "http://dev-sld-sso1.xyz858.com:8080/auth";
        }

        const instance = requestInstance(realUrl);
        return instance.post(
            `/realms/${ realm }/protocol/openid-connect/token`, {
                username,
                password,
                client_id: clientId,
                client_secret: secret,
                grant_type: "password",
            }
        ).then(response => {
            // Must assign token first
            this.token = response.accessToken;

            return this.userInfo(response.accessToken)
                .then(userInfo => Object.assign(response, userInfo));
        });
    }

    logout(id = isRequied("id")) {
        const { url, realm } = this.keyclockConfig;
        const instance = requestInstance(url);
        const headers = setTokenInHeaders(this.token);

        return instance.post(
            `/admin/realms/${ realm }/users/${ id }/logout`, {},
            headers
        );
    }

    userInfo(accessToken = isRequied("accessToken")) {
        const {
            url,
            realm,
            clientId,
            secret,
        } = this.keyclockConfig;
        let realUrl = url
        if (url === "http://dev-sld-sso1.xyz858.com/auth") {
            realUrl = "http://dev-sld-sso1.xyz858.com:8080/auth";
        }
        const instance = requestInstance(realUrl);


        return instance.post(
            `/realms/${ realm }/protocol/openid-connect/token/introspect`, {
                client_id: clientId,
                client_secret: secret,
                token: accessToken,
            }
        ).then(userInfo => {
            return userInfo;
        });
    }
};
