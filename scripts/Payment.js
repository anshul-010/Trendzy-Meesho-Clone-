let continueButton = document.getElementById("continueButton");
let container = document.querySelector("body>div:nth-child(3)");
let successButton = document.querySelector("body>div:nth-child(2)>div>button");
let checkButton1 = document.getElementById("checkbox1");
let checkButton2 = document.getElementById("checkbox2");
let cashOnDeliveryDiv = document.getElementById("cashonDelivery");
let inputTags = document.querySelector("input");
let debitCardInput = document.getElementById("debitCardInput");
let payButton = document.getElementById("payButton");
let cardNumber = document.getElementById("cardNumber");
let expiration = document.getElementById("expiration");
let cvv = document.getElementById("cvv");
let name = document.getElementById("name");
let fieldWarning = document.getElementById("fieldWarning");
var popup = document.querySelector(".popup");
var close = document.querySelector(".close");
const totalProductPriceDiv = document.querySelector(
  "#totalProductPriceDiv>p:last-child"
);
const orderTotalDiv = document.querySelector("#orderTotalDiv>h3:last-child");
// When the user clicks on the close button, hide the popup
close.onclick = function () {
  popup.style.display = "none";
  setTimeout(() => {
    location.replace("index.html");
  }, 800);
};

//total price setup
let totalPrice = localStorage.getItem("disprice");
totalPriceSetup();
function totalPriceSetup() {
  if (totalPrice != null || totalPrice != "") {
    totalProductPriceDiv.innerText = `${totalPrice}`;
    orderTotalDiv.innerText = `${totalPrice}`;
  } else {
    totalProductPriceDiv.innerText = `₹0`;
    orderTotalDiv.innerText = `₹0`;
  }
}
///dim function
checkButton1.addEventListener("click", () => {
  if (checkButton1.checked) {
    debitCardInput.classList.add("dim");
    cashOnDeliveryDiv.classList.remove("dim");
    inputTags.classList.add("add");
    fieldWarning.style.visibility = "hidden";
  }
});
checkButton2.addEventListener("click", () => {
  if (checkButton2.checked) {
    debitCardInput.classList.remove("dim");
    cashOnDeliveryDiv.classList.add("dim");
  }
});

//DebitCard function ;
payButton.addEventListener("click", () => {
  if (
    checkButton2.checked &&
    cardNumber.value != "" &&
    expiration.value != "" &&
    cvv.value != "" &&
    name.value != ""
  ) {
    fieldWarning.style.visibility = "hidden";
    debitCardInput.style.border = "none";
    debitCardInput.style.padding = "0";
    debitCardInput.innerHTML = `<div id=cardAdded><p id="cardAddedp">Card Added</p>
<button id=debitButton>✓</button>
</div>
`;
  } else if (checkButton2.checked == false) {
    fieldWarning.style.visibility = "hidden";
  } else if (
    checkButton2.checked &&
    cardNumber.value == "" &&
    expiration.value == "" &&
    cvv.value == "" &&
    name.value == ""
  ) {
    fieldWarning.innerText = `Fields cannot be empty!`;
    fieldWarning.style.visibility = "visible";
  } else {
    fieldWarning.innerText = `Enter a valid card`;
    fieldWarning.style.visibility = "visible";
  }
});
// Show the popup
continueButton.addEventListener("click", () => {
 if (
    cardNumber.value != "" &&
    expiration.value != "" &&
    cvv.value != "" &&
    name.value != ""&&checkButton2.checked
  ) {
    setTimeout(() => {
      popup.style.display = "block";
    }, 800);
  }
  if(checkButton1.checked){
    popup.style.display = "block";

  }
});
