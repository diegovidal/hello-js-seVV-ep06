const cfg = require('./knexfile')
const knex = require('knex')(cfg.development)
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cors())

app.get('/listpessoas', (req, res) => {
    knex('pessoa').select().then(ret => {
        res.send(ret)
    })
    .catch(err => {
        res.status(500).send(err)
    })
})

app.get('/pessoa/:id', (req, res) => {

    knex('pessoa').select().whereIn('idpessoa', req.params.id).then(ret => {
        res.send(ret)
    })
    .catch(err => {
        res.status(500).send(err)
    })
})

app.post('/addpessoa', (req, res) => {

    const pessoa = req.body

    knex('pessoa').insert(pessoa, 'idpessoa').then(ret => {
        res.send(ret)
    })
    .catch(err => {
        res.status(500).send(err)
    })
    
})

knex.migrate.latest().then(_ => {
    app.listen(3000, _ => {
        console.log('server is online!')
    })
})