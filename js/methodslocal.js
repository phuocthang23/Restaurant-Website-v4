//* lấy dữ liệu từ localstorage

function getDataFromLocal(key) {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
}

//* update dữ liệu xuống local storage

function setDataToLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function navigate(path) {
  window.location = path;
}

function searchItem(key, words){
     
  const foodDB = getDataFromLocal(`${key}`);

  const search = document.getElementById("searchTerm");

  const searchItem = foodDB.filter(item => item[words].toLowerCase().includes(search.value.trim().toLowerCase()));

  return searchItem

}

function outData(key){
  window.localStorage.removeItem(key);
}
function findId(key){
  const findId = key.find((item) => item.id === id);
}
