/**
 * Assgin `Authorization`
 */
const isRequied = require("../../../core/is-required");

module.exports = (token = isRequied("token")) => {
    return {
        "Authorization": `Bearer ${ token }`,
    };
};
