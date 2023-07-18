let header = document.querySelector("header");
let menu = document.querySelector("#menu_icon");
let navbar = document.querySelector(".navbar");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

window.addEventListener("scroll", () => {
  header.classList.toggle("active", window.scrollY > 0);
});

menu.onclick = () => {
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
};

document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();
  const accountsFromlocal = getDataFromLocal("accounts") ?? []; // gọi data từ local lên

  const user = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  //* tìm kiếm data trùng nhau
  const userLogin = accountsFromlocal.find(function (userDB) {
    return userDB.email === user.email && userDB.password === user.password;
  });
  if (userLogin) {
    //* check tài khoản sau khi bị khóa
    if(userLogin.isActive === false) {
      alert(` bạn đã bị khóa tài khoản vì lý do không đúng đắn `)
      return;
    }
    delete userLogin.password;
    setDataToLocal("userLogin", userLogin);
    userLogin.role === "admin"
      ? navigate("../html/admin/user.html")
      : navigate("../index.html");
  } else {
    alert("login failed wrong email and password");
  }
});
