const URL = "http://42e5-2605-8d80-66a-9612-457f-de57-5b09-3c63.ngrok-free.app";
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
