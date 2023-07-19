let header = document.querySelector("header");
let menu = document.querySelector("#menu_icon");
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  header.classList.toggle("active", window.scrollY > 0);
});

menu.onclick = () => {
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
};

// *----------------------------------------------(chuyển trạng thái)--------------------------------------------


const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repassword = document.getElementById("repassword");
const Error = document.querySelector(".form-control error");

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  //* lấy data từ local lên
  const accountsFromlocal = getDataFromLocal("accounts") ?? [];

  const userRegister = getDataForm(); // ==> 1 đối tượng chứa thông tin từ form || undefinded
  if (!userRegister) {
    return;
  }
  //todo: check email từ local
  const userDulicate = accountsFromlocal.find(function (userDB) {
    return userDB.email === userRegister.email;
  });

  if (userDulicate) {
    const error = {
      isError: true,
      usernameMessage: "",
      emailMessage: "email exits",
      passwordMessage: "",
      repeatPasswordMessage: "",
    };
    renderError(error);
  } else {
    accountsFromlocal.push(userRegister);
    setDataToLocal("accounts", accountsFromlocal);
    navigate("../html/log_in.html");
  }
});

function getDataForm() {
  const accountsFromlocal = getDataFromLocal("accounts") ?? [];
  const user = {
    username: username.value,
    email: email.value.toLowerCase().trim(), // --> chuyển email thành in thường + xóa bỏ space 2 bên,
    password: password.value,
    repeatPassword: repassword.value,
  };
  const error = checkValidator(user);
  renderError(error);
  if (!error.isError) {
    const tempAccounts = {
      id:accountsFromlocal.length > 0
      ? accountsFromlocal[accountsFromlocal.length - 1].id + 1
      : 0,
      ...user,
      carts: [],
      role: "customer",
      isActive: true,
    };
    console.log(tempAccounts);
    delete tempAccounts.repeatPassword;
    return tempAccounts;
  }
}

function checkValidator(user) {
  const error = {
    isError: false,
    usernameMessage: "",
    emailMessage: "",
    passwordMessage: "",
    repeatPasswordMessage: "",
  };

  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //* check user

  if (user.username === "") {
    error.isError = true;
    error.usernameMessage = " username not allow empty";
  } else if(user.username.length < 4 ){
    error.usernameMessage = " username atleast more than 3 characters";
  }

  //* check email

   if (!user.email.match(emailRegex)) {
    error.isError = true;
    error.emailMessage = user.email + " is not email validate";
  }

  //* check password
  if (user.password === "") {
    error.isError = true;
    error.passwordMessage = " password not allow empty";
  } else if (user.password.length < 6 || user.password.length > 20) {
    error.isError = true;
    error.passwordMessage =
      " password less than 6 characters and more than 20 characters";
  }

  //* check repassword
  if (user.repeatPassword !== user.password) {
    error.isError = true;
    error.repeatPasswordMessage = " repassword dont match password";
  }

  return error;
}

function renderError(error) {
  const errorUser = document.getElementById("error-user");
  const errorEmail = document.getElementById("error-email");
  const errorPassword = document.getElementById("error-password");
  const errorRepassword = document.getElementById("error-repassword");

  errorUser.innerHTML = error.usernameMessage;
  errorEmail.innerHTML = error.emailMessage;
  errorPassword.innerHTML = error.passwordMessage;
  errorRepassword.innerHTML = error.repeatPasswordMessage;
}
