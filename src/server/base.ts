import { createServer } from 'http';
import { readFile } from 'fs';
import { parse } from 'url';
import { join } from 'path';
import { includes } from 'lodash';
import { lookup } from 'mime-types';
// import { renderToString } from 'react-dom/server';
// import { content } from './../components';


createServer((request, response) => {
        let uri: string = parse(request.url).pathname;
        let extension: string = uri.split('.').reverse()[0];
        let filename: string;

        if (includes<string>(['css', 'js', 'png', 'pack'], extension)) {
            filename = uri;
        }
        else {
            filename = 'index.html';
        }

        readFile(
            join(__dirname, '../../client', filename), 
            'utf-8',
            (error: NodeJS.ErrnoException, data: string) => {
                if (error) {
                    sendNotFound();
                    return;
                }

                response.writeHead(200, {
                    'Content-Type': lookup(filename)
                });

                response.end(
                    data
                    // data.replace(':content:', renderToString(content))
                );
            });

        function sendNotFound(): void {
            response.writeHead(404);
            response.end();           
        }
    })
    .listen(3000, 'localhost', () => {
        console.log('server is running on localhost:3000');
    });