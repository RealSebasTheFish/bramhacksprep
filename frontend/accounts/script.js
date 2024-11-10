const URL = "http://localhost:3000";
// for adding accounts
document
  .getElementById("addAccountButton")
  .addEventListener("click", function () {
    console.log("code");
  });

function hashPassword(password) {
  const hash = CryptoJS.SHA256(password);
  return hash.toString(CryptoJS.enc.Hex);
}

function linkChild() {
  const authKey = localStorage.getItem("authKey");
  // change these to dynamic values
  const childUsername = document.getElementById("childUsername").value;
  const childPassword = document.getElementById("childPassword").value;
  const childEmail = document.getElementById("childEmail").value;
  const shaPassword = hashPassword(childPassword);
  var info = {
    parent: { authKey: authKey },
    child: {
      username: childUsername,
      email: childEmail,
      password: shaPassword,
    },
  };
  $.getJSON(`${URL}/linkchild`, info, (data) => {
    console.log(data.result);
  });
}
