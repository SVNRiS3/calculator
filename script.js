//TODO: SUPPORT FOR FLOATING POINT NUMBERS

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
	else if ("xX*".includes(operator)) return multiply(a, b).toFixed(4);
	else if (operator === "/") return divide(a, b).toFixed(4);
	else return;
};

const clearData = (clearDisplay) => {
	firstNumber = "";
	secondNumber = "";
	operator = "";
	if (clearDisplay) {
		displayValue = 0;
	}
};

const checkCurrentNumber = () => {
	if (displayValue === 0 && !secondNumber) return 1;
	if (secondNumber) return 2;
};

const handleErase = () => {
	if (checkCurrentNumber() === 1) {
		firstNumber = firstNumber.length === 1 ? "0" : firstNumber.slice(0, -1);
		calculatorScreen.textContent = +firstNumber;
	} else if (checkCurrentNumber() === 2) {
		secondNumber =
			secondNumber.length === 1 ? "0" : secondNumber.slice(0, -1);
		calculatorScreen.textContent = +secondNumber;
	}
};

const handleFloat = () => {
	if (checkCurrentNumber() === 1 && !firstNumber.includes(".")) {
		firstNumber += ".";
		calculatorScreen.textContent = firstNumber;
	} else if (checkCurrentNumber() === 2 && !secondNumber.includes(".")) {
		secondNumber += ".";
		calculatorScreen.textContent = secondNumber;
	}
};

const handleInput = (inputValue) => {
	if (inputValue === "C") {
		clearData(true);
		calculatorScreen.textContent = +displayValue;
	} else if (
		displayValue === 0 &&
		operator === "" &&
		(inputValue >= 0 || inputValue <= 9)
	) {
		firstNumber += inputValue;
		calculatorScreen.textContent = firstNumber;
	} else if (operator && (inputValue >= 0 || inputValue <= 9)) {
		secondNumber += inputValue;
		calculatorScreen.textContent = secondNumber;
	} else if (
		"+-/xX*".includes(inputValue) &&
		firstNumber &&
		secondNumber &&
		operator
	) {
		displayValue = operate(+firstNumber, +secondNumber, operator);
		calculatorScreen.textContent = displayValue;
		operator = inputValue;
		firstNumber = displayValue;
		secondNumber = "";
	} else if ("+-/xX*".includes(inputValue) && firstNumber) {
		operator = inputValue;
		calculatorScreen.textContent = 0;
	} else if ("=ENTER".includes(inputValue) && secondNumber) {
		displayValue = operate(+firstNumber, +secondNumber, operator);
		calculatorScreen.textContent = +displayValue;
		clearData(false);
		firstNumber = displayValue;
	} else if ("<-BACKSPACE".includes(inputValue)) {
		handleErase();
	} else if (inputValue === ".") {
		handleFloat();
	}
};

calculatorButtons.forEach((button) => {
	button.addEventListener("mouseup", (e) => {
		const buttonContent = e.target.textContent;
		handleInput(buttonContent);
	});
});

document.addEventListener("keyup", (e) => {
	handleInput(e.key.toUpperCase());
});
