const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const logger = require('morgan');
const PORT = 3000;

app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/', (req, res)=>{
    res.send('Welcome to Brandon\'s Pet Shop II');
});

app.get('/pets/:index', (req, res)=>{
    let petIndex = req.params.index;
    console.log(petIndex);
        fs.readFile('./pets.json', 'utf8', function(error, petFile){
            if (error){
                res.status(500);
                res.send(error);
                res.send('Not Found');
                console.error('There has been an error: ');
            } else {
                let petData = JSON.parse(petFile);
                res.status(200);
                res.send(petData[petIndex]);
                console.log('Response sent');
            }
        }) 
});

app.post('/pets', (req, res)=>{
    let postPet = req.body;
    fs.readFile('./pets.json', 'utf8', (error, data)=>{
        if(error){
            console.log('Error: ', error);
            res.status(500);
            res.send(error);
        } else {
            // let postPet = {"name": "Cornflake", "age": 3, "Kind": "parakeet"};
            let petData = JSON.parse(data);
            petData.push(postPet);
            fs.writeFile('./pets.json', JSON.stringify(petData), (error)=>{
                if(error){
                    console.log('Error found: ', error);
                } else {
                    res.send(petData);
                }
            });
        }
    });
});

app.listen(PORT, ()=>{
    console.log('Listening on port: ', PORT);
})


