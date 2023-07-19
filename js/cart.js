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
}

//* ----------------------(kiểm tra addcart đã log in hay chưa)-------------------

function addToCard(index) {
  if (userLogin) {
    cartProduct(index);
  } else {
    navigate("../html/log_in.html");
  }
}


//*----------------------(render navbar khi đã login)----------------------------

function renderLogin() {
  const userLogin = getDataFromLocal("userLogin");

  const navbar = document.querySelector(".navbar");
  let xhtml = `
    <li><a href="../html/index.html"> Home </a></li>
    <li><a href="#customer"> Customer </a></li>
    <li li><a href="../html/shop.html"> Shop </a></li>
    <li><a href="#contact"> Contact </a></li>
    <li>
          <a href="./cart.html" class="shopping">
            <img src="../img_food/shopping-bag-bag-svgrepo-com.svg" />
            <span class="quantity">${userLogin.carts.length}</span>
          </a>
        </li>
    <li><a href="#"><i class="bx bxs-user-circle"></i></a></li>
    <li onclick="logOut()"><a href="../html/log_in.html">log out</a></li>
    `;
  navbar.innerHTML = xhtml;
}


// const userLogin = getDataFromLocal("userLogin");
const accounts = getDataFromLocal("accounts");

const cartUser = userLogin.carts;
console.log(cartUser);

//* -------------------------------------------( render cart list )--------------------------------
function renderTotalBoard(key) {
  const cart = document.querySelector(".wrap");
  let xhtml = "";
  //* kiểm tra có đơn hàng hay ko 
  if(key.length > 0){
    key.forEach(
      (item, id) =>
      //*render sản phẩm
        (xhtml += `
          <div class="basket-product" >
          <div class="item">
                  <div class="product-image">
                    <img src="../img_food/img/${
                      item.imageUrl
                    }" alt="Placholder Image ${id + 1}" class="product-frame">
                  </div>
                  <div class="product-details">
                    <h1><strong><span class="item-quantity">${
                      item.quantity
                    }</span> x ${item.name}</strong> </h1>
                    <p><strong>${item.tag}</strong></p>
                    <p>Product Code - ${Number(
                      "2" + (Math.random() * 10000000).toFixed(0)
                    )}</p>
                  </div>
                </div>
                <div class="price">${Number(
                  item.price
                ).toLocaleString()} VND </div>
                <div class="quantity">
                <button class="dec" onclick="handleDec(${item.id})">-</button>
                  <input type="number" value="${
                    item.quantity
                  }" min="1" class="quantity-field" onkeypress="return false;">
                  <button class="add" onclick="handleAdd(${item.id})">+</button>
                </div>
                <div class="subtotal">${Number(
                  item.quantity * item.price
                ).toLocaleString()} VND</div>
                <div class="remove">
                  <button onclick="handleRemove(${item.id})">Remove</button>
                </div>
          </div>
          </div>
          `)
    );
    cart.innerHTML = xhtml;
  }else {
    xhtml = `<p style = "text-align:center; margin-top: 100px ; font-size: 30px "  > không có đơn hàng </p>`
    cart.innerHTML = xhtml;
  }
  
}
renderTotalBoard(cartUser);

//* -------------------------------------------(render total board)--------------------------------
let totalUsers = "";
function renderTotalOder(key) {
  const cart = document.querySelector("aside");
  let xhtml = "";

  // if(key.length > 0){
  //* tính tổng
  const total = cartUser.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  totalUsers = total;
  //* kiểm tra có đơn hàng hay không
  
  xhtml += `
      <div classdiv="summary">
              <div class="summary-total-items"><span class="total-items"></span> Items in your Bag</div>
              <div class="summary-subtotal">
                <div class="subtotal-title">Subtotal</div>
                <div class="subtotal-value final-value" id="basket-subtotal">${total.toLocaleString()}VND</div>
                <div class="summary-promo hide">
                  <div class="promo-title">Promotion</div>
                  <div class="promo-value final-value" id="basket-promo"></div>
                </div>
              </div>
              * Select a payment method
              <div class="summary-delivery">
                <select name="delivery-collection" class="summary-delivery-selection">
                  <option value="0" selected="selected"> Select a payment method</option>
                  <option value="collection">Payment in cash</option>
                  <option value="first-class">Royal Mail 1st Class</option>
                  <option value="second-class">Royal Mail 2nd Class</option>
                  <option value="signed-for">Royal Mail Special Delivery</option>
                </select>
              </div>
              <div class="summary-total">
                <div class="total-title">Total</div>
                <div class="total-value final-value" id="basket-total">${total.toLocaleString()}VND</div>
              </div>

              ${cartUser.length? ' <div class="summary-checkout"><button class="checkout-cta" onclick="orderProduct()" >Go to Secure Checkout</button></div>': '' }
             
            </div>
        `;
  cart.innerHTML = xhtml;
}
renderTotalOder(cartUser);

