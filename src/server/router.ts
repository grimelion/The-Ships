import * as http from 'http';

http.createServer( (request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('ts server');
})
.listen(3000, 'localhost', () => {
    console.log('server is running on localhost:3000');
});