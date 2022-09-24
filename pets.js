let fs = require('fs');

let args = process.argv;
let petsArr;

//READ SUBCOMMAND CODE

if (args[2] === "read"){
    fs.readFile('./pets.json', 'utf-8', function(error, data){
        if(error){
            console.error('This error has ocurred', error);
            console.log('Usage: node pets.js [read | create | update | destroy]');
            process.exit(1); 
        } else if(args[3] === undefined){
            console.log(data);
        } else if(args[3] > JSON.parse(data).length - 1){
            console.error('Index out of limits');
            console.error('Usage: node pets.js read INDEX')
        } else {
            console.log(JSON.parse(data)[args[3]]);
        };
    });
//CREATE SUBCOMMAND CODE
} else if (args[2] == "create"){
    fs.readFile('./pets.json', 'utf-8', function(error, data){
        if(error){
            console.log(error)
        } else if(args[3] === undefined || args[4] === undefined || args[5] === undefined){
            console.log('Usage: node pets.js create AGE KIND NAME');
        } else {
            petsArr = JSON.parse(data);
            newObj = {age: Number(args[3]), kind: args[4], name: args[5]};
            petsArr.push(newObj);
            fs.writeFile('./pets.json', JSON.stringify(petsArr), function(error){
                if(error){
                    console.log(error);
                }
            });
            console.log(petsArr);
        };
        
    });
};

