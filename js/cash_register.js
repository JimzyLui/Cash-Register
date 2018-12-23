"use strict";
var register = (function() {
  let memory = 0;
  let total = 0;
  // function validateNumeric(n) {
  //   n = n.match(/[0-9]/g);
  //   return n;
  // }

  /**
   * sets the `total` to the number passed in
   * @param  { Number } x
   * @return { Number }    current total
   */
  function load(x) {
    // x = validateNumeric(x);
    x = Number(x);
    this.total = x | 0;
    // console.log("loaded: " + x);
    return this.total;
  }

  /**
   * Return the value of `total`
   * @return { Number }
   */
  function getTotal() {
    return this.total;
  }

  /**
   * Sums the value passed in with `total`
   * @param { Number } x
   */
  function add(x) {
    console.log("Running Total: " + this.total);
    console.log("Deposit Total: " + x);

    // x = validateNumeric(x);
    this.total = +this.total + +x;
    console.log("Running Total: " + this.total);
    return this.total;
  }

  /**
   * Subtracts the value passed in from `total`
   * @param  { Number } x
   */
  function subtract(x) {
    // x = validateNumeric(x);

    this.total = +this.total - +x;
    console.log("Running Total: " + this.total);

    return this.total;
  }

  return {
    load: load,
    balance: getTotal,
    deposit: add,
    withdraw: subtract
  };
})();
const myRegister = register;
myRegister.load(0);
const myCalc = calculator;

