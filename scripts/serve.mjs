import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const built=process.argv[2]==='dist';
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.ttf':'font/ttf','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');let name=decodeURIComponent(url.pathname);if(name==='/')name='/index.html';const root=path.resolve(built?'dist':name.startsWith('/src/')?'.':'public');const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep))throw Error();const body=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);}catch{res.writeHead(404);res.end('Not found');}}).listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log('Guqin Reader: http://localhost:'+(process.env.PORT||3000)));
