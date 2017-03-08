import * as http from 'http';
import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';

http.createServer( (request, response) => {
    let uri = url.parse(request.url).pathname;
    if (uri === '/') {
        uri = '/index.html';
    }
console.log(path.join(__dirname, '../client', uri));
    fs.readFile(path.join(__dirname, '/client', uri), (error, content) => {
        if (error) {
            response.writeHead(404);
            response.end();
            return;
        }

        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(content);
    });

})
.listen(3000, 'localhost', () => {
    console.log('server is running on localhost:3000');
});