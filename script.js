const calculatorButtons = document.querySelectorAll(".calculator-button");
const calculatorScreen = document.querySelector(".calculator-screen");

//functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "error" : a / b);

let firstNumber = "";
let secondNumber = "";
let operator = "";
let displayValue = 0;

const operate = (a, b, operator) => {
	if (operator === "+") return add(a, b);
	else if (operator === "-") return subtract(a, b);
	else if (operator === "x") return multiply(a, b);
	else if (operator === "/") return divide(a, b);
	else return;
};

const clearData = () => {
	firstNumber = "";
	secondNumber = "";
	operator = "";
	displayValue = 0;
};

const handleInput = (inputValue) => {
	if (inputValue === "C") {
		clearData();
		calculatorScreen.textContent = displayValue;
	} else if (operator === "" && (inputValue >= 0 || inputValue <= 9)) {
		firstNumber += inputValue;
		calculatorScreen.textContent = firstNumber;
	} else if (operator && (inputValue >= 0 || inputValue <= 9)) {
		secondNumber += inputValue;
		calculatorScreen.textContent = secondNumber;
	} else if ("+-/x".includes(inputValue) && firstNumber) {
		operator = inputValue;
		calculatorScreen.textContent = 0;
	} else if (inputValue === "=" && secondNumber) {
		displayValue = operate(+firstNumber, +secondNumber, operator);
		calculatorScreen.textContent = displayValue;
		clearData();
	}
};

calculatorButtons.forEach((button) => {
	button.addEventListener("mouseup", (e) => {
		const buttonContent = e.target.textContent;
		handleInput(buttonContent);
	});
});
