setupUI();


//----------------------- Handle Login & Register & Logout -----------------------
function loginBtnClick() {
  const username = document.getElementById("username-input").value;
  const password = document.getElementById("password-input").value;

  axios
    .post(`${baseUrl}/login`, {
      username: username,
      password: password,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      bootstrap.Modal.getInstance(
        document.getElementById("login-modal")
      ).hide();
      // Show Success Toast
      showToast("Welcome! You have successfully logged in.");
      setupUI();
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
}

function registerBtnClick(){
  const username = document.getElementById("reg-username-input").value;
  const password = document.getElementById("reg-password-input").value;
  const name = document.getElementById("reg-name-input").value;
  const email = document.getElementById("reg-email-input").value;
  axios.post(`${baseUrl}/register`,{
    username,
    password,
    name,
    email
  })
  .then((res)=>{
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    bootstrap.Modal.getInstance(
      document.getElementById("register-modal")
    ).hide();
    // Show Success Toast
    showToast("Congratulations! You have successfully registered.");
    setupUI();
  })
  .catch((err)=>{
    alert(err.response.data.message)
  })
}

// Handle Logout
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setupUI();
}

//----------------------- Handle UI States -----------------------
// Check Auth
function Auth() {
  const token = localStorage.getItem("token");
  if (token == null) {
    return false;
  } else {
    return true;
  }
}

function setupUI() {
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const logoutBtn = document.getElementById("logout-btn");
  if (Auth()) {
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    logoutBtn.style.display = "inline";
  } else {
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline";
    registerBtn.style.display = "inline";
  }
}


function showToast(message){
  document.getElementById("toast-body").innerHTML = message;
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
}