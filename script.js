let numberButtons= document.querySelectorAll(".number");
let displayOperation= document.querySelector(".upper-line");
let displayTotal= document.querySelector(".lower-line");
let clearBtn= document.querySelector(".clear");
let equalBtn= document.querySelector(".equal");
let deleteNumBtn= document.getElementById("delete");
let pointBtn= document.querySelector(".point");
let operators= document.querySelectorAll(".operator");

let firstOperand='';
let secondOperand='';
let operator= null;
let shouldResetScreen= false;

operators.forEach(operator => operator.addEventListener('click', ()=> equationSetup(operator.textContent)));
numberButtons.forEach(button => button.addEventListener('click', () => displayNums(button.textContent)));
equalBtn.onclick= () =>evaluate();
clearBtn.onclick= ()=> clear();
deleteNumBtn.onclick= ()=> deleteNum();
pointBtn.onclick= ()=> appendPoint();

function clear(){
   displayOperation.textContent= "";
   displayTotal.textContent= "0";
   operator= null;
   firstOperand= '';
   secondOperand= '';
}

function deleteNum(){
  let nums= displayTotal.textContent;
  displayTotal.textContent= nums.toString().slice(0,-1);
}

function add(a,b){
  return a + b; 
}

function substract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function percentage(a,b){
    return a % b;
}

function displayNums(number){
  if(displayTotal.textContent === '0'|| shouldResetScreen){
    resetScreen()
  }
  displayTotal.textContent += number;
}

function resetScreen(){
  displayTotal.textContent = '';
  shouldResetScreen= false;
}

function equationSetup(op){
  if(operator !== null) evaluate();
  firstOperand = displayTotal.textContent;
  operator= op;
  displayOperation.textContent= `${firstOperand} ${operator}`;
  shouldResetScreen = true;
}

function evaluate(){
  if(operator === null || shouldResetScreen)return;
  if(operator === '÷' && displayTotal.textContent === '0'){
    alert("you can't divide by 0");
    return
  }
  secondOperand= displayTotal.textContent;
  displayTotal.textContent= roundNumber(operate(firstOperand, operator, secondOperand));
  displayOperation.textContent= `${firstOperand} ${operator} ${secondOperand} =`;
  operator= null;
}

function roundNumber(num){
  return Math.round(num*1000)/1000
}

function appendPoint(){
  if(displayTotal.textContent.includes('.')) return;
  displayTotal.textContent += '.';
}

function operate(a, operator, b){
  a= Number(a);
  b= Number(b);
  console.log([a,b]);

  switch(operator){
    case '+':
    return add(a,b);
    break;
    case '-':
    return substract(a,b);
    break;
    case 'x':
    return multiply(a,b);
    break;
    case '÷':
    return divide(a,b);
    break;
    case '%':
    return percentage(a,b);
    break;
    default:
    return null;
  }
}

let disableSelect= (e)=> {return false};
document.onselectstart= disableSelect;
document.onmousedown= disableSelect;