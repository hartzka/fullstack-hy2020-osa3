require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const Person = require('./models/person')
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
app.use(express.json()) 
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(express.static('build'))
morgan.token('person', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(express.static('build'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello, this is the front page.</h1>')
})

app.get('/info', (req, res, next) => {
  Person.find({}).then(data => {
    res.send(`<p>Phonebook has info for ${data.length} people</p>
    <p>${new Date()}</p>`)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(data => {
    res.json(data.map(person => person.toJSON()))
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number must not be blank'
    })
  }

  /*if (persons.some(e => e.name.toLowerCase() === body.name.toLowerCase())) {
      return response.status(400).json({ 
        error: 'name must be unique'
      })
    }*/

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save().then(saved => {
    response.json(saved.toJSON())
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person.toJSON())
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updated => {
      response.json(updated.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})