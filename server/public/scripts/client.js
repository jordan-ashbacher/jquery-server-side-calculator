console.log('js linked')

$(document).ready(handleReady)

function handleReady() {
    console.log('jq linked')

    //event listeners
    $('#add-button').on('click', addOperator)
    $('#subtract-button').on('click', subtractOperator)
    $('#multiply-button').on('click', multiplyOperator)
    $('#divide-button').on('click', divideOperator)

    $('#evaluate').on('click', calculate)
    // $('#clear-button').on('click', clearHistory)
    // renderToDom()

}

let equation = {}


function calculate() {
    console.log('in calculate')
    equation.numOne = $('#numberOneIn').val()
    equation.numTwo = $('#numberTwoIn').val()
    console.log(equation)

    
}

function addOperator() {
    equation.operator = '+'
}

function subtractOperator() {
    equation.operator = "-"
}

function multiplyOperator() {
    equation.operator = "*"
}

function divideOperator() {
    equation.operator = "/"
}





