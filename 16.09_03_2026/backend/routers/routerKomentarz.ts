import {Router} from "express";
import {prisma} from "../lib/prisma";

const router = Router();

router.get('/', async (req, res) => {
    const komentarze = await prisma.komentarz.findMany();
    res.json(komentarze);
})

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ "error": "ID must be an integer" });
    }
    const komentarz = await prisma.komentarz.findUnique({where: {id}});
    if (!komentarz) return res.status(404).json({"error": `'Komentarz' with id ${id} was not found`});
    res.json(komentarz);
})

router.post('/', async (req, res) => {
    console.log(req.body);
    if (!req.body || !req.body.content || !req.body.wpisId) return res.status(400).json({"error": 'Content and wpisId are required'});
    const {content, wpisId} = req.body;
    const komentarz = await prisma.komentarz.create({
        data: {
            content, wpisId
        }
    });
    res.status(201).json(komentarz);
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ "error": "ID must be an integer" });
    }
    try {
        await prisma.komentarz.delete({where: {id}});
        return res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(404).json({"error": `'Komentarz' with ${id} was not found.`});
    }
})

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ "error": "ID must be an integer" });
    }
    if (!req.body || !req.body.content || !req.body.wpisId) return res.status(400).json({"error": 'Content and wpisId are required'});
    const {content, wpisId} = req.body;
    try {
        const komentarz = await prisma.komentarz.update({where: {id}, data: {content, wpisId}});
        return res.status(201).json(komentarz);
    } catch (error) {
        console.error(error);
        res.status(404).json({"error": `'Komentarz' with ${id} was not found.`});
    }
})

export { router as komentarzRouter };