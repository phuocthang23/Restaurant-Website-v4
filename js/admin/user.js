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
// *---------------------------------(change theme )------------------------------------
const userLoginBD = getDataFromLocal("userLogin");
// console.log(userBD);

// * chống chuyển sang trang admin nếu customer có đc đường link
function checkAdmin(user) {
  if (user.role !== "admin") {
    return navigate("../../index.html");
  }
}
checkAdmin(userLoginBD);

// * -------------------------- (log out) --------------------------------
function logOut() {
  outData("userLogin")
}

const userBD = getDataFromLocal("accounts");
console.log(1111111, userBD);

function renderUser(userBD) {
  let xhtml = "";
  userBD.forEach((item, index) => {
    xhtml += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.username}</td>
            <td>${item.email}</td>
            <td>${item.role}</td>
            <td>${item.isActive}</td>
            <td>
                <button class="change" style= "display: ${item.role === "admin" ? "none" : "block"} " onclick="changeStatus(${index})">change</button>
            </td>
        </tr>
            `;
  });
  document.querySelector("tbody").innerHTML = xhtml;
}

renderUser(userBD);

// const userBD = getDataFromLocal("accounts") ;

function changeStatus(index) {
  console.log(index);

  if (userBD[index].role === "admin") {
    alert(` admin không thể đổi trạng thái`);
  } else {
    userBD[index].isActive = !userBD[index].isActive;
    renderUser(userBD);
    setDataToLocal("accounts", userBD)

    console.log(userBD);
  }
}

function searchUser() {
    const resultSearch = searchItem("accounts","username");

    renderUser(resultSearch);
}

