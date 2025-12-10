import {Router} from "express";
import {prisma} from "../lib/prisma";

const router = Router();

router.get('/', async (req, res) => {
    const kategorie = await prisma.kategoria.findMany();
    res.json(kategorie);
})

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ "error": "ID must be an integer" });
    }
    const kategoria = await prisma.kategoria.findUnique({where: {id}});
    if (!kategoria) return res.status(404).json({"error": `'Kategoria' with id ${id} was not found`});
    res.json(kategoria);
})

router.post('/', async (req, res) => {
    if (!req.body || !req.body.name) return res.status(400).json({"error": 'Name is required'});
    const {name} = req.body;
    const kategoria = await prisma.kategoria.create({
        data: {
            name
        }
    });
    res.status(201).json(kategoria);
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ "error": "ID must be an integer" });
    }
    try {
        await prisma.kategoria.delete({where: {id}});
        return res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(404).json({"error": `'Kategoria' with ${id} was not found.`});
    }
})

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ "error": "ID must be an integer" });
    }
    if (!req.body || !req.body.name) return res.status(400).json({"error": 'Name is required'});
    const {name} = req.body;
    try {
        const kategoria = await prisma.kategoria.update({where: {id}, data: {name}});
        return res.status(201).json(kategoria);
    } catch (error) {
        console.error(error);
        res.status(404).json({"error": `'Kategoria' with ${id} was not found.`});
    }
})

export { router as kategoriaRouter };