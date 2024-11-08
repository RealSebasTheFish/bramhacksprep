const auth = require("./authentication/auth.js");

testCreate();

function testCreate() {
    auth.createSession(2).then((token) => {
        console.log(token);
    }).catch((err) => {
        console.log(err);
    });
}

function testAuth() {
    auth.authSession("e1cafd8b76069059ba9c44dd96699d8bfe58de69782ec98510c8bf957c0de7ab").then((id) => {
        console.log(id);
    }).catch((err) => {
        console.log(err);
    });
}



