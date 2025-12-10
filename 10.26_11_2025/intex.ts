import express, { Request, Response, NextFunction } from "express";
import {wpisRouter} from "./routers/routerWpis";
import {kategoriaRouter} from "./routers/routerKategoria";
import {komentarzRouter} from "./routers/routerKomentarz";
import {MongoClient, Db} from "mongodb";

declare global {
    namespace Express {
        interface Request {
            logowanko: Db; // Definiujemy, że logowanko to instancja bazy danych
        }
    }
}

const mongo = new MongoClient('mongodb+srv://admin:admin@cluster0.hex62ix.mongodb.net/?appName=Cluster0');
let db: Db;

async function polacz() {
    try {
        await mongo.connect();
        db = mongo.db('pawcio');
        console.log(db);
    } catch (err) {
        console.log(err);
    }
}
await polacz();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    req.logowanko = db;
    next();
})

app.use(async (req, res, next) => {
    try {
        await req.logowanko.collection('accessLogs').insertOne({
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            timestamp: new Date()
        });
    } catch (err) {
        console.error(err);
    }
    next();
});

app.use('/wpis', wpisRouter);
app.use('/kategoria', kategoriaRouter);
app.use('/komentarz', komentarzRouter);

app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        await req.logowanko.collection('errorLogs').insertOne({
            method: req.method,
            url: req.originalUrl,
            message: err.message,
            stack: err.stack,
            timestamp: new Date()
        });
        console.log(err);
    } catch (dbErr) {
        console.error(dbErr);
    }

    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
