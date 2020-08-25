var historyValue = document.getElementById("history-value");
var outputValue = document.getElementById("output-value");
var operatorValue = document.getElementsByClassName("operator");
var numberValue = document.getElementsByClassName("number");
var cnt = 0;
var c = 0;
var count = 0;

function getHistoryValue() {
    return historyValue.innerText;
}

function printHistory(num) {
    historyValue.innerText = num;
}

function getOutput() {
    return outputValue.innerText;
}

function printOutput(num) {
    if (num == "") {
        outputValue.innerText = num;
    }
    else {
        outputValue.innerText = getFormattedNumber(num);
    }
}

function getFormattedNumber(num) {
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}

for (var i = 0; i < operatorValue.length; i++) {
    operatorValue[i].addEventListener("click", function () {
        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        }
        else if (this.id == "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            if (output >= 0) {
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
            else {
                output = output.substr(0, output.length - 1);
                if (output == "-") {
                    printOutput("");
                    console.log(output);
                }
                else {
                    printOutput(output);
                }
            }
        }
        else {
            var output = getOutput();
            var history = getHistoryValue();
            count = count + 1;
            if ((this.id == "%" || this.id == "/" || this.id == "*" || this.id == "-" || this.id == "+") && (output == "")) {
                if (cnt == 0 && (output == "")) {
                    printHistory("");
                    printOutput("");
                    cnt = 1;
                }
            }
            else if (count >= 1 && this.id == "=" && output == "") {
                printOutput("");
                printHistory("");
            }
            else {
                if (output != "") {
                    output = reverseNumberFormat(output);
                    history = history + output;
                    if (this.id == "=") {
                        var result = eval(history);
                        printOutput(result);
                        printHistory("");
                    }
                    else {
                        history = history + this.id;
                        printHistory(history);
                        printOutput("");
                    }
                }
                else {
                    output = this.id;
                    printHistory("");
                    printOutput(output);
                }
            }

        }
    })
}

for (var i = 0; i < numberValue.length; i++) {
    numberValue[i].addEventListener("click", function () {
        var output = reverseNumberFormat(getOutput());
        if (output != NaN) {
            output = output + this.id;
            printOutput(output);
        }
    })
}   