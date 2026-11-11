const display = document.getElementById("display");
let resultDisplayed = false;

function appendValue(value){
    if (display.value==="ERROR!") {
        display.value="";
        resultDisplayed=false;
    }
    
    if (resultDisplayed) {
        if (value === "**2") {
            display.value += value;
            resultDisplayed= false;
            return;
        }

        if (["+", "-", "*", "/", "**"].includes(value)) {
            resultDisplayed = false;
        } else {
            display.value = "";
            resultDisplayed = false;
        }

    }

    display.value += value;
}


function clearDisplay() {
    display.value="";
    resultDisplayed=false;

}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    resultDisplayed=false;

}

function calculate() {
    try{
        const expression = display.value;
        if (!/^[0-9+\-*/.()\s]+$/.test(expression)) {
            display.value= "ERROR!"
            resultDisplayed=false;
            return;
        }

        const result = Function('"use strict"; return (' + expression + ')')();

        if (!Number.isFinite(result)) {
            display.value="ERROR!";
            resultDisplayed= false;
            return;
        }

        display.value=String(result);
        resultDisplayed=true

    } 
    catch{
        display.value="ERROR!";
        resultDisplayed=false;

    }
}
function squareRoot(){
    const value = Number(display.value);
    if(display.value ==="" || !Number.isFinite(value) || value < 0) {
        display.value = "ERROR!";
        resultDisplayed=false;
        return;
    }

    display.value= String(Math.sqrt(value));
    resultDisplayed=true
}

function appendParenthesis() {
    const expression = display.value;
    const openCount = (expression.match(/\(/g) || []).length;
    const closeCount = (expression.match(/\)/g) || []).length;

    if (
        expression === "" || /[+\-*/(]$/.test(expression) || openCount === closeCount) {
        appendValue("(");
    } else {
        appendValue(")");
    }
}

function toggleScientific(){
    const calculator = document.querySelector(".calculator");
    const scientificButtons=document.getElementById("scientificButtons");
    const toggleButton= document.getElementById("scientificToggle");
    scientificButtons.classList.toggle("show");
    calculator.classList.toggle("scientific-open");
    
    if(scientificButtons.classList.contains("show")) {
        toggleButton.textContent = "▲";
    } else {
        toggleButton.textContent = "▼";
    }
}


document.addEventListener("keydown", function(event) {

    const key = event.key;

    if ("0123456789.".includes(key)) {
        appendValue(key);
    }

    else if (["+", "-", "*", "/"].includes(key)) {
        appendValue(key);
    }

    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }

    else if (key === "Backspace") {
        event.preventDefault();
        deleteLast();
    }

    else if (key === "Escape") {
        event.preventDefault();
        clearDisplay();
    }

}
);

function calculatePercentage() {

    const expression = display.value;

    const match = expression.match(/(\d+\.?\d*)$/);

    if (!match) return;

    const lastNumber = Number(match[0]);
    const beforeNumber = expression.slice(0, match.index);

    const operator = beforeNumber.slice(-1);

    let percentage;

    if (operator === "+" || operator === "-") {

        const baseExpression = beforeNumber.slice(0, -1);
        const baseNumber = Function("return (" + baseExpression + ")")();

        percentage = baseNumber * lastNumber / 100;

    } else {

        percentage = lastNumber / 100;

    }

    display.value = beforeNumber + String(percentage);
    resultDisplayed=true;
}
