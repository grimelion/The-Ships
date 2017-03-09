import * as http from 'http';
import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import { router } from './router';

http.createServer( router({
        '/': {
            handler: 'index.html'
        },
        '/category': {
            handler: 'index.html'
        }
    }))
    .listen(3000, 'localhost', () => {
        console.log('server is running on localhost:3000');
    });