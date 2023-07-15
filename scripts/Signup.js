let continueButton = document.querySelector(".button");
let numberInput = document.querySelector(
  "#signUpContent>div:nth-child(2)>input"
);
let inputDiv = document.getElementById("inputDiv");
let buttonDiv = document.getElementById("buttonDiv");
let heading = document.querySelector("h3");
let changeNumberButton = document.querySelector("h4");
let randomOtp1;
let randomOtp2;
let randomOtp3;
let randomOtp4;
let randomOtp5;
let randomOtp6;
//Change Number
changeNumberButton.addEventListener("click", () => {
  location.reload();
  window.localStorage.setItem("userNumber", "");
  changeNumberButton.classList.remove("visibility");
  heading.innerHTML = `Sign Up to view your profile`;
  inputDiv.innerHTML = `<input type="text" id="numberIp" placeholder="Phone Number" />`;
  buttonDiv.innerHTML = `<button class="button">Continue</button>`;
});

// Catching phone number
continueButton.addEventListener("click", (e) => {
  if (numberInput.value.length === 10) {
    inputDiv.innerHTML = `
          <input type="text" id="ist" class="otpIp" maxlength = "1" onkeyup="clickEvent(this,'sec')">
          <input type="text" id="sec" class="otpIp" maxlength = "1" onkeyup="clickEvent(this,'third')">
          <input type="text" id="third" class="otpIp" maxlength = "1" onkeyup="clickEvent(this,'fourth')">
          <input type="text" id="fourth" class="otpIp" maxlength = "1" onkeyup="clickEvent(this,'fifth')">
          <input type="text" id="fifth" class="otpIp" maxlength = "1" onkeyup="clickEvent(this,'sixth')">
          <input type="text" id="sixth" class="otpIp" maxlength = "1" onkeyup="">
          `;
    randomOtp1 = Math.floor(Math.random() * 10);
    randomOtp2 = Math.floor(Math.random() * 10);
    randomOtp3 = Math.floor(Math.random() * 10);
    randomOtp4 = Math.floor(Math.random() * 10);
    randomOtp5 = Math.floor(Math.random() * 10);
    randomOtp6 = Math.floor(Math.random() * 10);
    let generatedOtp = `Your otp is ${randomOtp1 + "" + randomOtp2 + "" + randomOtp3 + "" + randomOtp4 + "" + randomOtp5 + "" + randomOtp6}`
    changeNumberButton.classList.add("visibility");
    heading.classList.remove("addRed");
    window.localStorage.setItem("userNumber", numberInput.value);
    buttonDiv.innerHTML = `<button class="button2">Verify</button>`;
    heading.innerHTML = `Enter OTP sent To ${numberInput.value}`;
    setTimeout(()=>{  
      alert(generatedOtp);
    },500)
   
    add();
  } else {
    changeNumberButton.classList.remove("visibility");
    heading.classList.add("addRed");
    heading.innerHTML = `Wrong number please try again`;
  }
});

///otpFunction
function clickEvent(first, last) {
  if (first.value.length) {
    document.getElementById(last).focus();
  }
}

// otp diaplay
//Catching OTP value
function add() {
  let verifyButton = document.querySelector(".button2");
  let otpVal1 = document.getElementById("ist");
  let otpVal2 = document.getElementById("sec");
  let otpVal3 = document.getElementById("third");
  let otpVal4 = document.getElementById("fourth");
  let otpVal5 = document.getElementById("fifth");
  let otpVal6 = document.getElementById("sixth");
  verifyButton.addEventListener("click", () => {
    let OTP =
      otpVal1.value +
      otpVal2.value +
      otpVal3.value +
      otpVal4.value +
      otpVal5.value +
      otpVal6.value;
    let generatedOtp = `${randomOtp1 + "" + randomOtp2 + "" + randomOtp3 + "" + randomOtp4 + "" + randomOtp5 + "" + randomOtp6}`
    if (OTP ==generatedOtp) {
      heading.classList.remove("addRed");
      heading.classList.add("addGreen");
      heading.innerHTML = `OTP verification successful`;
      setTimeout(() => {
        location.replace("index.html");
      }, 1500);
    } else {
      heading.classList.remove("addGreed");
      heading.classList.add("addRed");
      heading.innerHTML = `Incorrect OTP please try again`;
    }
  });
}
