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

    $('.number-key').on('click', getNumber)
    $('#clear-history').on('click', clearHistory)
    // $('.operator-key').on('click', getOperator)

}

let equation = {}

function getNumber(e) {
    let numOne
    console.log('in getNumber')
    button = e.target
    value = button.textContent
    console.log(value)
    // let displayContent = $('#display').text()
    $('#calc-display').val(function(n, c) {
        return c + value
    })
      
}

function clear() {
    $('#calc-display').val('')
}

function calculate() {
    console.log('in calculate')
    equation.numTwo = $('#calc-display').val()
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
        $('#calc-display').val(lastAnswer)
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

    equation.numOne = $('#calc-display').val()

    $('#calc-display').val('')
}

function subtractOperator() {
    equation.operator = "-"

    equation.numOne = $('#calc-display').val()

    $('#calc-display').val('')
}

function multiplyOperator() {
    equation.operator = "*"

    equation.numOne = $('#calc-display').val()

    $('#calc-display').val('')
}

function divideOperator() {
    equation.operator = "/"

    equation.numOne = $('#calc-display').val()

    $('#calc-display').val('')
}

function clearHistory() {
    console.log('in clear history')
    $.ajax({
        url: '/history',
        type: 'DELETE'
    }).then(function (response) {
        console.log(response)
        $('#results').empty()
        $('#calc-history').empty()
        $('#calc-display').val('')
    })
}





