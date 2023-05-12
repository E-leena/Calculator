const calcualtorDisplay=document.querySelector('h1');
const inputBtns=document.querySelectorAll('button');
const clearBtn=document.getElementById('clear-btn');

let firstValue=0;
let operatorValue="";
let awaitingNextValue=false;

function sendNumberValue(number){
    if(awaitingNextValue){
        calcualtorDisplay.textContent=number;
        awaitingNextValue=false;
    }else{
        const displayValue=calcualtorDisplay.textContent
        calcualtorDisplay.textContent=displayValue==='0' ? number: displayValue + number;
    }
    
}
function addDecimal(){
    if(awaitingNextValue)return; 
    if(!calcualtorDisplay.textContent.includes('.')){
        calcualtorDisplay.textContent= `${calcualtorDisplay.textContent}.`;
    }
}
const calculate={
    '/':(firstNumber,secondNumber)=> firstNumber/secondNumber,
    '*':(firstNumber,secondNumber)=> firstNumber*secondNumber,
    '+':(firstNumber,secondNumber)=> firstNumber+secondNumber,
    '-':(firstNumber,secondNumber)=> firstNumber-secondNumber,
    '=':(firstNumber,secondNumber)=> secondNumber,


}

function useOperator(operator){
const currentValue=Number(calcualtorDisplay.textContent);
if(operatorValue&&awaitingNextValue){
    operatorValue=operator;
    return;
} 
if(!firstValue){
    firstValue=currentValue;    
}
else{
    console.log(firstValue,operatorValue,currentValue);
    const calculation=calculate[operatorValue](firstValue,currentValue);
    calcualtorDisplay.textContent=calculation; 
}
awaitingNextValue=true;
operatorValue=operator;

}


inputBtns.forEach((inputBtn) =>{
if(inputBtn.classList.length===0){
    inputBtn.addEventListener('click', () =>sendNumberValue(inputBtn.value))
}
else if(inputBtn.classList.contains('operator')){
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value))

}
else if(inputBtn.classList.contains('decimal')){
    inputBtn.addEventListener('click', () => addDecimal())

}
});

// Reset Display
function resetAll(){   
 firstValue=0;
 operatorValue="";
 awaitingNextValue=false;
    calcualtorDisplay.textContent='0';

}
clearBtn.addEventListener('click',resetAll);