import express from "express";
import {wpisRouter} from "./routers/routerWpis";
import {kategoriaRouter} from "./routers/routerKategoria";
import {komentarzRouter} from "./routers/routerKomentarz";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/wpis', wpisRouter);
app.use('/kategoria', kategoriaRouter);
app.use('/komentarz', komentarzRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
