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
