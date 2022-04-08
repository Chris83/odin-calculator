function NumberClick(e) {
   const screen = document.querySelector(".screen");
   screen.innerText = screen.innerText + e.innerText;
}

function ClearClick(){
   operator = '';
   term = 0;
   const screen = document.querySelector(".screen");
   screen.innerText = '';
}