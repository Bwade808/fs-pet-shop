const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const logger = require('morgan');
const PORT = 3000;
const { Client } = require('pg');
const config = require('./config.json')[process.env.NODE_ENV||"dev"];
const client = new Client({
    connectionString: config.connectionString,
});
client.connect();


app.use(express.json());
app.use(logger('dev'));

//GET METHOD for homepage
app.get('/', (req, res)=>{
    res.send('Welcome to Brandon\'s Pet Shop II');
    console.log('Response sent');
});

//GET METHOD for querying ALL pets
app.get('/api/pets', (req, res)=>{
    client.query('SELECT * FROM pets;')
    .then(result => {
        res.send(result.rows);
    })
});

//GET METHOD for querying pets by ID
app.get('/api/pets/:id', (req, res)=>{
    let petId = req.params.id;
    client.query('SELECT * FROM pets WHERE id=$1', [petId])
    .then(result => {
        if(result.rows.length === 0){
            res.status(404).send('Entry not found.');
           
        } else {
            res.send(result.rows);
        }
    });
});

//POST METHOD for adding new pets to database
app.post('/api/pets', (req, res)=>{
    let newPet = req.body;
    client.query('INSERT INTO pets (age, kind, pet_name) VALUES ($1, $2, $3) RETURNING *', 
    [newPet.age, newPet.kind, newPet.name])
    .then(result => {
        res.send(result.rows);
    })
})

//PATCH METHOD for updating pet name
app.patch('/api/pets/:id', (req, res)=>{
    let petId = req.params.id;
    let newName = req.body.name;
    client.query('UPDATE pets SET pet_name=$1 WHERE id=$2 RETURNING *', [newName, petId])
    .then(result=>{
        res.send(result.rows);
    })
})

//DELETE METHOD for deleting a row by [condition]
app.delete('/api/pets/:id', (req, res)=>{
    let petId = req.params.id;
    let deleteName = req.body.name;
    client.query('DELETE FROM pets WHERE id=$1 AND name=$2 RETURNING *', [petId, deleteName])
    .then(result =>{
        res.send(result.rows);
    })
})

app.use((req, res, next) =>{
    res.status(404).send('Not found');
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  });



app.listen(PORT, ()=>{
    console.log('Listening on port: ', PORT);
})






