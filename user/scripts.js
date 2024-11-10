const URL = "http://localhost:3000";

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

function seccessCallback(position) {
  // console.log(position.coords);

  $.getJSON(
    `${URL}/get-location`,
    JSON.parse(JSON.stringify(position)),
    (data) => {
      console.log(data);
    }
  );
}

function errCallback(error) {
  $.getJSON(`${URL}/get-location`, { error: error.message }, (data) => {
    console.log(data);
  });
}

const watchId = navigator.geolocation.watchPosition(
  seccessCallback,
  errCallback
);