//* ----------------------------------------------------(funtion) --------------------------------

function handleDec(id) {
  const dec = cartUser.find((item) => item.id === id);
  if (dec && dec.quantity > 1) {
    dec.quantity -= 1;
  } else if (dec && dec.quantity == 1) {
    window.confirm(" do you want to delete this foods ");
    if (confirm) {
      handleRemove(id);
    }
  }
  renderTotalBoard(cartUser);
  renderTotalOder(cartUser);

  //* tìm id của userLogin trong account và lưu lại dữ liệu

  const accDec = accounts.find((item) => item.id === userLogin.id);

  if (accDec) {
    accDec.carts = cartUser;
  }

  setDataToLocal("userLogin", userLogin);
  setDataToLocal("accounts", accounts);
}

function handleAdd(id) {
  const add = cartUser.find((item) => item.id === id);
  if (add) {
    add.quantity += 1;
  }
  renderTotalBoard(cartUser);
  renderTotalOder(cartUser);

  //* tìm id của userLogin trong account và lưu lại dữ liệu

  const accDec = accounts.find((item) => item.id === userLogin.id);

  if (accDec) {
    accDec.carts = cartUser;
  }

  setDataToLocal("userLogin", userLogin);
  setDataToLocal("accounts", accounts);
}

function handleRemove(id) {
  console.log(id);
  const remove = cartUser.findIndex((item) => item.id === id);
  console.log(remove);

  if (remove >= 0) {
    cartUser.splice(remove, 1);
    renderTotalOder(cartUser);
  }

  //* tìm id của userLogin trong account và lưu lại dữ liệu

  const removeAcc = accounts.find((user) => user.id === userLogin.id);

  if (removeAcc) {
    //* gắn dữ liệu carts của userLogin trong account.carts = removeAcc.carts
    removeAcc.carts = cartUser;
  }

  setDataToLocal("userLogin", userLogin);
  setDataToLocal("accounts", accounts);

  renderTotalBoard(cartUser);
}

//* -----------------------------------------------(click ra order)--------------------------------------------------
// const orderHistory = [];
function orderProduct() {
  //* retturn về giá trị đã bị xóa
  const orderRender = cartUser.splice(0, cartUser.length);
  document.querySelector(".total-value").innerHTML = 0;
  document.getElementById("basket-subtotal").innerHTML = 0;

  renderTotalBoard(cartUser);
  const orderHistory = getDataFromLocal("orderHistory") ?? [];

  //todo: đặt định dạng ngày giờ
  const currentDate = new Date()
    .toLocaleString("en-GB")
    .replace(/\//g, "-")
    .replace(",", "");

  let sum = 0;
  for (let i = 0; i < orderRender.length; i++) {
    sum += orderRender[i].quantity;
  }
  //* tạo obj
  let orderUser = {
    id:
      orderHistory.length > 0
        ? orderHistory[orderHistory.length - 1].id + 1
        : 0,
    email: userLogin.email,
    name: userLogin.username,
    cart: orderRender,
    isActive: "New orders",
    total: totalUsers,
    date: currentDate,
    code: Number("2" + (Math.random() * 10000000).toFixed(0)),
    totalProduct: sum,
  };

  //* push dữ liệu lại
  orderHistory.push(orderUser);
  //* set xuống local
  setDataToLocal("orderHistory", orderHistory);
  setDataToLocal("userLogin", userLogin);
  //* kiểm tra id
  const findID = accounts.map((item) => {
    if (item.id === userLogin.id) {
      return {
        ...item,
        carts: [],
      };
    } else {
      return item;
    }
  });
  setDataToLocal("accounts", findID);
  //todo: chuyển qua trang history
  navigate("../html/carts_history.html");
}
