const foodToDB = [
  {
    id: 0,
    name: "Salad",
    price: 20000,
    imageUrl: "about1.png",
    tag: "salad",
  },
  {
    id: 1,
    name: "Salad rau củ",
    price: 20000,
    imageUrl: "about3.png",
    tag: "salad",
  },
  {
    id: 2,
    name: "Bún Bò Huế",
    price: 35000,
    imageUrl: "bun-bo-hue.png",
    tag: "VN food",
  },
  {
    id: 3,
    name: "Phở Bò",
    price: 40000,
    imageUrl: "pho.png",
    tag: "VN food",
  },
  {
    id: 4,
    name: "Bánh Mì",
    price: 25000,
    imageUrl: "banh-mi-chesse.png",
    tag: "VN food",
  },
  {
    id: 5,
    name: "Hamburger Bò",
    price: 50000,
    imageUrl: "hamberger-thit-bo.png",
    tag: "Fast food",
  },
  {
    id: 6,
    name: "hamberger Gà",
    price: 45000,
    imageUrl: "hamberger-thit.png",
    tag: "Fast food",
  },
  {
    id: 7,
    name: "Pizza",
    price: 80000,
    imageUrl: "pizza.png",
    tag: "Fast food",
  },
  {
    id: 8,
    name: "Pizza",
    price: 30000,
    imageUrl: "khoaitaychien.png",
    tag: "Fast food",
  },
];

const accountsDB = [
  { 
    id:0,
    username: "admin",
    email: "thang@gmail.com",
    password: "12345",
    carts: [],
    role: "admin",
    isActive: true,
  },
  {
    id:1,
    username: "thangnguyen",
    email: "thangm@gmail.com",
    password: "678910",
    carts: [],
    role: "customer",
    isActive: true,
  },
  { 
    id:2,
    username: "thangd",
    email: "thanga@gmail.com",
    password: "1111111",
    carts: [],
    role: "customer",
    isActive: true,
  },
  {
    id:3,
    username: "thangn",
    email: "thangn@gmail.com",
    password: "123456789",
    carts: [],
    role: "customer",
    isActive: true,
  },
];

// const accountLocal = localStorage.

const foodData = localStorage.getItem("foods");
const accountLocal = localStorage.getItem("accounts");

if (!foodData && !accountLocal) {
  localStorage.setItem("foods", JSON.stringify(foodToDB));
  localStorage.setItem("accounts", JSON.stringify(accountsDB));
} else {
  // If "products" data already exists in local storage
  // console.log("Products data already exists:", JSON.parse(foodData));
}
