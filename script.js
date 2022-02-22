class Calculator {
    constructor(previousOpText, currentOpText) {
        this.previousOpText = previousOpText;
        this.currentOpText = currentOpText;
        this.clear();
    }

    clear() {
        this.currentOp = '';
        this.previousOp = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOp = this.currentOp.slice(0, -1);
    }

    equal() {
        this.compute();
        this.previousOp = "";
        this.operation = undefined;
    }

    appendNumber(number) {
        if(number != '.'){
            this.currentOp = `${this.currentOp}${number}`;
        } else if(!this.currentOp.includes('.') && this.currentOp.length >0){
            this.currentOp = `${this.currentOp}${number}`;
            } else {
                this.currentOp = `0${number}`
            }
    }

    chooseOperation(operation) {
        if(this.operation == null && this.currentOp > 0){
            this.operation = operation;
            this.previousOp = `${this.currentOp}`;
            this.currentOp = "";
        } else if(this.currentOp.length > 0){
            this.compute();
            this.operation = operation;
            this.previousOp = this.currentOp;
            this.currentOp = "";
        } else if(this.previousOp > 0){
            this.operation = operation;
        }
        
    }

    compute() {
        switch(this.operation) {
            case '/':
                if(this.currentOp != 0){
                    this.currentOp = this.previousOp / this.currentOp;
                }
                break;
            case '*':
                this.currentOp = this.previousOp * this.currentOp;
                break;
            case '+':
                this.currentOp = Number(this.previousOp) + Number(this.currentOp);
                break;
            case '-':
                this.currentOp = this.previousOp - this.currentOp;
                break;
        }
    }

    updateDisplay() {
        this.currentOpText.innerText = this.currentOp;
        
        if(this.operation != null){
            this.previousOpText.innerText = `${this.previousOp} ${this.operation}`;
        } else {
            this.previousOpText.innerText = this.previousOp;
        }
    }
}

window.onload = function() {
    const numberButtons = document.querySelectorAll('[data-num]');
    const operationButtons = document.querySelectorAll('[data-op]');
    const allClearButton = document.querySelector('[data-clear]');
    const deleteButton = document.querySelector('[data-delete]');
    const equalsButton = document.querySelector('[data-equal]');
    const previousOpText = document.querySelector('[data-previousOp]');
    const currentOpText = document.querySelector('[data-currentOp]');

    const calculator = new Calculator(previousOpText, currentOpText);

    numberButtons.forEach(button => {
        button.addEventListener('click', function() {
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();
        });
    });

    allClearButton.addEventListener('click', function() {
        calculator.clear();
        calculator.updateDisplay();
    });

    deleteButton.addEventListener('click', function() {
        calculator.delete();
        calculator.updateDisplay();
    });   

    equalsButton.addEventListener('click', function() {
        calculator.equal();
        calculator.updateDisplay();
    });   

    operationButtons.forEach(button => {
        button.addEventListener('click', function() {
            calculator.chooseOperation(button.innerText);
            calculator.updateDisplay();
        });
    });


}

