class Calculator {
    constructor(previousOperatorTextElement, currentOperatorTextElement) {
        this.previousOperatorTextElement = previousOperatorTextElement
        this.currentOperatorTextElement = currentOperatorTextElement
        this.clear()
    }

    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
     //this function clears every number you typed in the screen
    delete() {
       this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    //this function clears one number at a time
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
       this.operation = operation
       this.previousOperand = this.currentOperand
       this.currentOperand = ''
    }
     //this function lets you chose want operation you want to type 
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
     //this function lets the operation buttons work when you click on them
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }
      //this function makes the number buttons to work so if you click on them they will show up on the screen

    updateDisplay() {
        this.currentOperatorTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperatorTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperatorTextElement.innerText = ''
      }
    }
  }
       //this function updates the display of the calculator, so everytime you press a number it updates the display so you can see it
    
    
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allclearButton = document.querySelector('[data-all-clear]')
const previousOperatorTextElement = document.querySelector('[data-previous-operand]')
const currentOperatorTextElement = document.querySelector('[data-current-operand]')
const calculator = new Calculator(previousOperatorTextElement, currentOperatorTextElement)

numberButtons.forEach(button => {
   button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
   })
})
    
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
       calculator.chooseOperation(button.innerText)
       calculator.updateDisplay()
    })
 })

 equalsButton.addEventListener('click' , button => {
     calculator.compute()
     calculator.updateDisplay()
 })
 allclearButton.addEventListener('click' , button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click' , button => {
    calculator.delete()
    calculator.updateDisplay()
})