class ScientificCalculator {
    constructor(historyElement, resultElement) {
        this.historyElement = historyElement;
        this.resultElement = resultElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand === '0' ? number : this.currentOperand.toString() + number;
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '0') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+': computation = prev + current; break;
            case '-': computation = prev - current; break;
            case '*': computation = prev * current; break;
            case '/': computation = prev / current; break;
            case '%': computation = prev % current; break;
            case '^': computation = Math.pow(prev, current); break;
            default: return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    performFunction(func) {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        switch (func) {
            case 'sin': this.currentOperand = Math.sin(current); break;
            case 'cos': this.currentOperand = Math.cos(current); break;
            case 'tan': this.currentOperand = Math.tan(current); break;
            case 'log': this.currentOperand = Math.log10(current); break;
            case 'ln': this.currentOperand = Math.log(current); break;
            case 'sqrt': this.currentOperand = Math.sqrt(current); break;
            case 'factorial': this.currentOperand = this.factorial(current); break;
            case 'exp': this.currentOperand = Math.exp(current); break;
            case 'reciprocal': this.currentOperand = 1 / current; break;
            case 'absolute': this.currentOperand = Math.abs(current); break;
        }
        this.updateDisplay();
    }

    factorial(n) {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    updateDisplay() {
        this.resultElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.historyElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.historyElement.innerText = '';
        }
    }
}

const historyElement = document.getElementById('history');
const resultElement = document.getElementById('result');
const calculator = new ScientificCalculator(historyElement, resultElement);

document.querySelector('.buttons').addEventListener('click', event => {
    if (event.target.matches('button')) {
        const button = event.target;
        const action = button.dataset.action;
        const content = button.textContent;

        if (!action) {
            calculator.appendNumber(content);
        } else if (['add', 'subtract', 'multiply', 'divide', 'percent', 'pow'].includes(action)) {
            calculator.chooseOperation(content);
        } else if (action === 'clear') {
            calculator.clear();
        } else if (action === 'delete') {
            calculator.delete();
        } else if (action === 'calculate') {
            calculator.compute();
        } else if (button.classList.contains('function')) {
            calculator.performFunction(action);
        } else if (button.classList.contains('constant')) {
            calculator.appendNumber(button.dataset.value);
        }
    }
});