class Calculator {
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
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
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
const calculator = new Calculator(historyElement, resultElement);

document.querySelector('.buttons').addEventListener('click', event => {
    if (event.target.matches('button')) {
        const button = event.target;
        const action = button.dataset.action;
        const content = button.textContent;

        if (!action) {
            calculator.appendNumber(content);
        } else if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide' || action === 'percent') {
            calculator.chooseOperation(content);
        } else if (action === 'clear') {
            calculator.clear();
        } else if (action === 'delete') {
            calculator.delete();
        } else if (action === 'calculate') {
            calculator.compute();
        }
    }
});