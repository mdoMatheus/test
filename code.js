const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const teclas = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "%", "/", "*", "-", "+", "Enter", "Backspace", "Escape", "Shift", "="];
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

// Define a função para calcular com base no botão clicado ou tecla pressionada.
const calculate = (inputValue) => {
  display.focus();

  if (inputValue === "." && output.endsWith(".")) return;
  

  if (inputValue === "=" && output !== "") {
    if (output.includes("/0")) {
      output = "∞";
    } else {
      try {
        output = eval(output.replace('%', "/100"));
      } catch (error) {
        output = "Error";
      }
    }
  } else if (inputValue === "AC") {
    output = "";
  } else if (inputValue === "DEL") {
    output = output.toString().slice(0, -1);
  } else {
    if (output === "" && specialChars.includes(inputValue) && inputValue !== "-" && inputValue !== "%") return;
    output += inputValue;
  }
  display.value = output;
};

// Adiciona um event listener para cada botão, chamando a função calculate()
buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

// Adiciona um event listener para os botẽos do teclado.
document.addEventListener('keydown', (e) => {
  // Previne a ação padrão para evitar digitar dentro do campo de input.
  if (teclas.includes(e.key)) {
    e.preventDefault();
  }

  // Verifica se a tecla pressionada é válida.
  if (!teclas.includes(e.key)) {
    output = "Error";
    display.value = output;
    return;
  }

  // Executa a função calculate() com base na tecla pressionada.
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
    // Não é necessário um caso padrão
  }
});
