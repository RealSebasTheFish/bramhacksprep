const auth = require("./auth.js");

auth.authSession("1231e9fceaa40a022bf7ccbf1dfc04233e2152fbfb8cc3352f2070ed2ea1db2b873d0c544df0a817cc2c357b5578a739").then((id) => {
    console.log(id);
}).catch((err) => {
    console.log(err);
});
