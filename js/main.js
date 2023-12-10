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

function registerBtnClick() {
  const username = document.getElementById("reg-username-input").value;
  const password = document.getElementById("reg-password-input").value;
  const name = document.getElementById("reg-name-input").value;
  const email = document.getElementById("reg-email-input").value;
  const image = document.getElementById("reg-image-input").files[0];
  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("image", image);
  axios
    .post(`${baseUrl}/register`, formData)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      bootstrap.Modal.getInstance(
        document.getElementById("register-modal")
      ).hide();
      // Show Success Toast
      showToast("Congratulations! You have successfully registered.");
      setupUI();
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
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
  const addPostBtn = document.getElementById("add-btn");
  if (Auth()) {
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    logoutBtn.style.display = "inline";
    addPostBtn.style.display = "flex";
  } else {
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline";
    registerBtn.style.display = "inline";
    addPostBtn.style.display = "none";
  }
}

function showToast(message) {
  document.getElementById("toast-body").innerHTML = message;
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
}
