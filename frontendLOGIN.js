//Login page frontend javascript for bramhacks (test)
function showForm(formId) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signUpForm").style.display = "none";
    document.getElementById("forgotPasswordForm").style.display = "none";
    
    document.getElementById(formId).style.display = "block";
}
// store login form inputs
function storeLoginData() {
    const loginUsernameEmail = document.getElementById("loginUsernameEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;
    //console.log("Login Data:", { loginUsernameEmail, loginPassword }); // checking 
}

// store sign up form inputs
function storeSignUpData() {
    const signUpUsername = document.getElementById("signUpUsername").value;
    const signUpEmail = document.getElementById("signUpEmail").value;
    const signUpPassword = document.getElementById("signUpPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    //console.log("Sign Up Data:", { signUpUsername, signUpEmail, signUpPassword, confirmPassword }); // checking 
}

// store forgot password input
function storeForgotPasswordData() {
    const forgotUsernameEmail = document.getElementById("forgotUsernameEmail").value;
    //console.log("Forgot Password Data:", { forgotUsernameEmail }); // checking 
}