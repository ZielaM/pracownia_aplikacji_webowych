import express from "express";
import path from "path";
import {basen} from "./db.js";
import {fileURLToPath} from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/static', express.static(path.join(__dirname, 'public/static')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/o-nas', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'o-nas.html'));
});

app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'oferta.html'));
});

app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'kontakt.html'));
});

app.post('/kontakt', async (req, res) => {
    console.log('Dane formularza:', req.body);
    const {imie, nazwisko, email, tresc} = req.body;

    if (!imie || !nazwisko || !email || !tresc) {
        return res.status(400).send('Wypełnij wszystkie pola gałganie');
    }

    try {
        await basen.execute('INSERT INTO wiadome(imie, nazwisko, email, tresc) VALUES (?, ?, ?, ?)', [imie, nazwisko, email, tresc]);
    } catch (error) {
        return res.status(500).send('Jakiś błąd. Domyśl się.');
    }

    return res.redirect('/');
});

app.get('/api/contact-messages/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [row, _] = await basen.execute('SELECT * FROM wiadome WHERE id = ?', [id]);
        if (!row[0]) {
            return res.status(404).send('No ja tu takiego nie widzę')
        }
        res.status(200).json(row[0]);
    } catch (error) {
        res.status(500).send('Jakiś błąd. Domyśl się.');
    }
})

app.get('/api/contact-messages', async (req, res) => {
    try {
        const [rows, _] = await basen.execute('SELECT * FROM wiadome');
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).send('Jakiś błąd. Domyśl się.');
    }
})

app.listen(port, () => {
    console.log(`Aplikacja działa na http://localhost:${port}`);
});
