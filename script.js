let operatorCheck = false;
let decimalPointCheck = false;
let signCheck = false;
let result;
let indexOfOperator;
let num1;
let num2;
let operator;

let textBox = document.querySelector(".display");
let  numberKeys = document.querySelectorAll(".number");
numberKeys = Array.from(numberKeys);
function numberHandler(e)
{
    textBox.value += e.target.textContent;
}
numberKeys.forEach((item) => {item.addEventListener("click",numberHandler)});

let clearButton = document.querySelector(".clearButton");
clearButton.addEventListener("click",(e) => {window.location.reload()});

let backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click",backspaceHandler);
function backspaceHandler(e)
{
    let removedItem = textBox.value.at(-1);
    if (removedItem === ' ')
    {
        removedItem = textBox.value.slice(textBox.value.length -3).trim();
        textBox.value = textBox.value.slice(0,textBox.value.length -3);
    }
    else{
        textBox.value = textBox.value.slice(0,textBox.value.length -1);
    }
    
    switch(removedItem)
    {
        case '+':
        case 'x':
        case '/':
        case '%':
            operatorCheck = false;
            break;
        case '.':
            decimalPointCheck = false;
            break;
        case '-':
            if (operatorCheck === true && signCheck === true)
            {
                signCheck = false;
            }
            else if (operatorCheck === true)
            {
                operatorCheck = false;
            }
            if (textBox.value.includes('-'))
            {
                signCheck = true;
            }
            else
            {
                signCheck = false;
            }
    }
}

let contents = document.querySelector(".contents");
contents.addEventListener("mousedown",(e) => {e.target.classList.add("clickEffect")});
contents.addEventListener("mouseup",(e) => {e.target.classList.remove("clickEffect")});
contents.addEventListener("touchstart",(e) => {e.target.classList.add("clickEffect")});
contents.addEventListener("touchend",(e) => {e.target.classList.remove("clickEffect")});

let equalToButton = document.querySelector(".equalTo");
equalToButton.addEventListener("click",equalToHandler);
function equalToHandler(e)
{
    let clickEvent = new Event("click");
    if (operatorCheck === true)
    {
        operatorKeys[0].dispatchEvent(clickEvent);
    }
}

let decimalPointButton = document.querySelector(".decimalPoint");
decimalPointButton.addEventListener("click",decimalPointHandler);
function decimalPointHandler(e)
{
    if (decimalPointCheck === false)
    {
        textBox.value += e.target.textContent;
        decimalPointCheck = true;
    }
}
let signButton = document.querySelector(".signButton");
signButton.addEventListener("click",signButtonHandler);
function signButtonHandler(e)
{
    if (signCheck === false && operatorCheck === false)
    {
        textBox.value = '-' + textBox.value; 
        signCheck = true;
    }
    if (signCheck === false && operatorCheck === true)
    {
        let stuffbeforeOperator = textBox.value.slice(0,indexOfOperator + 1);
        if (textBox.value.length - 1 > indexOfOperator)
        {
            textBox.value = stuffbeforeOperator + '-' + textBox.value.slice(indexOfOperator + 1);
        }
        else
        {
            textBox.value = stuffbeforeOperator + '-';
        }
        signCheck = true;
    }
}
let operatorKeys = document.querySelectorAll(".operator");
operatorKeys = Array.from(operatorKeys);
function operatorHandler(e)
{
    
    if (textBox.value != "" && operatorCheck === false)
    {
        num1 = Number(textBox.value);
        let numLen = textBox.value.length;
        textBox.value +=  ' ' + e.target.textContent + ' ';
        operator = e.target.textContent;
        if (num1 < 0 && operator == '-')
        {
            indexOfOperator = textBox.value.indexOf(operator) + numLen ;
            indexOfOperator += 2;
        }
        else
        {
            indexOfOperator = textBox.value.indexOf(operator) + 1;
        }
        operatorCheck = true;
        decimalPointCheck = false;
        signCheck = false;
    }

    if (operatorCheck === true && (textBox.value.length - 1) != indexOfOperator)
    {
        num2 = Number(textBox.value.slice(indexOfOperator + 1));
    result = function(){    
        switch (operator)
        {
            case '+':
                textBox.value = String(addition(num1,num2));
                operatorCheck = false;
                break;
            case '-':
                textBox.value = String(subtraction(num1,num2));
                operatorCheck = false;
                break;
            case 'x':
                textBox.value = String(multiplication(num1,num2));
                operatorCheck = false;
                break;
            case '/':
                textBox.value = String(division(num1,num2));
                operatorCheck = false;
                break;  
            case '%':
                textBox.value = String(modulus(num1,num2));
                operatorCheck = false;
                break;
        }
    }
    if (isNaN(num2) === false)
    {
        result();
        if (textBox.value.includes('.') === false)
        {
            decimalPointCheck = false;
        }
        else
        {
            decimalPointCheck = true;
        }
        if (textBox.value.includes('-') === false)
            {
                signCheck = false;
            }
            else
            {
                signCheck = true;
            }
    }
    }
}
operatorKeys.forEach((item) => {item.addEventListener("click",operatorHandler)});



function addition(num1,num2)
{
    return (num1 + num2);
}

function subtraction(num1,num2)
{
    return (num1 - num2);
}

function multiplication(num1,num2)
{
    return (num1 * num2);
}

function division(num1,num2)
{
    let result = num1 / num2;
    if (result - Math.round(result) != 0)
    {
        result = result.toFixed(3);
    }
    if (num2 === 0)
    {
        return "nope!";
    }
    return result;
}

function modulus(num1,num2)
{
    return (num1 % num2);
}

