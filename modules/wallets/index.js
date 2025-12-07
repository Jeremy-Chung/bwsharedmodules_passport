/*
 * Passport - Wallets
 */
const requestInstance = require("../../core/request-instance");
const walletsConfig = require("../../configs/wallets");

const { baseUrl } = walletsConfig;


module.exports = {
    info: (xMerchantId, userId, accessToken) => {
        const options = {
            method: "GET",
            uri: `${ baseUrl }/wallets/${ userId }`,
            headers: {
                "Authorization": `Bearer ${ accessToken }`,
                "x-merchant-id": xMerchantId,
            },
            json: true,
        };

        return requestInstance(options);
    },

    credits: (xMerchantId, payload = {}) => {
        const {
            walletId, amount, userId, accessToken, meta = {},
        } = payload;
        const options = {
            method: "POST",
            uri: `${ baseUrl }/credits`,
            form: JSON.stringify({
                amount,
                user_id: userId,
                wallet_id: walletId,
                product: meta,
            }),
            headers: {
                "Authorization": `Bearer ${ accessToken }`,
                "x-merchant-id": xMerchantId,
                "content-type": "application/json",
            },
            json: true,
        };

        return requestInstance(options);
    },

    debits: (xMerchantId, payload = {}) => {
        const {
            walletId, amount, userId, accessToken, meta = {},
        } = payload;
        const options = {
            method: "POST",
            uri: `${ baseUrl }/debits`,
            form: JSON.stringify({
                amount,
                user_id: userId,
                wallet_id: walletId,
                product: meta,
            }),
            headers: {
                "Authorization": `Bearer ${ accessToken }`,
                "x-merchant-id": xMerchantId,
                "content-type": "application/json",
            },
            json: true,
        };

        return requestInstance(options);
    },
};
