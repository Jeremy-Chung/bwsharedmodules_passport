/*
 * Passport - Account
 */
const requestInstance = require("../../core/request-instance");
const keycloakParser = require("./middleware/keycloak-parser");
const setTokenInHeaders = require("./middleware/set-token-header");
const isRequied = require("../../core/is-required");
const Account = require("./index");

module.exports = class Admin {
    constructor(keycloakConfig = isRequied("keycloakConfig")) {
        this.props = {
            keycloakConfig: keycloakParser(keycloakConfig),
        };

        this.account = new Account(keycloakConfig);
    }

    get keyclockConfig() {
        return this.props.keycloakConfig;
    }

    login(
        username = isRequied("username"),
        password = isRequied("password")
    ) {
        return this.account.login(username, password);
    }

    fetchRealm(accessToken = isRequied("accessToken")) {
        const { url, realm } = this.keyclockConfig;
        const instance = requestInstance(url);
        const headers = setTokenInHeaders(accessToken);

        return instance.get(
            `/admin/realms/${ realm }`, {},
            headers
        );
    }

    // REF: http://www.keycloak.org/docs-api/2.5/rest-api/#_create_a_new_user
    register(accessToken = isRequied("accessToken"), realm, payload) {
        const { url } = this.keyclockConfig;
        const instance = requestInstance(url);
        const reqHeaders = setTokenInHeaders(accessToken);

        return instance.post(
            `/admin/realms/${ realm }/users`, {
                body: payload,
            },
            reqHeaders
        );
    }

    // REF: http://www.keycloak.org/docs-api/2.5/rest-api/#_update_the_user
    updateUser(
        accessToken = isRequied("accessToken"),
        realm = isRequied("realm"),
        id = isRequied("id"),
        payload = isRequied("payload")
    ) {
        const { url } = this.keyclockConfig;
        const instance = requestInstance(url);
        const headers = setTokenInHeaders(accessToken);

        return instance.put(
            `/admin/realms/${ realm }/users/${ id }`,
            payload,
            headers
        );
    }

    // REF: https://www.keycloak.org/docs-api/2.5/rest-api/#_get_clients_belonging_to_the_realm
    fetchClientList(realm = isRequied("realm"), accessToken = isRequied("accessToken")) {
        const { url } = this.keyclockConfig;
        const instance = requestInstance(url);
        const headers = setTokenInHeaders(accessToken);

        return instance.get(
            `/admin/realms/${ realm }/clients`, {},
            headers
        );
    }

    // REF: https://www.keycloak.org/docs-api/2.5/rest-api/#_get_representation_of_the_client
    fetchClient(
        realm = isRequied("realm"),
        id = isRequied("id"),
        accessToken = isRequied("accessToken")
    ) {
        const { url } = this.keyclockConfig;
        const instance = requestInstance(url);
        const headers = setTokenInHeaders(accessToken);

        return instance.get(
            `/admin/realms/${ realm }/clients/${ id }`, {},
            headers
        );
    }

    // REF: https://www.keycloak.org/docs-api/2.5/rest-api/#_get_the_client_secret
    fetchClientSecret(
        realm = isRequied("realm"),
        id = isRequied("id"),
        accessToken = isRequied("accessToken")
    ) {
        const { url } = this.keyclockConfig;
        const instance = requestInstance(url);
        const headers = setTokenInHeaders(accessToken);

        return instance.get(
            `/admin/realms/${ realm }/clients/${ id }/client-secret`, {},
            headers
        );
    }

    // REF: https://www.keycloak.org/docs-api/2.5/rest-api/#_get_users_2
    fetchUsers({
        realm = isRequied("realm"),
        accessToken = isRequied("accessToken"),
        search,
        lastName,
        firstName,
        email,
        username,
        first = 0,
        max = 20,
    }) {
        const { url } = this.keyclockConfig;
        const instance = requestInstance(url);
        const headers = setTokenInHeaders(accessToken);
        const params = {
            search,
            lastName,
            firstName,
            email,
            username,
            first,
            max,
        };

        return instance.get(
            `/admin/realms/${ realm }/users`,
            params,
            headers
        );
    }

    fetchUser(
        userId = isRequied("userId"),
        realm = isRequied("realm"),
        accessToken = isRequied("accessToken")
    ) {
        const { url } = this.keyclockConfig;
        const instance = requestInstance(url);

        return instance.get(
            `/admin/realms/${ realm }/users/${ userId }`, {},
            setTokenInHeaders(accessToken)
        ).then(user => {

            return instance.get(
                `/admin/realms/${ realm }/users/${ userId }/role-mappings/realm`, {},
                setTokenInHeaders(accessToken)).then(roles => {
                user.roles = roles;

                return user;
            });
        });


    }

    fetchRealms(accessToken = isRequied("accessToken")) {
        const { url } = this.keyclockConfig;
        const instance = requestInstance(url);
        const headers = setTokenInHeaders(accessToken);

        return instance.get(
            "/admin/realms", {},
            headers
        );
    }

    fetchUsersByRealmRole(
        role = isRequied("role"),
        realm = isRequied("realm"),
        accessToken = isRequied("accessToken")
    ) {
        //http://dev-sld-sso1.xyz858.com:8080/auth/admin/realms/mg/roles/video-host/users?first=0&max=5
        const { url } = this.keyclockConfig;
        const instance = requestInstance(url);
        const headers = setTokenInHeaders(accessToken);

        return instance.get(
            `/admin/realms/${ realm }/roles/${ role }/users`, {},
            headers
        );
    }
};
