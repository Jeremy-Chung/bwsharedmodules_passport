# Passport
*Provides account verify and wallet access ablities.*

## Installation

### Install latest version
> npm i git+ssh://git@bb.allstar-interactive.com:7999/bg/bwsharedmodules_passport.git --save

### Install specific version
> npm i git+ssh://git@bb.allstar-interactive.com:7999/bg/bwsharedmodules_passport.git**#v1.0.0** --save

## Usage
### Account
```
const { Account } = require("passport");
const account = new Account({
    "realm": "xxx",
    "url": "http://www.xxx.com/auth",
    "clientId": "xxx-website",
    "credentials": {
        "secret": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    }
});

account.login("username", "password").then(res => {
    // Do Something
}).catch(console.error);

```
