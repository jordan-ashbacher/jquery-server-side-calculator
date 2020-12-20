//set up for express server
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 5000

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('server/public'))

// global array to collect calculate equation object history
let history = []

//function takes client side equation object and calculate the result. Pushes current answer into equation object, then pushes equation object to history array.
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

// post route receives equation object, calls calculation function and responds with 201 status
app.post('/calculate', (req, res) => {
    console.log('in POST /calculate')
    let equation = req.body
    console.log(equation)
    calculate(equation)
    console.log(history)
    res.sendStatus(201)
})

// get route sends history array back to client side
app.get('/calculate', (req, res) => {
    console.log('in GET /calculate')
    res.send(history)
})

// delete route sets history variable to empty array. sends empty history array back to client side.
app.delete('/history', (req, res) => {
    console.log('in DELETE /history')
    history = []
    res.send(history)
})

app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})