const http = require("http");
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) =>{
    console.log("Request for " + req.url + ", method - " + req.method);
    //console.log(JSON.stringify(req))

    /*res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello KP!!!, My first node js server</h1></body></html>')*/

    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == "/") fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public'+fileUrl)
        //const fileExt = path.extname(filePath);
       // if (fileExt == '.html'){
            fs.exists(filePath, (exists) => {
                console.log("file exists -" + exists)
                res.setHeader('Content-Type', 'text/html')
                if (!exists) {
                    res.statusCode = 404;
                    res.end('<html><body><h1>Error 404: + ' + fileUrl + ' notfound</h1></body></html>')

                    return;
                }
                
                res.statusCode = 200;
                // read the content and give it to response
                fs.createReadStream(filePath).pipe(res)
            });
        /*} else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html')
            res.end('<html><body><h1>Error 404: + ' + fileUrl + ' not an HTML file</h1></body></html>')
        }*/
    } else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html')
        res.end('<html><body><h1>Error 404: + ' + req.method + ' not supported</h1></body></html>')
    }
});

server.listen(port, hostname, () => {
    console.log(`**** Server running at http://${hostname}:${port} **** `)
})