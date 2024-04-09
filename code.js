const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

// Define function to calculate based on button clicked or key pressed.
const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    // If output has '%', replace with '/100' before evaluating.
    try {
      output = eval(output.replace('%', "/100"));
    } catch (error) {
      output = "Error";
    }
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    // If DEL button is clicked or backspace pressed, remove the last character from the output.
    output = output.toString().slice(0, -1);
  } else {
    // If output is empty and button is specialChars then return
    if (output === "" && specialChars.includes(btnValue) && btnValue !== "-" && btnValue !== "%") return;
    output += btnValue;
  }
  display.value = output;
};

// Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
  // Prevent the default action to stop typing inside the input field
  if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "%", "/", "*", "-", "+", "Enter", "Backspace", "Escape", "Shift", "="].includes(e.key)) {
    e.preventDefault();
  }

  if (!["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "%", "/", "*", "-", "+", "Enter", "Backspace", "Escape", "Shift", "="].includes(e.key)) {
    output = "Error";
    display.value = output;
    return;
  }

  switch (e.key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '.':
    case '%':
    case '/':
    case '*':
    case '-':
    case '+':
      calculate(e.key);
      break;
    case 'Enter':
      calculate('=');
      break;
    case 'Backspace':
      calculate('DEL');
      break;
    case 'Escape':
      calculate('AC');
      break;
    // No default case needed
  }
});

