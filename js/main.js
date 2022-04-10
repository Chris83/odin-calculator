const equation = [];
var freshInput = true;

function NumberClick(e) {
   const screen = document.querySelector(".screen");
   if(freshInput) {
      freshInput = false;
      screen.innerText = e.innerText;
   } else {
      screen.innerText = screen.innerText + e.innerText;
   }

}

function ClearClick(){
   const screen = document.querySelector(".screen");
   screen.innerText = '';
   equation.length = 0;
   freshInput = true;
}

function OperatorClick(e){
   const screen = document.querySelector(".screen");
   if(equation[0] == undefined) { 
      equation[0] = +screen.innerText;
      equation[1] = e.innerText;
   } else {
      equation[0] = ClampDigits(Operate(equation[0], equation[1], +screen.innerText));
   }
   equation[1] = e.innerText;
   screen.innerText = equation[0];
   freshInput = true;
}

function EqualsClick(){
   const screen = document.querySelector(".screen");

   equation[0] = ClampDigits(Operate(equation[0], equation[1], +screen.innerText));
   if(isNaN(equation[0])) {
      equation.length = 0;
   } else {
      screen.innerText = equation[0];
      equation.length = 0;
      freshInput = true;
   }
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
   if(operator == "÷") return Divide(a, b);
}

function ClampDigits(number){
   let digits = (number + '').split('.');
   if(digits[0].length > 16){
      ClearClick();
      return "ERROR";
   } else if (digits[1] != undefined && ((digits[0].length + digits[1].length) > 15)){
      console.log((digits[0].length + digits[1].length));
      console.log(number)
      return Math.round(number*10**(16 - digits[0].length))/10**(16 - digits[0].length);
   }
   return +number;
}