import http from 'http';
import Debug from 'debug';
import app from './app'
import mongoose, { mongo } from 'mongoose';
import {mongoUrl} from './config';

const PORT = 3000;
const debug = new Debug('platzi-overflow:root');

mongoose.Promise = global.Promise;

async function start(){
    await mongoose.connect(mongoUrl);
    
    app.listen(PORT,()=> {
        debug(`Server running at port ${PORT}`);
        //console.log(`Server running at port ${PORT}`);
    });
}



/*
const app = http.createServer((req,res) => {
    debug('New request');
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.write('Hola desde PlatziOverflow');
    res.end();
});
*/

start();