//functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "error" : a / b);

let firstNumber = null;
let secondNumber = null;
let operator = "";

const operate = (a, b, operator) => {
	if (operator === "+") return add(a, b);
	else if (operator === "-") return subtract(a, b);
	else if (operator === "*") return multiply(a, b);
	else if (operator === "/") return divide(a, b);
	else return;
};
