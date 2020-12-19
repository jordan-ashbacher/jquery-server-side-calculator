const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 5000

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('server/public'))


let history = []


function calculate(equation) {
    let numOne = Number(equation.numOne) 
    let numTwo = Number(equation.numTwo)

    if (equation.operator === '+') {
        currentAnswer = numOne + numTwo
    } else if (equation.operator === '-') {
        currentAnswer = numOne - numTwo
    } else if (equation.operator === '*') {
        currentAnswer = numOne * numTwo
    } else {
        currentAnswer = numOne / numTwo
    }
    console.log(currentAnswer)
    equation.answer = currentAnswer
    history.push(equation)
}



app.post('/calculate', (req, res) => {
    console.log('in POST /calculate')
    let equation = req.body
    console.log(equation)
    calculate(equation)
    console.log(history)
    res.sendStatus(201)
})

app.get('/calculate', (req, res) => {
    console.log('in GET /calculate')
    res.send(history)
})

app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})