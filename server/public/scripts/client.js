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
    $('#clear-button').on('click', clear)

}

let equation = {}


function clear() {
    $('#numberOneIn').val('')
    $('#numberTwoIn').val('')
}

function calculate() {
    console.log('in calculate')
    equation.numOne = $('#numberOneIn').val()
    equation.numTwo = $('#numberTwoIn').val()
    console.log(equation)

    $.ajax({
        url: '/calculate',
        type: 'POST',
        data: equation
    }).then(function (response) {
        console.log(response)
        renderDOM()
    })
}


function renderDOM() {
    $.ajax({
        url: '/calculate',
        type: 'GET'
    }).then(function(response) {
        console.log(response)
        let lastAnswer = response[response.length-1].answer
        console.log('Last answer is:', lastAnswer)
        $('#results').empty()

        $('#results').append(`<h1 id="current-answer">${lastAnswer}</h1>`)
        $('#calc-history').empty()
        for (let equation of response) {
            console.log('This is the', equation)
            $('#calc-history').append(`<li>${equation.numOne} ${equation.operator} ${equation.numTwo} = ${equation.answer}</li>`)
        }
    })
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





