const express = require('express');
const { PrismaClient } = require('./generated/prisma')
const path = require('path');

const app = express();
const PORT = 3000;

const prisma = new PrismaClient()

app.use('/static', express.static(path.join(__dirname, 'public/static')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/wpisy', async (req, res) => {
    const wpisy = await prisma.wpis.findMany();
    res.json({ wpisy });
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})