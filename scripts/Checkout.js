let name = document.querySelector("#name>input");
let phoneNumber = document.querySelector("#phoneNumber>input");
let houseNumber = document.querySelector("#houseInput>input");
let roadNumber = document.querySelector("#roadInput>input");
let pinCode = document.querySelector("#pincode>input");
let city = document.querySelector("#cityState>input:nth-child(1)");
let state = document.querySelector("#cityState>input:nth-child(2)");
let nearbyLocation = document.querySelector("#location>input");
let saveAddressButton = document.querySelector("#container3 button");
const contactDetailsDiv = document.getElementById("contactDetails");
const totalProductPriceDiv = document.querySelector(
  "#totalProductPriceDiv>p:last-child"
);
const orderTotalDiv = document.querySelector("#orderTotalDiv>h3:last-child");

// location.reload()
var userData = [];
//local storage setting if theres data
if (window.localStorage.getItem("userDetails") != "" && window.localStorage.getItem("userDetails") != null) {
  appendPanel();
}
let totalPrice = localStorage.getItem("disprice");
//total price setup
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
//save address function
saveAddressButton.addEventListener("click", () => {
  let userObj = {
    userName: name.value,
    phoneNumber: phoneNumber.value,
    houseNumber: houseNumber.value,
    roadNumber: roadNumber.value,
    pinCode: pinCode.value,
    city: city.value,
    state: state.value,
    nearbyLocation: nearbyLocation.value,
  };

  // userData.push(userObj)
  // console.log(userData);

  window.localStorage.setItem("userDetails", JSON.stringify(userObj));
  setTimeout(() => {
    location.href = "../Payment.html";
    if (window.localStorage.getItem("userDetails") != "") {
      // location.reload()
      appendPanel();
    }
  }, 1000);
});

//append panel
function appendPanel() {
  let userDetails = JSON.parse(window.localStorage.getItem("userDetails"));
  if (userDetails !== null || userDetails != "") {
    contactDetailsDiv.style.border = "none";
    contactDetailsDiv.style.height = "100%";
    contactDetailsDiv.style.padding = "25px";
    contactDetailsDiv.innerHTML = `<div id=userPanel>
    <a id="editAddress" href="">Edit Address</a>
  <h3>Name: ${userDetails.userName}</h3>
  <h4>Phone Number: ${userDetails.phoneNumber}</h4>
<p>House Number: ${userDetails.houseNumber}</p>
<p>Road Number: ${userDetails.roadNumber}</p>
<p>Pincode: ${userDetails.pinCode}</p>
<p>City: ${userDetails.city}</p>
<p>State: ${userDetails.state}</p>
<a href="../Payment.html">
<button>Continue</button>
</a>
  </div>`;
    editButtonEvent();
  }
}
//edit button function
function editButtonEvent() {
  let userPanel = document.getElementById("editAddress");
  userPanel.addEventListener("click", (e) => {
    e.preventDefault();
    window.localStorage.setItem("userDetails", "");
    location.reload();
  });
}
