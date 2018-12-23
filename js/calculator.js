"use strict";
/**
 * Declare a function named `calculatorModule`
 * this function will have two private variables declared inside of it.
 * @variable PRIVATE { Number } `memory`
 * @variable PRIVATE { Number } `total`
 * @return {object} `calculator` object that can be used
 */
var calculator = (function() {
  let memory = 0;
  let total = 0;
  function validateNumeric(n) {
    n = n.match(/[0-9]/g);
    // if (!(typeof n === "number")) {
    //   throw error;
    // }
    // return;
  }

  // var calculator = (function() {
  /**
   * sets the `total` to the number passed in
   * @param  { Number } x
   * @return { Number }    current total
   */
  function load(x) {
    validateNumeric(x);
    this.total = x;
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
    validateNumeric(x);
    // console.log(this.total);
    // console.log(x);
    // console.log("adding " + x.toString() + " to " + this.total.toString());
    // this.total += parseFloat(x);
    this.total = +this.total + +x;
    // console.log("total: " + this.total);
    return this.total;
  }

  /**
   * Subtracts the value passed in from `total`
   * @param  { Number } x
   */
  function subtract(x) {
    validateNumeric(x);

    this.total = +this.total - +x;
    return this.total;
  }
  /**
   * Multiplies the value by `total`
   * @param  { Number } x
   */
  function multiply(x) {
    validateNumeric(x);

    this.total = +this.total * +x;
    console.log("total: " + this.total);
    return this.total;
  }
  /**
   * Divides the value passing in by `total`
   * @param  { Number } x
   */
  function divide(x) {
    validateNumeric(x);

    // if (x === 0) {
    //   throw error;
    // }
    this.total = +this.total / +x;
    console.log("total: " + this.total);
    return this.total;
  }
  /**
   * Return the value stored at `memory`
   * @return { Number }
   */
  function recallMemory() {
    return this.memory;
  }
  /**
   * Stores the value of `total` to `memory`
   */
  function saveMemory() {
    this.memory = this.total;
  }
  /**
   * Clear the value stored at `memory`
   */

  function clearMemory() {
    this.memory = 0;
  }
  return {
    load: load,
    clear: clearMemory,
    save: saveMemory,
    balance: getTotal,
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide
  };
})();

/**
 * Validation
 */
//   return calculator;
// }
