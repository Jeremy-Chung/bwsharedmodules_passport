/**
 * Passport
 */
const Account = require("./modules/account");
const Admin = require("./modules/account/admin");
const Wallets = require("./modules/wallets");

module.exports = {
    Account,
    Admin,
    Wallets,
};
