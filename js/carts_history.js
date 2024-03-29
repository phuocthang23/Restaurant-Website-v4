const userLogin = getDataFromLocal("userLogin");
 if(userLogin) {
  renderLogin();
 }

 function renderLogin(){
  const navbar = document.querySelector(".navbar");
    let xhtml = `
    <li><a href="#home"> Home </a></li>
    <li><a href="#about"> About </a></li>
    <li li><a href="#shop"> Shop </a></li>
    <li><a href="#customer"> Customer </a></li>
    <li><a href="#contact"> Contact </a></li>
    <li><a href="#" class="showDrop"><i class="bx bxs-user-circle"></i></a>
      <ul class="drop">
          <li class="drop-item">
            <span class="drop-text" ><a href="./html/edit_profile.html"> personal information </a></span>
          </li>
          <li class="drop-item">
          <span class="drop-text" ><a href="./html/carts_history.html"> order history </a></span>
          </li>
          <li class="drop-item">
          <span class="drop-text" class="logOut" onclick="logOut()"><a href="">Log out</a></span>
        </li>
      </ul>

    </li>
    <li ></li>
    `;
    navbar.innerHTML= xhtml;
 }

 function logOut(){
  window.localStorage.removeItem("userLogin");
 }

//  *------------------------------(toggle)-----------------------
const dropdownBtn = document.querySelector(".showDrop");
const dropdownList = document.querySelector(".drop");
dropdownBtn.addEventListener("click", function() {
  dropdownList.classList.toggle("show");
});

//*-------------------------------------------------(order history)----------------------------------------------
const historyFromLocal = getDataFromLocal("orderHistory");

// const userLogin = getDataFromLocal("userLogin");
const newArr = historyFromLocal.filter((el) => el.email === userLogin.email);
console.log(newArr);


function renderHistory(key) {
  const history = document.querySelector(".container");

  let render = "";
  let render2 = "";
  key.forEach((item, index) => {
    console.log(item.cart);
    const cartNames = newArr[index].cart.forEach((cart) => {
      //* render sản phẩm ở trong
      render2 += `
      <div class="cart-item">
      <div class="ui-product">
          <img class="item-image" src="../img_food/img/${
            cart.imageUrl
          }" alt="Product image">
      </div>
      <div div class="item-details">
      <div class="item-name">${cart.name}</div>
      <div class="item-price"> ${Number(cart.price).toLocaleString()}VNĐ</div>
      <div class="item-total-price">Tổng tiền: ${Number(
        cart.price * cart.quantity
      ).toLocaleString()} VNĐ</div>
      <div class="item-quantity">
        <label class="quantity-label">Số lượng:</label>
        <p>${cart.quantity}</p>
      </div>
      </div>
      </div>
      `;
    });
    //* render vòng ngoài
    render += `
  <div class="cart">
    <div class="wrap">
        <div class="infor">
          <div class="item-status">${item.date}</div>
          <div class="status-product"> ${item.isActive} </div>
    </div>

      ${render2}
  
      <div class="total-status">
          <div class="total-price">Tổng cộng: ${Number(
            item.total
          ).toLocaleString()} VNĐ</div>
          <button class="checkout-btn" type="button"> buy back </button>
        </div>
      </div>
  </div>
      `;
    render2 = "";
  });
  history.innerHTML = render;
}

renderHistory(newArr);

