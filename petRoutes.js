let fs = require('fs');
let urlSearch = `/pets/ ${index}`

let handlerFunc = (reqURL)=>{
    const petRegExp = /^\/pets\/(.*)$/;
    return reqURL.replace(petRegExp, "/pets")
};





let server = http.createServer(function(req, res){
    if(req.method === 'GET' && handlerFunc(req.url) === "/pets"){
        fs.readFile(petPath, 'utf-8', function(error, data){
            if(error){
                console.error('Error Error: ');
                } 
                    let petsArr = JSON.parse(data);
                    data = JSON.stringify(petsArr);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(data);
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Not found, try again');
        }   
});

server.listen(port, function(){
    console.log('Listening on port ', port);
});