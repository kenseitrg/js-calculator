let operations = [];
let done = false;

function initContent() {
    const buttons = document.getElementsByTagName("button");
    Array.from(buttons).forEach((button) => {
        button.addEventListener("click", (e) => {
            return printValue(e.target.textContent);
        });
    });
    document.getElementById("plus").addEventListener("click", pressOperation);
    document.getElementById("minus").addEventListener("click", pressOperation);
    document.getElementById("multiply").addEventListener("click", pressOperation);
    document.getElementById("divide").addEventListener("click", pressOperation);
    document.getElementById("equals").addEventListener("click", pressOperation);
}

function printValue(text) {
    const inputArea = document.getElementById("output");
    if (done) {
        inputArea.textContent = text;
    }
    else {
        const tmp = inputArea.textContent;
        inputArea.textContent = tmp + text;
    }
    done = false;
    return 0;
    
}

function pressOperation(event) {
    const inputArea = document.getElementById("output");
    const digit = inputArea.textContent.split(/-|\+|\/|\*|=/).filter((val) => {
        return (val != "");
    }).pop();
    operations.push({
        "value": parseFloat(digit),
        "operation": event.target.id
    });
    if (event.target.id == "equals") {
        calculateAnswer();
    }
    return 0;
}

function calculateAnswer() {
    const inputArea = document.getElementById("output");
    const opeartionsMap = {
        "plus": (prev, next) => {return prev+next;},
        "minus": (prev, next) => {return prev-next;},
        "multiply": (prev, next) => {return prev*next;},
        "divide": (prev, next) => {return prev/next;},
        "equals": (prev,next) => {return prev;}
    };
    const result = operations.reduce((acc, next) => {
        acc["value"] = opeartionsMap[acc["operation"]](acc["value"], next["value"]);
        acc["operation"] = next["operation"];
        return acc;
    });
    operations = [];
    if (result["value"] == "Infinity") {
        inputArea.textContent = "Division by zero error";
    }
    else {
        const tmp = inputArea.textContent;
        inputArea.textContent = tmp + result["value"];
    }
    done = true;
    return 0;
}
window.addEventListener("load", initContent);