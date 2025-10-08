import http from "http";
import { URL } from "url";
import fs from "fs";

const server = http.createServer((req, res) => {
    const { method, url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain;charset=UTF-8' });
        res.end("Strona główna");
    }
    else if (pathname === '/json') {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify({"json": "nosj"}));
    }
    else if (pathname === '/html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("<h1>HTML</h1>");
    }
    else if (pathname === '/htmle') {
        const filePath = "./index.html";
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                res.statusCode = 404;
                res.end('File not found');
                return;
            }

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Server error');
                    return;
                }

                res.setHeader('Content-Type', 'text/html');
                res.setHeader('Content-Length', stats.size);
                res.writeHead(200);

                const stream = fs.createReadStream(filePath);

                stream.on('error', (err) => {
                    console.error('Error reading file:', err);
                    if (!res.headersSent) {
                        res.statusCode = 500;
                        res.end('Error reading file');
                    }
                });

                stream.pipe(res);
            });
        });
    }
    else if (pathname === '/get_params') {
        const params = Object.fromEntries(parsedUrl.searchParams);
        console.log(params);
        const timestamp = Date.now();
        fs.writeFile(`./params/params_${timestamp}.json`, JSON.stringify(params, null, 2), (err) => {
            if (err) {
                res.statusCode = 500;
                res.end('Server error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/json' });
            res.end(JSON.stringify({"ok": "ok"}));
        })
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});