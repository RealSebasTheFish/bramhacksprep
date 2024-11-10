const URL = "https://42e5-2605-8d80-66a-9612-457f-de57-5b09-3c63.ngrok-free.app";

function hashPassword(password) {
  const hash = CryptoJS.SHA256(password);
  return hash.toString(CryptoJS.enc.Hex);
}

// document.getElementById("loginBtn").addEventListener("click", function (event) {
//   event.preventDefault();
// });

function storeLoginData() {
  const loginUsernameEmail =
    document.getElementById("loginUsernameEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;
  const shaPassword = hashPassword(loginPassword);
  const user = {
    username: loginUsernameEmail,
    password: shaPassword,
  };
  $.getJSON(`${URL}/signin`, user, (data) => {
    console.log(data.result);
    if (data.result !== "Wrong info!") {
      localStorage.setItem("authKey", data.authKey);
      window.location.href = "./user.html";
    }
  });
  return false;
}

