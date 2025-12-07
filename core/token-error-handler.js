/**
 * Token validation error handler
 */
module.exports = (err) => {
    const { name, message } = err;

    if ("StatusCodeError" === name) {
        throw err;
    }
    else {
        throw new Error(message);
    }
};
