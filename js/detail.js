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
    <li><a href="../index.html"> Home </a></li>
    <li><a href="#customer"> Detail </a></li>
    <li li><a href="#shop"> Shop </a></li>
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

// *--------------------------------(render)-----------------------------

const foodFormLocal = getDataFromLocal("detailProduct");

function renderDetail(food) {
  let xhtml = "";
  xhtml += `
        <div class="img-product">
        <img src="../../img_food/img/${food.imageUrl}" alt="" />
      </div>
      <div class="detail">
        <h1>${food.name}</h1>
        <p><strong>type:</strong> ${food.tag} </p>
        <p>
            <strong>about:</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea
            officiis distinctio laudantium quisquam officia a corporis
            perferendis, ex voluptatum laboriosam nisi sint, aspernatur, enim
            voluptatem nulla molestiae quaerat veniam provident.
          </p>
        <p><strong>price:</strong> ${Number(food.price).toString()} VND</p>
        <label for="number"> quantity order </label>
        <input type="number" name="number" id="number" min="0" value="1" >
        <button onclick"addToCart">Add To Cart</button>
        
        `;
  document.querySelector(".container").innerHTML = xhtml;
}

renderDetail(foodFormLocal);
