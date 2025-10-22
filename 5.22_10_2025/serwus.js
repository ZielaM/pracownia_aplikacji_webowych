import express from 'express';
import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.type('text/plain; charset=UTF-8');
    res.send("Strona główna");
});

app.get('/json', (req, res) => {
    res.json({"json": "nosj"});
});

app.get('/html', (req, res) => {
    res.send("<h1>HTML</h1>");
});

app.get('/htmle', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err.message);
        }
    });
});

app.post('/get_params', (req, res) => {
    const filePath = path.join(__dirname, `params/params_${Date.now()}.json`);
    const params = req.query;
    console.log(params);
    fs.writeFile(filePath, JSON.stringify(params, null, 2), (err) => {
        if (err) {
            console.error('Błąd zapisu pliku:', err);
            res.status(500).json({error: 'Server error while writing file'});
            return;
        }

        res.json({"ok": "ok"});
    });
})

app.all('*', (req, res) => {
    res.status(404).send('404 - Page not found');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});