import {Router} from "express";
import {prisma} from "../lib/prisma";

const router = Router();

router.get('/', async (req, res) => {
    const wpisy = await prisma.wpis.findMany();
    res.json(wpisy);
})

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ "error": "ID must be an integer" });
    }
    const wpis = await prisma.wpis.findUnique({where: {id}});
    if (!wpis) return res.status(404).json({"error": `'Wpis' with id ${id} was not found`});
    const komentarze = await prisma.komentarz.findMany({where: {wpisId: wpis.id}})
    res.json({post: wpis, comments: komentarze});
})

router.post('/', async (req, res) => {
    if (!req.body || !req.body.title || !req.body.content || !req.body.kategoriaId) return res.status(400).json({"error": 'Title, content and kategoriaId are required'});
    const {title, content, published, kategoriaId} = req.body;
    const wpis = await prisma.wpis.create({
        data: {
            title, content, published, kategoriaId
        }
    });
    res.status(201).json(wpis);
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ "error": "ID must be an integer" });
    }
    try {
        await prisma.wpis.delete({where: {id}});
        return res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(404).json({"error": `'Wpis' with id: ${id} was not found.`});
    }
})

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ "error": "ID must be an integer" });
    }
    if (!req.body || !req.body.title || !req.body.content || !req.body.kategoriaId) return res.status(400).json({"error": 'Title, content and kategoriaId are required'});
    const {title, content, published, kategoriaId} = req.body;
    try {
        const wpis = await prisma.wpis.update({where: {id}, data: {title, content, published, kategoriaId}});
        return res.status(201).json(wpis);
    } catch (err) {
        console.error(err);
        res.status(404).json({"error": `'Wpis' with id: ${id} was not found.`});
    }
})

export { router as wpisRouter };