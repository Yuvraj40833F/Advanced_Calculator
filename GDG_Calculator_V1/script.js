const display = document.getElementById("display");
let resultDisplayed = false;

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const expression = display.value;

        if (!/^[0-9+\-*/.\s]+$/.test(expression)) {
            display.value = "ERROR!";
            return;
        }

        const result = Function('"use strict"; return (' + expression + ')')();

        if (!Number.isFinite(result)) {
            display.value = "ERROR!";
            return;
        }

        display.value = String(result);
    } catch {
        display.value = "ERROR!";
    }
}
