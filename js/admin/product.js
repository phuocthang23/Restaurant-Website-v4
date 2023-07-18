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
// *-----------------------------------------------(change)--------------------------------------
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

btnCloseModal.addEventListener("click", closeModal);

// *------------------------------------------(open close modal)--------------------------------
const foodDB = getDataFromLocal("foods");

// console.log(foodDB);

function renderProduct(product) {
  let xhtml = "";
  product.forEach((item, index) => {
    xhtml += `
        <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td><img src="../../img_food/img/${
          item.imageUrl
        }" class="imge_table"></td>
        <td>${item.price.toLocaleString("de-DE")} VND</td>
        <td>${item.tag}</td>
        <td>
          <button class="edit" onclick="productEdit(${index})">edit</button>
          <button class="delete" onclick="productDelete(${item.id})">delete</button>
        </td>
      </tr>
        `;
  });
  document.querySelector("tbody").innerHTML = xhtml;
}
renderProduct(foodDB);

function productDelete(id) {
  let foodDB = getDataFromLocal("foods");
  foodDelete = foodDB.filter((item) => item.id !== id); //todo: khác id thì giữ lại cùng id thì bỏ
  setDataToLocal("foods", foodDelete);
  renderProduct(foodDelete);
}

function addForm() {
  openModal();
}

function handleAdd() {
  let AddTemp = {
    id: foodDB[foodDB.length - 1].id + 1,
    name: document.getElementById("name").value,
    price: Number(document.getElementById("price").value),
    imageUrl: document.getElementById("img").value,
    tag: document.getElementById("tag").value,
  };

  if (
    document.getElementById("name").value === "" ||
    document.getElementById("price").value === "" ||
    document.getElementById("img").value === "" ||
    document.getElementById("tag").value === ""
  ) {
    alert(` need enter full value `);
  } else {
    foodDB.push(AddTemp);
    setDataToLocal("foods", foodDB);
    renderProduct(foodDB);
    //& clear toàn bộ value
    let allInputs = document.querySelectorAll("input");
    allInputs.forEach((singleInput) => (singleInput.value = ""));
    closeModal();
  }
}
//* edit đưa dữ liệu lên form
 let position =""
function productEdit(index) {
  const foodDB = getDataFromLocal("foods");
  openModal();
  document.querySelector(".productadd").style.display="none";
  document.querySelector(".productUpdate").style.display="block";

  position = index;
  document.getElementById("name").value = foodDB[index].name;
  document.getElementById("price").value = foodDB[index].price;
  document.getElementById("img").value = foodDB[index].imageUrl;
  document.getElementById("tag").value = foodDB[index].tag;
}

//* xử lý dữ liệu và update 
function handleUpdate(){

  //* gọi lại data localstorage
  const foodDB = getDataFromLocal("foods");

  //* đưa vào form
  let UpdateTemp = {
    id: position,
    name: document.getElementById("name").value,
    price: Number(document.getElementById("price").value),
    imageUrl: document.getElementById("img").value,
    tag: document.getElementById("tag").value,
  };

  //* check điều kiện để không ""
  if (
    document.getElementById("name").value === "" ||
    document.getElementById("price").value === "" ||
    document.getElementById("img").value === "" ||
    document.getElementById("tag").value === ""
  ) {
    alert(` need enter update full value `);
  } else {
    // foodDB.push(UpdateTemp);
    foodDB.splice(position,1,UpdateTemp)
    setDataToLocal("foods", foodDB);
    renderProduct(foodDB);
    //& clear toàn bộ value
    let allInputs = document.querySelectorAll("input");
    allInputs.forEach((singleInput) => (singleInput.value = ""));
    //& đóng form
    closeModal();
    document.querySelector(".productUpdate").style.display="none";

  }
}

function searchProduct() {

  const resultSearch = searchItem("foods","name") 

  renderProduct(resultSearch);

}

// *---------------(log out)-----------------
function logOut() {
  outData("userLogin")
}
