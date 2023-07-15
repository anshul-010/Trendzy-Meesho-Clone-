// console.log("hello")
let search = document.getElementById("searchBox");
let container = document.getElementById("mens_products"); // all carts append here
let API = "https://mock-api-ykym.onrender.com/women"; // API
let products = JSON.parse(localStorage.getItem("cart")) || []; //products added while clicking "add to cart"
let newDataArr = [];

// fetching data
fetchData();
async function fetchData() {
  try {
    let request = await fetch(API);
    let data = await request.json();
    appendData(data);
    newDataArr = [...data];
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

  // search part
  let formsearch = document.querySelector("form");
  formsearch.addEventListener("submit", (event) => {
    event.preventDefault();
    let search = formsearch.searchBox.value;

    let filtered = newDataArr.filter((ele) => {
      if (
        ele.name.toUpperCase().includes(search.toUpperCase()) === true ||
        ele.brand.toUpperCase().includes(search.toUpperCase()) === true
      ) {
        return true;
      } else {
        return false;
      }
    });
    appendData(filtered);
  });
}

const appliedFilterObj = {
  category: null,
  price: null,
  brand: null,
  ratings: null,
};

const updateAppliedFilterObj = (key, value) => {
  appliedFilterObj[key] = value;
  console.info("appliedFilterObj >>>> ", appliedFilterObj);
  filterAllDataOnFilterObjChanged();
};

const filterAllDataOnFilterObjChanged = () => {
  const filteredItems = newDataArr.filter((item) => {
    if (
      appliedFilterObj.category &&
      item.name.toLowerCase() != appliedFilterObj.category.toLowerCase()
    )
      return false;
    if (appliedFilterObj.price && +item.price > +appliedFilterObj.price)
      return false;
    if (appliedFilterObj.price === "above1000" && +item.price < 1000)
      return false;
    if (
      appliedFilterObj.brand &&
      item.brand.toLowerCase() != appliedFilterObj.brand.toLowerCase()
    )
      return false;
    if (appliedFilterObj.ratings && item.rating < appliedFilterObj.ratings)
      return false;

    return true;
  });
  console.info("filteredItems >>>>>>>>>>>?????? ", filteredItems);
  appendData(filteredItems);
};

const resetAppliedFilterObj = () => {
  appliedFilterObj.category = null;
  appliedFilterObj.price = null;
  appliedFilterObj.brand = null;
  appliedFilterObj.ratings = null;
  appendData(newDataArr);
};

// filter part
// filer by category
let filteredArray = [];

let filterbyCategory = document.querySelector(".filter");

filterbyCategory.addEventListener("change", (event) => {
  event.preventDefault();
  updateAppliedFilterObj("category", event.target.value);
});

// filter by price
let filterbyPrice = document.querySelector(".filterbyprice");

filterbyPrice.addEventListener("change", (event) => {
  updateAppliedFilterObj("price", event.target.value);
});

// filter by brand
let filterbyBrand = document.querySelector(".filterbyBrand");

filterbyBrand.addEventListener("change", (event) => {
  updateAppliedFilterObj("brand", event.target.value);
});

// filter by rating
let filterbyRating = document.querySelector(".filterbyRating");

filterbyRating.addEventListener("change", (event) => {
  updateAppliedFilterObj("ratings", event.target.value);
});

// sorting part
let sort = document.querySelector(".sort");

sort.addEventListener("change", (event) => {
  let selected = event.target.value;

  if (selected === "HTL") {
    let sortDataHTL = newDataArr.sort((a, b) => b.price - a.price);
    appendData(sortDataHTL);
  } else if (selected === "LTH") {
    let sortDataLTH = newDataArr.sort((a, b) => a.price - b.price);
    appendData(sortDataLTH);
  } else if (selected === "Rating") {
    let sortDatabyRating = newDataArr.sort((a, b) => b.rating - a.rating);
    appendData(sortDatabyRating);
  }
});
