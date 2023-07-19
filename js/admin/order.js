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

// * -------------------(log out)------------------
function logOut() {
    outData("userLogin")
}

const orderHistory = getDataFromLocal("orderHistory")


//todo ----------------------(render board)----------------
function renderOrderAdmind(key){
    const render = document.querySelector("tbody");
    let xhtml ="";
    let count = 0;
    key.forEach((item, id,) => {
        const deliveredClass = item.isActive === "delivered" ? "hidden" : "";
        const cancelClass = item.isActive === "cancelled" ? "hidden" : "";
        const cartNames = item.cart.map((cart) => cart.name).join(" , ");
        count++;
        xhtml +=`
        <tr >
              <td>${count}</td>
              <td>${item.date}</td>
              <td>${item.code}</td>
              <td>${item.email}</td>
              <td>${item.totalProduct}</td>
              <td>${(item.total).toLocaleString()} VND</td>
              <td>${item.isActive}</td>
              <td>
                <button class="done ${deliveredClass}" onclick="activeOrder(${id},'delivered')" 
                style="background-color: ${item.isActive === 'delivered' ? '#33FF33' : ''}; 
                display: ${item.isActive === 'cancelled' ? 'none' : 'inline-block'}"; 
                >delivered</button>

                <button class="cancel ${cancelClass}" onclick="activeOrder(${id},'cancel')" 
                style="background-color: ${item.isActive === 'cancelled' ? '#FF0000' : ''};
                display: ${item.isActive === 'delivered' ? 'none' : 'inline-block'}"; 
                >cancel</button>
              </td>
              <td>
              <button id="openModalBtn" onclick="ModalBtn(${id})"> Detail </button>
              </td>
        </tr>
        `
    });

    if(key.length === 0){
        xhtml = ` <h1 style="text-align:center; width:100%"> Results not found </h1> `
        render.innerHTML = xhtml;
    }
    render.innerHTML = xhtml;
}
renderOrderAdmind(orderHistory);



function activeOrder(id, action){

    const findID = orderHistory.find(value => value.id === id);
    console.log(findID);

    if (findID && action === "delivered") {
       findID.isActive = "delivered";
      
    } else if (findID && action === "cancel"){
        findID.isActive = "cancelled";
       
    } else {
        return;
    }

    setDataToLocal("orderHistory", orderHistory)
    renderOrderAdmind(orderHistory)
}

function searchOrder() {

    const resultSearch = searchItem("orderHistory","email") 
  
    renderOrderAdmind(resultSearch);
  
  }

  // * --------------------------*(modal)*------------------------

const openModalBtn = document.getElementById("openModalBtn");
const closeModal = document.getElementById("closeModal");
const modal = document.getElementById("myModal");

function ModalBtn(id){
  const accounts = getDataFromLocal("accounts");
  console.log(id);
  modal.style.display = "block";
  const checkid = orderHistory.filter(el => el.id === id);
  console.log(checkid);
  if(checkid){
    renderDetail(checkid)
  }
  
};

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// * ----------------------------(render detail)-------------------

function renderDetail(el){
  const render = document.querySelector(".detail");
  let xhtml ="";
  let count = 0;
  el.forEach(item => {
    item.cart.forEach(cart => {
      count++;
      xhtml +=
      `
      <tr >
      <td>${count}</td>
      <td>${item.code}</td>
      <td>${cart.name}</td>
      <td>${Number(cart.price).toLocaleString()}</td>
      <td>${cart.quantity}</td>
      <td>${Number(cart.price * cart.quantity).toLocaleString()}</td>
      </tr>
      `
    });
  });
  render.innerHTML = xhtml;
}
