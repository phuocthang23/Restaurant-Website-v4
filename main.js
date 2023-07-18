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

// *-------------------------[slider]----------------------------

$(document).ready(function () {
  $(".img-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow:"<button type='button' class='slick-prev arow'><i class='bx bxs-chevrons-left' ></i></button>",
    nextArrow:"<button type='button' class='slick-next arow'><i class='bx bxs-chevrons-right' ></i></button>",
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  });
});
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
            <span class="drop-text" ><a href="./html/cart.html"> Cart </a></span>
          </li>
          <li class="drop-item">
          <span class="drop-text" class="logOut" onclick="logOut()"><a href="">Log out</a></span>
        </li>
      </ul>
    </li>
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