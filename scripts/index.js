let userNumber = window.localStorage.getItem("userNumber");
let userDashboardName = document.getElementById("userNumber");
let signupLogout = document.getElementById("signupLogout");
const cartDiv = document.getElementById("cartDiv");

//cart access
if(userNumber!=null){
  cartDiv.innerHTML =`  <a href="./cart.html">
            <img src="./images/cart.png" alt="">

            <span>Cart</span>
          </a>`
}else if(userNumber==null){
  cartDiv.innerHTML =`<a href="../Signup.html">
            <img src="./images/cart.png" alt="">

            <span>Cart</span>
          </a>`
}
// display user Number
if (userNumber != null) {
  userDashboardName.innerText = `Hello user +91${userNumber}`;
  signupLogout.innerHTML = ` <a><button id=logOutButton>Log Out</button></a>
    `;
  logoutFunction();
} else if (userNumber == null) {
  userDashboardName.innerHTML = `Hello User`;
  signupLogout.innerHTML = `<a href="./Signup.html">
                  <button>Sign Up</button></a>`;
}

function logoutFunction() {
  let logOutButton = document.getElementById("logOutButton");
  logOutButton.addEventListener("click", () => {
    location.reload();
    userDashboardName.innerHTML = `Hello User`;
    logOutButton.innerHTML = `<a href="./Signup.html">
                  <button>Sign Up</button></a>
                  <hr>`;
    window.localStorage.clear();
  });
}

// console.log("hey")
// // products data start**
let API = "AllData/Data.json";
let container = document.getElementById("productsSect");
let products = JSON.parse(localStorage.getItem("cart")) || []; //products added while clicking "add to cart"

// fetching data
fetchData();
async function fetchData() {
  try {
    let request = await fetch(API);
    let data = await request.json();
    // console.log(data.products)
    appendData(data.products);
    // newDataArr = [...data];
    // console.info("all Data >>> ", newDataArr);
  } catch (error) {
    console.log(error);
  }
}

function appendData(items) {
  container.innerHTML = null;
  items.forEach((element) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");

    let imgCard = document.createElement("div");
    imgCard.setAttribute("class", "picture");
    let image = document.createElement("img");
    image.setAttribute("src", element.img);

    let info = document.createElement("div");
    info.setAttribute("class", "info");
    let brand = document.createElement("h4");
    brand.innerText = element.brand;
    let name = document.createElement("P");
    name.innerText = element.name;
    let Delivery = document.createElement("button");
    Delivery.innerText = "Free Delivery";
    let description = document.createElement("p");
    description.innerText = element.description;
    let price = document.createElement("h3");
    price.innerText = `₹ ${element.price}`;

    let rat = document.createElement("div");
    rat.setAttribute("class", "ratbox");
    let ratting = document.createElement("button");
    ratting.innerText = element.rating;
    let star = document.createElement("img");
    star.setAttribute("src", "images/star (2).png");

    let button = document.createElement("button");
    button.innerText = "Add To Cart";
    button.addEventListener("click", () => {
      let flag = true;
      for (let item in products) {
        if (products[item].id == element.id) {
          flag = false;
        }
      }
      if (flag == true) {
        let cloth = {...element, quantity:1};
        products.push(cloth);
        localStorage.setItem("cart", JSON.stringify(products));
        alert("Product added to cart 😊");
      } else {
        alert("Product already in cart 😀");
      }
    });

    imgCard.append(image);
    info.append(description, name, brand, Delivery, price);
    rat.append(ratting, star);
    card.append(imgCard, info, rat, button);
    container.append(card);
  });
}
