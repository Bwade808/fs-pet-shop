const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 8000;

app.get('/', function(req, res){
    res.send('Welcome to Brandon\'s Pet Shop');
    console.log(req.path);
});

app.get('/pets', function(req, res){
        fs.readFile('./pets.json', 'utf8', function(error, petFile){
            if (error){
                res.status(500);
                res.send(error);
                res.send('Not Found');
                console.error('There has been an error: ');
            } else {
                let petData = JSON.parse(petFile);
                res.status(200);
                res.send(petData);
                console.log('Response sent');
            }
        })
});

app.get('/pets/:index', function(req, res){
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

// app.get('*', function(req, res){
//     res.send('Not Found');
//     res.end();
// })
app.post('./pets',function (req, res){
    fs.readFile('./pets.json', 'utf8', function(error, data){
        if(error){
            console.log(error);
            res.status(500);
            res.send(error);
        } else {
            let newPet = { "name": "Cornflake", "age": 3, "kind": "parakeet" };
            let petData = JSON.parse(data);
            plantData.push(newPlant);
            fs.writeFile('./pets.json', JSON.stringify(plantData), function(error){

            })

        }
    })
} )


app.listen(PORT, function(){
    console.log('Server is running and listening')
})



