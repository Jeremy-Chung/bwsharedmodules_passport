/**
 * Parameter is required
 */

module.exports = (name = "parameter") => {
    throw new Error(`"${ name }" is required`);
};
