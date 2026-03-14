const env = process.env.NODE_ENV;

const map = {
    dev: {
        baseUrl: "http://redis-wallet-float:7778",
    },

    qa: {
        baseUrl: "http://de1-wgl-wlt.allstar-interactive.com:7777",
    },

    staging: {
        baseUrl: "http://de1-wgl-wlt.allstar-interactive.com:7777",
    },

    production: {
        baseUrl: "http://de1-wgl-wlt.allstar-interactive.com:7777",
    },
};

module.exports = map[env] || map.dev;

