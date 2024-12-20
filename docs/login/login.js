const URL = "http://42e5-2605-8d80-66a-9612-457f-de57-5b09-3c63.ngrok-free.app";

//Login page frontend javascript for bramhacks (test)
function showForm(formId) {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signUpForm").style.display = "none";
  document.getElementById("forgotPasswordForm").style.display = "none";

  document.getElementById(formId).style.display = "block";
}
function hashPassword(password) {
  const hash = CryptoJS.SHA256(password);
  return hash.toString(CryptoJS.enc.Hex);
}
// store login form inputs
function storeLoginData() {
  const loginUsernameEmail =
    document.getElementById("loginUsernameEmail").value;
  const loginPassword = document.getElementById("loginPassword").value; //console.log("Login Data:", { loginUsernameEmail, loginPassword }); // checking
  const shaPassword = hashPassword(loginPassword);
  const user = {
    username: loginUsernameEmail,
    password: shaPassword,
  };
  $.getJSON(`${URL}/signin`, user, (data) => {
    localStorage.setItem("authKey", data.authKey);
    console.log(localStorage.getItem("authKey"));
    if (data.result != "Wrong Info!") {
      window.location.href = "../accounts/index.html";
    }
  });

  return false;
}

// store sign up form inputs
function storeSignUpData() {
  const signUpUsername = document.getElementById("signUpUsername").value;
  const signUpEmail = document.getElementById("signUpEmail").value;
  const signUpPassword = document.getElementById("signUpPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const accountType = document.getElementById("accountType").value;
  const shaPassword = hashPassword(signUpPassword);
  const user = {
    username: signUpUsername,
    email: signUpEmail,
    password: shaPassword,
    data: { type: accountType },
  };

  $.getJSON(`${URL}/signup`, user, (data) => {
    localStorage.setItem("authKey", data.authKey);
    console.log(localStorage.getItem("authKey"));
  });
  window.location.href = "../interactivemap/index.html";
  return false;
}

function linkChild() {
  const authKey = localStorage.getItem("authKey");
  // change these to dynamic values
  const childUsername = "wef";
  const childPassword = "we";
  const childEmail = "sdf";
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

// store forgot password input
function storeForgotPasswordData() {
  const forgotUsernameEmail = document.getElementById(
    "forgotUsernameEmail"
  ).value;
  //console.log("Forgot Password Data:", { forgotUsernameEmail }); // checking
}

// check if password and confirm password match
function checkConfirmPassword() {
  const signUpPassword = document.getElementById("signUpPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const message = document.getElementById("confirmPasswordMessage");

  if (confirmPassword && confirmPassword !== signUpPassword) {
    message.textContent = "Passwords do not match";
  } else {
    message.textContent = "";
  }
}
function openSidebar() {
  document.getElementById("sidebar").style.display = "flex";
  document.getElementById("menuBtn").setAttribute("onclick", "closeSidebar()");
}

function closeSidebar() {
  document.getElementById("sidebar").style.display = "none";
  document.getElementById("menuBtn").setAttribute("onclick", "openSidebar()");
}

// Smooth scroll animation for About Us section
document.addEventListener("scroll", function () {
  const aboutSection = document.getElementById("about");
  const sectionPosition = aboutSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (sectionPosition < screenPosition) {
    aboutSection.classList.add("visible");
  }
  if (sectionPosition > screenPosition) {
    aboutSection.classList.add("none");
  }
});
