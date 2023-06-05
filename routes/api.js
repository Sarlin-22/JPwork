const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.post('/submit', async (req, res) => {
    const { perguntas, usuario_id, usuario_nome } = req.body;

    try {
        const createdPerguntas = await Promise.all(
            perguntas.map(pergunta =>
                prisma.perguntas.create({
                    data: {
                        pergunta,
                        usuario_id,
                        usuario_nome
                    }
                })
            )
        );
        res.status(200).json({ status: 'success', perguntas: createdPerguntas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.get('/perguntas', async (req, res) => {
    try {
        const perguntas = await prisma.perguntas.findMany();
        res.json(perguntas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar as perguntas.' });
    }
});

router.delete('/pergunta/:id', async (req, res) => {
    const id = Number(req.params.id);

    try {
        const deletedPergunta = await prisma.perguntas.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json(deletedPergunta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar pergunta.' });
    }
});


module.exports = router;
