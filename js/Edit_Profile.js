let userLogin = getDataFromLocal("userLogin");
const accounts = getDataFromLocal("accounts");
console.log(accounts);
const userName = document.getElementById("name");
const email = document.getElementById("email");
const dayOfBirth = document.getElementById("dob");
const address = document.getElementById("address");
let gender = document.getElementsByName("gender");
const phone = document.getElementById("phone");

function handleSubmit() {
  const genders = getGender();
  let dataEdit = {
    ...userLogin,
    username: userName.value,
    date: dayOfBirth.value,
    gender: genders,
    address: address.value,
    phone: phone.value,
  };
  userLogin = dataEdit;
  
  alert(" Successfully modified ")
  
  setDataToLocal("userLogin", userLogin);


//   console.log(userLogin);

  let findAccount = accounts.find((account) => account.id === userLogin.id);
  console.log(findAccount);

  if (findAccount) {
    let newDataAccount = {  
    ...findAccount,
    username: userName.value,
    date: dayOfBirth.value,
    gender: genders,
    address: address.value,
    phone: phone.value,
    }
    accounts.splice(findAccount.id,1,newDataAccount)
    setDataToLocal("accounts", accounts);
  }
}

console.log(1111, accounts);
function getData() {
  console.log(userLogin);

  userName.value = userLogin.username;
  email.value = userLogin.email;
  dayOfBirth.value = userLogin.dateOfBirth ? userLogin.dateOfBirth : "";
  gender.value = userLogin.gender ? userLogin.gender : "";
  address.value = userLogin.address ? userLogin.address : "";
  phone.value = userLogin.phone ? userLogin.phone : "";
}

getData();

function getGender() {
  for (const radio of gender) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return "";
}

// *------------------------------------------------------(dùng lại)---------------------------------------------------------
// const userLogin = getDataFromLocal("userLogin");
if (userLogin) {
  renderLogin();
}

 function renderLogin(){
  const navbar = document.querySelector(".navbar");
    let xhtml = `
    <li><a href="../index.html"> Home </a></li>
    <li><a href="#about"> About </a></li>
    <li li><a href="#shop"> Shop </a></li>
    <li><a href="#customer"> Customer </a></li>
    <li><a href="#contact"> Contact </a></li>
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
          <span class="drop-text" class="logOut" onclick="logOut()"><a href="../html/log_in.html">Log out</a></span>
        </li>
      </ul>
    </li>
    `;
    navbar.innerHTML= xhtml;
 }
// *----------------------------------(log out)--------------------------------
function logOut() {
  window.localStorage.removeItem("userLogin");
}

//  *------------------------------(toggle)-----------------------
const dropdownBtn = document.querySelector(".showDrop");
const dropdownList = document.querySelector(".drop");
dropdownBtn.addEventListener("click", function () {
  dropdownList.classList.toggle("show");
});