// Select necessary elements
const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

// Initialize history array from localStorage
let history = JSON.parse(localStorage.getItem("calculatorHistory")) || [];

// Function to update the display
function appendValue(value) {
    display.value += value;
}


function calculate() {
    try {
        const result = eval(display.value); // Evaluate the expression
        if (result !== undefined) {
            addToHistory(display.value + " = " + result);
            display.value = result; // Display the result
        }
    } catch (error) {
        display.value = "Error"; // Handle invalid expressions
    }
}

function clearDisplay() {
    display.value = "";
}

function addToHistory(entry) {
    history.push(entry);
    localStorage.setItem("calculatorHistory", JSON.stringify(history));
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyList.innerHTML = "";
    history.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = entry;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteHistoryEntry(index);

        listItem.appendChild(deleteButton);
        historyList.appendChild(listItem);
    });
}

function deleteHistoryEntry(index) {
    history.splice(index, 1);
    localStorage.setItem("calculatorHistory", JSON.stringify(history));
    updateHistoryDisplay();
}

// Function to clear all history
function clearHistory() {
    history = [];
    localStorage.removeItem("calculatorHistory");
    updateHistoryDisplay();
}

// Load history on page load
updateHistoryDisplay();