const display = document.querySelector('h1');
const parentBtn = document.querySelector('main');
const footer = document.querySelector('footer');
const list = document.querySelector('ul');
const ac = document.querySelector('.ac');

const calculated = [];
const orderOfOperations = [];
let equation = [];
let total = 0;
let reset = false;

const showList = () => {
	const equation = calculated[calculated.length - 1];
	const li = document.createElement('li');
	li.textContent = equation;
	list.appendChild(li);
};

const onClear = () => (ac.textContent = equation.length === 0 ? 'AC' : 'C');

const onCalculate = (e) => {
	if (e.target.matches('button')) {
		getBtnText(e.target.textContent);
		onClear();
	}

	if (calculated.length !== 0) footer.classList.remove('hidden');
};

const calculateTotal = (value, nextOperation) => {
	reset = true;
	let output;

	const operation = orderOfOperations.pop();
	switch (operation) {
		case '+':
			total = total + value;
			break;
		case '−':
			total = total - value;
			break;
		case '÷':
			total = total / value;
			break;
		case '×':
			total = total * value;
			break;
		default:
			total = value || 0;
			break;
	}
	output = total;

	if (nextOperation !== '=') {
		equation.push(value, nextOperation);
		orderOfOperations.push(nextOperation);
	} else {
		calculated.push(`${equation.join(' ')} ${value} ${nextOperation} ${total}`);
		equation = [];
		showList();
	}
	console.log(calculated);
	return output;
};

const getBtnText = (name) => {
	let valueToDisplay;

	if (reset) {
		reset = false;
		display.textContent = '0';
	}

	switch (name) {
		case '+':
		case '−':
		case '÷':
		case '×':
		case '=':
			valueToDisplay = calculateTotal(parseFloat(display.textContent), name);
			break;
		case 'AC':
			valueToDisplay = '0';
			equation = [];
			total = 0;
			break;
		case 'C':
			if (display.textContent === '0') {
				equation.pop();
				equation.pop();
			}
			valueToDisplay = '0';
			break;
		case '+/-':
			valueToDisplay = (parseFloat(display.textContent) * -1).toString();
			break;
		case '%':
			valueToDisplay = (parseFloat(display.textContent) / 100).toString();
			break;
		case '.':
			if (!display.textContent.includes('.')) valueToDisplay = display.textContent.concat('.');
			break;
		default:
			if (display.textContent === '0') {
				valueToDisplay = name;
			} else {
				valueToDisplay = display.textContent.concat(name);
			}
			break;
	}
	if (!!valueToDisplay) display.textContent = valueToDisplay;
};

parentBtn.addEventListener('click', onCalculate);
