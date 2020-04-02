require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
app.use(express.json()) 
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(express.static('build'))
morgan.token('person', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

const Person = require('./models/person')

let persons = [
    
]

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    Person.find({}).then(data => {
      res.json(data.map(person => person.toJSON()))
    })
  })

  app.get('/info', (req, res) => {
    const l = persons.length
    res.send(`<p>Phonebook has info for ${l} people</p>
    <p>${new Date()}</p>`)
  })

  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person.toJSON())
    })
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    return Math.floor(Math.random()*1000000)+1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number must not be blank'
      })
    }

    if (persons.some(e => e.name.toLowerCase() === body.name.toLowerCase())) {
        return response.status(400).json({ 
          error: 'name must be unique'
        })
      }
  
    const person = new Person ({
      id: generateId(),
      name: body.name,
      number: body.number,
    })

    person.save().then(saved => {
      response.json(saved.toJSON())
    })
  
    persons = persons.concat(person)
  })


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})