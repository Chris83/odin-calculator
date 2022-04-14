const equation = [];
var freshInput = true;

function NumberClick(e, key=null) {
   const screen = document.querySelector(".screen");
   // handle a keypress
   if(key != null){
      if(freshInput) {
         freshInput = false;
         screen.innerText = key;
      } else {
         screen.innerText = screen.innerText + key;
      }
      return;
   }
   // handle a click
   if(freshInput) {
      freshInput = false;
      screen.innerText = e.innerText;
   } else {
      screen.innerText = screen.innerText + e.innerText;
   }
}
function DecimalClick(){
   const screen = document.querySelector(".screen");
   if(screen.innerText.includes('.')) return;
   if(freshInput) {
      screen.innerText = "0.";
   } else {
      screen.innerText += ".";
   }
   freshInput = false;
}

function ClearClick(){
   const screen = document.querySelector(".screen");
   screen.innerText = '';
   equation.length = 0;
   freshInput = true;
}

function OperatorClick(e, key=null){
   const screen = document.querySelector(".screen");
   if(screen.innerText == '') return;

   // handle keypress
   if(key != null){
      if(equation[0] == undefined) { 
         equation[0] = +screen.innerText;
         equation[1] = key;
      } else {
         equation[0] = ClampDigits(Operate(equation[0], equation[1], +screen.innerText));
      }
      equation[1] = key;
      screen.innerText = equation[0];
      if(screen.innerText == "Nope, try again") equation.length = 0;
      freshInput = true;

      return
   }

   // handle click
   if(equation[0] == undefined) { 
      equation[0] = +screen.innerText;
      equation[1] = e.innerText;
   } else {
      equation[0] = ClampDigits(Operate(equation[0], equation[1], +screen.innerText));
   }
   equation[1] = e.innerText;
   screen.innerText = equation[0];
   if(screen.innerText == "Nope, try again") equation.length = 0;
   freshInput = true;
}

function EqualsClick(){
   const screen = document.querySelector(".screen");

   equation[0] = ClampDigits(Operate(equation[0], equation[1], +screen.innerText));
   if(isNaN(equation[0])) {
      if(equation[0] == "Nope, try again") screen.innerText = equation[0];
      equation.length = 0;
   } else {
      screen.innerText = equation[0];
      equation.length = 0;
   }
   freshInput = true;
}

function BackspaceClick(){
   const screen = document.querySelector(".screen");
   if(screen.innerText == '') return;
   screen.innerText = screen.innerText.slice(0, -1);
}

function ToggleNegative(){
   const screen = document.querySelector(".screen");
   if(screen.innerText[0] == "-"){
      screen.innerText = screen.innerText.substring(1);
   } else {
      screen.innerText = "-" + screen.innerText;
   }
   freshInput = false;
}

function Add(a, b) {
   return +a + +b;
}

function Subtract(a, b) {
   return a - b;
}

function Multiply(a, b) {
   return a * b;
}

function Divide(a, b) {
   return a / b;
}

function Operate(a, operator, b) {
   if(operator == "+") return Add(a, b);
   if(operator == "-") return Subtract(a, b);
   if(operator == "×") return Multiply(a, b);
   if(operator == "÷"){ return (b == 0) ? "Nope, try again" : Divide(a, b);}
}

function ClampDigits(number){
   if(number == "Nope, try again") return number;
   let digits = (number + '').split('.');
   if(digits[0].length > 16){
      ClearClick();
      return "ERROR";
   } else if (digits[1] != undefined && ((digits[0].length + digits[1].length) > 15)){
      return Math.round(number*10**(16 - digits[0].length))/10**(16 - digits[0].length);
   }
   return +number;
}

// keyboard support
var buttons = {};
var repeated;

function InitKeyboardSupport(){
   const btns = document.querySelectorAll(".btn");

   for(let i=0; i<btns.length; i++){
      if(btns[i].innerText == "C") buttons["Delete"] = btns[i];
      if(btns[i].innerText == "←") buttons["Backspace"] = btns[i];
      if(btns[i].innerText == "=") buttons["Enter"] = btns[i];
      if(btns[i].innerText == "+/-") buttons["F9"] = btns[i];
      if(btns[i].innerText == "×") {
         buttons["×"] = btns[i];
         buttons["*"] = btns[i];
      }
      buttons[btns[i].innerText] = btns[i];
   }
}

InitKeyboardSupport();

document.addEventListener('keydown', function(e) {
   if (e.repeat != undefined) {
      repeated = !e.repeat;
    }
    if (!repeated) return;
    repeated = false;

    // number presses
    const numbers = new RegExp('^[0-9]$');
    if(numbers.test(e.key) || e.key == '.'){
       NumberClick(e, e.key);
       buttons[e.key].classList.add("active");
    }

    switch(e.key){
       case "Backspace":
          BackspaceClick();
          buttons["Backspace"].classList.add("active");
          break;
      case "Enter":
         EqualsClick();
         buttons["Enter"].classList.add("active");
         break;
      case "Delete":
         ClearClick();
         buttons["Delete"].classList.add("active");
         break;
      case "+":
         OperatorClick(e, e.key);
         buttons[e.key].classList.add("active");
         break;
      case "-":
         OperatorClick(e, e.key);
         buttons[e.key].classList.add("active");
         break;
      case "*":
         OperatorClick(e, "×");
         buttons["×"].classList.add("active");
         break;
      case "/":
         OperatorClick(e, "÷");
         buttons[e.key].classList.add("active");
         break;
      case "F9":
         ToggleNegative();
         buttons["F9"].classList.add("active");
         break;
      default:
         return;
    }
});

document.addEventListener('keyup', function(e) {
   repeated = true;

   // number presses
   const numbers = new RegExp('^[0-9]$');
   if(numbers.test(e.key) || e.key == '.'){
      buttons[e.key].classList.remove("active");
   }

   switch(e.key){
      case "Backspace":
         buttons["Backspace"].classList.remove("active");
         break;
      case "Delete":
         buttons["Delete"].classList.remove("active");
         break;
      case "Enter":
         buttons["Enter"].classList.remove("active");
         break;
      case "×":
         buttons["×"].classList.remove("active");
         break;
      case "F9":
         buttons["F9"].classList.remove("active");
         break;
      default:
         break;
   }
});