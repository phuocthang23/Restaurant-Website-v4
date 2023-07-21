let header = document.querySelector("header");
let menu = document.querySelector("#menu_icon");
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  header.classList.toggle("active", window.scrollY > 0);
});

// menu.onclick = () => {
//   navbar.classList.toggle("active");
// };

window.onscroll = () => {
  navbar.classList.remove("active");
};
//* ------------------------(kiểm tra đã log in hay chưa)----------------------------
const userLogin = getDataFromLocal("userLogin");
if (userLogin) {
  renderLogin();
  // * --------------------------(log out)--------------------------
const dropdownBtn = document.querySelector(".showDrop");
const dropdownList = document.querySelector(".drop");
dropdownBtn.addEventListener("click", function() {
  dropdownList.classList.toggle("show");
});
}

//* ----------------------(kiểm tra addcart đã log in hay chưa)-------------------

function addToCard(index) {
  if (userLogin) {
    cartProduct(index);
  } else {
    navigate("../html/log_in.html");
  }
}
//* ---------------------(hàm gọi đã click thêm cart)-------------------------

// const userLogin = getDataFromLocal("userLogin"); //^ lấy dữ liệu của userLogin  --> tìm user trong accounts

let cartUser = userLogin?.carts;
const accounts = getDataFromLocal("accounts"); //^ --> láy dữ liệu accounts

// *-------------------------------(function)-------------------------------
function cartProduct(index) {
  const foodDBs = getDataFromLocal("foods"); //^ --> láy dữ liệu foodDB

  const productUSer = foodDBs[index];

  //* check xem đã có sản phẩm hay chưa

  let resultProduct = {};
  if (cartUser.length === 0) {
    resultProduct = {
      ...productUSer,
      id: 0,
      idProduct: productUSer.id,
      quantity: 1,
    };
    cartUser.push(resultProduct);
  } else {
    // * tìm id xem có ko đển quantity + 1
    const checkCart = cartUser.find(
      (item) => item.idProduct === productUSer.id
    );
    // console.log("xxxx", checkCart);

    if (checkCart) {
      checkCart.quantity += 1;
    } else {
      //* nếu ko sẽ + quantity lên 1
      const maxId = Math.max(...cartUser.map((item) => item.id)); //* hàm tìm id max
      resultProduct = {
        ...productUSer,
        id: maxId + 1,
        idProduct: productUSer.id,
        quantity: 1,
      };
      cartUser.push(resultProduct);
    }
  }
  // console.log(userLogin.carts);
  alert(" added to cart ")

  userLogin.carts = cartUser;

  setDataToLocal("userLogin", userLogin);
  renderLogin()

  const addAccount = accounts.find((item) => item.id === userLogin.id);

  if (addAccount) {
    addAccount.carts = userLogin.carts;
    console.log(accounts);
    setDataToLocal("accounts", accounts);
  }
}

//*----------------------(render navbar khi đã login)----------------------------

function renderLogin() {
  const userLogin = getDataFromLocal("userLogin");

  const navbar = document.querySelector(".navbar");
  let xhtml = `
    <li><a href="../index.html"> Home </a></li>
    <li><a href="#customer"> Customer </a></li>
    <li li><a href="#shop"> Shop </a></li>
    <li><a href="#contact"> Contact </a></li>
    <li>
          <a href="./cart.html" class="shopping">
            <img src="../img_food/shopping-bag-bag-svgrepo-com.svg" />
            <span class="quantity">${userLogin.carts.length}</span>
          </a>
        </li>
    <li><a href="#" class="showDrop"><i class="bx bxs-user-circle"></i></a>
        <ul class="drop">
            <li class="drop-item">
              <span class="drop-text" ><a href="../html/edit_profile.html"> personal information </a></span>
            </li>
            <li class="drop-item">
            <span class="drop-text" ><a href="../html/carts_history.html"> order history </a></span>
            </li>
            <li class="drop-item">
            <span class="drop-text" ><a href="../html/cart.html"> Cart </a></span>
            </li>
            <li class="drop-item">
            <span class="drop-text" class="logOut" onclick="logOut()"><a href="">Log out</a></span>
          </li>
        </ul>
      </li>
    <li><a href="">name</a></li>
    `;
  navbar.innerHTML = xhtml;
}


// * -----------------------(transition cart)----------------
let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping?.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping?.addEventListener("click", () => {
  body.classList.remove("active");
});

//* ------------------------------------------(render list)--------------------------------

// todo: lôi từ local lên rồi gắn biến foodDB
const foodDB = getDataFromLocal("foods") ?? [];
// console.log(11, foodDB);
//todo: render dữ liệu
renderFood(foodDB);
function renderFood(foodDB) {
  let xhtml = "";
  foodDB.forEach((element, index) => {
    xhtml += `
      <div class="item">
            <img src="../img_food/img/${element.imageUrl}">
            <div class="title">${element.name}</div>
            <div class="title tag ${
              element.tag === "salad"
                ? "salad"
                : element.tag === "VN food"
                ? "vnfood"
                : "fastfood"
            }">${element.tag}</div>
            <div class="price">${element.price.toLocaleString()} VND</div>
            <button class="detail" onclick="Detail(${
              element.id
            })">Detail</button>
            <button onclick="addToCard(${index})">Add To Card</button>
          </div>
      `;
  });
  if (foodDB.length === 0) {
    xhtml = `
            <h1 style="text-align:center; width:100%">không tìm thấy sản phẩm </h1> 
        `;
    document.querySelector(".list").style.display = "block";
  } else {
    document.querySelector(".list").style.display = "grid";
  }
  document.querySelector(".list").innerHTML = xhtml;
}

//* --------------------------(search food)---------------------------------------

function searchFood() {
  const searchInput = document.querySelector(".searchTerm");
  // console.log(searchInput.value);
  const foodDB = getDataFromLocal("foods") ?? []; //* gọi lại local
  const searchValue = foodDB.filter((value) => {
    return value.name.toUpperCase().includes(searchInput.value.toUpperCase());
  });
  // searchValue.value = "";
  renderFood(searchValue);
}
// * logout

function logOut() {
  window.localStorage.removeItem("userLogin");
  navigate("../index.html");
}

//* ---------------------------(show to detail)---------------------------------

function Detail(id) {
  // console.log(id);
  const itemDetail = foodDB.find((item) => item.id === id);
  setDataToLocal("detailProduct", itemDetail);
  navigate("../html/detail.html");
}
