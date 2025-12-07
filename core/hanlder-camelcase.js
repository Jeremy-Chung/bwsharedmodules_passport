/**
 * Camelcase handler
 */
const converter = (responseBody = {}) => {
    const realResponseBody = responseBody;
    const keys = Object.keys(realResponseBody);
    const initial = Array.isArray(realResponseBody) ? [] : {};

    return keys.reduce((res, oldKey) => {
        if (-1 === ["boolean", "string", "number"].indexOf(typeof realResponseBody[oldKey]) &&
            !Array.isArray(realResponseBody[oldKey])
        ) {
            realResponseBody[oldKey] = converter(realResponseBody[oldKey]);
        }

        const newRes = res;
        const newKeyParts = oldKey.split(/[_-]/);
        let newKey;

        if (newKeyParts.length === 1) {
            newKey = newKeyParts.join("");
        }
        else {
            newKey = newKeyParts.map((str, i) => {
                if ("" === str) {
                    return "";
                }

                if (0 === i) {
                    return str.toLowerCase();
                }

                return str.charAt(0).toUpperCase() + str.slice(1);
            }).join("");
        }

        if (Array.isArray(newRes)) {
            newRes.push(realResponseBody[oldKey]);
        }
        else {
            newRes[newKey] = realResponseBody[oldKey];
        }

        return newRes;
    }, initial);
};

module.exports = converter;
