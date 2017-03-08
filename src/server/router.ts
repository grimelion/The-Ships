import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import { has, includes } from 'lodash';
import * as mime from 'mime-types';

interface RouterRules {
    [path: string]: {
        handler: string,
        callback?: Function
    }
}

export function router(rules: RouterRules): (request: IncomingMessage, response: ServerResponse) => void {
    return (request: IncomingMessage, response: ServerResponse) => {
        let uri: string = url.parse(request.url).pathname;
        let extension: string = uri.split('.').reverse()[0];
        let filename: string;

        if (includes<string>(['html', 'css', 'js', 'png'], extension)) {
            filename = uri;
        }
        else if (has<RouterRules>(rules, uri)) {
            filename = rules[uri].handler;
        }

        if (filename) {
            fs.readFile(path.join(__dirname, '../client', filename), (error: NodeJS.ErrnoException, content: Buffer) => {
                if (error) {
                    sendNotFound();
                    return;
                }

                response.writeHead(200, {
                    'Content-Type': mime.lookup(filename)
                });
                response.end(content);
            });
        }
        else {
            sendNotFound();
        }

        function sendNotFound(): void {
            response.writeHead(404);
            response.end();           
        }
    };
}

// http.createServer( (request, response) => {
//     let uri = url.parse(request.url).pathname;
//     if (uri === '/') {
//         uri = '/index.html';
//     }

//     fs.readFile(path.join(__dirname, '../client', uri), (error, content) => {
//         if (error) {
//             response.writeHead(404);
//             response.end();
//             return;
//         }

//         response.writeHead(200, {
//             'Content-Type': 'text/html'
//         });
//         response.end(content);
//     });

// })
// .listen(3000, 'localhost', () => {
//     console.log('server is running on localhost:3000');
// });