let cartitem = JSON.parse(localStorage.getItem("cart")) || [];
let displaycartcount = document.getElementById("total-Item");
let container = document.getElementById("cart-container");

displaycard(cartitem);

function displaycard(item) {
  let total = 0;
  container.innerHTML = "";
  let totalprice = document.getElementById("cart-total");
  displaycartcount.innerText = item.length;
  
  item.forEach(function (element, i) {

    let card = document.createElement("div");

    let image = document.createElement("img");
    image.setAttribute("src", element.img);

    let name = document.createElement("h4");
    name.textContent = element.name;

    let price = document.createElement("h5");
    price.innerText = getFormatedCurrencyValue(element.price);

    let desc = document.createElement("p");
    desc.textContent = element.description;

    let btn1 = document.createElement("button");
    btn1.textContent = "+";
    btn1.addEventListener("click", function () {
      element.quantity++;
      qtn.textContent = element.quantity;
      total = total + Number(element.price);
      totalprice.textContent = getFormatedCurrencyValue(total);
      localStorage.setItem("cart", JSON.stringify(cartitem));
    });

    let qtn = document.createElement("span");
    qtn.textContent = element.quantity;
    let btn2 = document.createElement("button");
    btn2.textContent = "-";
    btn2.addEventListener("click", function (i) {
      if(element.quantity > 1){
        element.quantity--;
        qtn.textContent = element.quantity;
        total = total - Number(element.price);
        totalprice.textContent = getFormatedCurrencyValue(total);
        localStorage.setItem("cart", JSON.stringify(cartitem));
        displaycard(cartitem);
      }
    });

    let btn3 = document.createElement("button");
    btn3.textContent = "Remove";
    btn3.addEventListener("click", function (i) {
      cartitem.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cartitem));
      displaycard(cartitem);
    });
    total = total + Number(element.price);
    totalprice.innerText = getFormatedCurrencyValue(total);

    card.append(image, name, price, desc, btn1, qtn, btn2, btn3);

    container.append(card);
  });

  let dis = document.querySelector("#finalprice>form");
  dis.addEventListener("submit", function (event) {
    event.preventDefault();
    let val = document.querySelector("#cupon-filled").value;

    if (val === "Trendy-30") {
      totalprice.textContent = getFormatedCurrencyValue(
        Math.floor(total - total * 0.3)
      );

      localStorage.setItem("disprice", totalprice.textContent);
    } else if (val === "Trendy-50") {
      totalprice.textContent = getFormatedCurrencyValue(
        Math.floor(total - total * 0.5)
      );

      localStorage.setItem("disprice", totalprice.textContent);
    } else {
      alert("You Enter The Wrong Coupen Code");
    }
  });
}