var arrRegister = []; // used for building the number
var arrPreview = []; // used for the preview window
let iOperationCtr = 0;
var strOperation = ""; // stores that last operator
var accumulator = ""; //stores first number & running calcs
let bPeriod = false; // denotes if period is in use
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6");
const btn7 = document.getElementById("btn7");
const btn8 = document.getElementById("btn8");
const btn9 = document.getElementById("btn9");
const btn0 = document.getElementById("btn0");
const btn00 = document.getElementById("btn00");
const btnPeriod = document.getElementById("btnPeriod");
const btnClear = document.getElementById("btnClear");
const btnBalance = document.getElementById("btnBalance");
const btnDeposit = document.getElementById("btnDeposit");
const btnWithdraw = document.getElementById("btnWithdraw");
const btnMultiply = document.getElementById("btnMultiply");
const btnDivide = document.getElementById("btnDivide");
const btnSubtract = document.getElementById("btnSubtract");
const btnAdd = document.getElementById("btnAdd");
const btnEquals = document.getElementById("btnEquals");
const cScreen = document.getElementById("screen");
const cScreenPreview = document.getElementById("screenPreview");
const drawer = document.getElementById("drawer");
btn1.addEventListener("click", insertNumber);
btn2.addEventListener("click", insertNumber);
btn3.addEventListener("click", insertNumber);
btn4.addEventListener("click", insertNumber);
btn5.addEventListener("click", insertNumber);
btn6.addEventListener("click", insertNumber);
btn7.addEventListener("click", insertNumber);
btn8.addEventListener("click", insertNumber);
btn9.addEventListener("click", insertNumber);
btn0.addEventListener("click", insertNumber);
btn00.addEventListener("click", insertNumber);
btnPeriod.addEventListener("click", insertNumber);
btnClear.addEventListener("click", clearScreen);
btnDivide.addEventListener("click", calcButtonPressed);
btnMultiply.addEventListener("click", calcButtonPressed);
btnSubtract.addEventListener("click", calcButtonPressed);
btnAdd.addEventListener("click", calcButtonPressed);
btnEquals.addEventListener("click", calcButtonPressed);
btnBalance.addEventListener("click", processRegisterEvents);
btnDeposit.addEventListener("click", processRegisterEvents);
btnWithdraw.addEventListener("click", processRegisterEvents);
btnDeposit.addEventListener("click", openRegisterDrawer);
btnWithdraw.addEventListener("click", openRegisterDrawer);
drawer.addEventListener("click", closeRegisterDrawer);
// document.addEventListener("keypress", showKey);
window.addEventListener("keypress", processKeyboardInput);
window.addEventListener("click", function() {
  console.log(arrPreview.join(" "));
});
function showKey(event) {
  alert(event.key);
}
function flushPreview() {
  arrPreview.length = 0;
}
function flushAccumulator() {
  accumulator = "";
}
function processKeyboardInput(event) {
  const arrKeys = "0123456789.+-/*=".split("");
  arrKeys.push("ENTER");
  // console.log(arrKeys);
  let key = event.key;
  if (arrKeys.includes(key)) {
    switch (key) {
      case "0":
        btn0.click();
        break;
      case "1":
        btn1.click();
        break;
      case "2":
        btn2.click();
        break;
      case "3":
        btn3.click();
        break;
      case "4":
        btn4.click();
        break;
      case "5":
        btn5.click();
        break;
      case "6":
        btn6.click();
        break;
      case "7":
        btn7.click();
        break;
      case "8":
        btn8.click();
        break;
      case "9":
        btn9.click();
        break;
      case ".":
        btnPeriod.click();
        break;
      case "+":
        btnAdd.click();
        break;
      case "-":
        btnSubtract.click();
        break;
      case "*":
        btnMultiply.click();
        break;
      case "/":
        btnDivide.click();
        break;
      case "=":
      case "ENTER":
        btnEquals.click();
        break;
    }
  }
}
function processRegisterEvents() {
  let curr = "";
  switch (this.id) {
    case "btnBalance":
      curr = myRegister.balance();
      accumulator = curr;
      sendToScreen(formatAsCurrency(curr));
      break;
    case "btnDeposit":
      myRegister.deposit(accumulator);
      clearScreen();
      break;
    case "btnWithdraw":
      myRegister.withdraw(accumulator);
      clearScreen();
      break;
  }
  flushPreview();
  flushAccumulator();
  console.log("Preview: " + arrPreview.join(" "));
}
closeRegisterDrawer();
// cScreen.innerHTML = "test";
function insertNumber() {
  const key = this.innerHTML;
  if (key === ".") {
    if (bPeriod === true) {
      // ignore input
      return;
    } else {
      bPeriod = true;
    }
  }
  arrRegister.push(this.innerHTML);
  // console.log(arrRegister);
  var val = arrRegister.join("");
  console.log("entered: " + val);
  // cScreen.innerHTML = val;
  sendToScreen(val);
}
function sendToScreen(strVal) {
  // const strCurr = formatAsCurrency(strVal);
  // cScreen.innerHTML = strCurr;
  cScreen.innerHTML = strVal;
}
/*
function formatAsCurrency2(strVal) {
  console.log("formatting as currency: " + strVal);
  var count = strVal.length;
  switch (count) {
    case 0:
      return "$ 0.00";
      break;
    case 1:
      return "$ 0.0" + strVal;
      break;
    case 2:
      return "$ 0." + strVal;
      break;
    default:
      const iDecimalPosition = count - 2;
      return (
        "$ " +
        strVal.slice(0, iDecimalPosition) +
        "." +
        strVal.slice(iDecimalPosition)
      );
  }
}
*/
const formatAsCurrency = val => {
  const curr = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
  return curr.format(val);
};
function saveNumber() {
  accumulator = arrRegister.join("");
  arrRegister = [];
  myCalc.load(accumulator);
  bPeriod = false; // reset Period in use
}
function clearScreen() {
  // calculator.clearMemory();
  arrRegister = [];
  arrRegister.length = 0;
  arrPreview.length = 0;
  accumulator = "";
  cScreenPreview.innerHTML = "";
  cScreen.innerHTML = formatAsCurrency(0);
  myCalc.clear();
}
function calcButtonPressed() {
  //first check if there's anything in the accumulator
  // if nothing, just save action
  if (arrRegister.length === 0 && accumulator === "") {
    // do nothing
  } else {
    if (accumulator !== "") {
      // first #'s there, now check if we're building a #
      if (arrRegister.length > 0) {
        const num2 = arrRegister.join("");
        pushToPreview(formatAsCurrency(num2));

        arrRegister = [];
        doCalculation(num2);
        strOperation = this.id;
        // alert(strOperation);
        showOperation(strOperation);
      } else {
        // change operation, but don't count it
        strOperation = this.id;
        showOperation(strOperation, true);
      }
    } else {
      saveNumber(); //first number entered
      const curr = formatAsCurrency(accumulator);
      sendToScreen(curr);
      strOperation = this.id;
      // alert(strOperation);
      pushToPreview(curr);
      showOperation(strOperation);
    }
  }
}
function pushToPreview(string, bOverwrite = false) {
  if (bOverwrite) {
    arrPreview.length = 0;
  }
  arrPreview.push(string);
  cScreenPreview.innerHTML = arrPreview.join(" ");
}
function showOperation(strKey, bReplace = false) {
  // strKey = strKey.slice(3);
  switch (strKey) {
    case "btnAdd":
      strKey = "+";
      break;
    case "btnSubtract":
      strKey = "-";
      break;
    case "btnMultiply":
      strKey = "x";
      break;
    case "btnDivide":
      strKey = "/";
      break;
    case "btnEquals":
      return;
      break;
  }
  if (bReplace) {
    var x = arrPreview.pop();
    console.log(x);
  }
  pushToPreview(strKey);
  // cScreenPreview.innerHTML = strKey;
}
function doCalculation(num2) {
  let strDisplay = "";
  switch (strOperation) {
    case "btnEquals":
      break;
    case "btnAdd":
      accumulator = myCalc.add(num2);
      break;
    case "btnSubtract":
      accumulator = myCalc.subtract(num2);
      break;
    case "btnMultiply":
      accumulator = myCalc.multiply(num2);
      break;
    case "btnDivide":
      accumulator = myCalc.divide(num2);
      break;
  }
  strDisplay = formatAsCurrency(accumulator);
  sendToScreen(strDisplay);
  pushToPreview(strDisplay, true);
  iOperationCtr--;
}

function openRegisterDrawer() {
  drawer.style.display = "block";
  drawer.innerHTML =
    '<i fas class="fas fa-dollar-sign"> <i fas class="fas fa-dollar-sign"> <i fas class="fas fa-dollar-sign"> <i fas class="fas fa-dollar-sign"> <i fas class="fas fa-dollar-sign"> <i fas class="fas fa-dollar-sign">';
}

function closeRegisterDrawer() {
  drawer.style.display = "none";
}
