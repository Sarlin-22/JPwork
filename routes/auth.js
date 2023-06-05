const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.post('/login', async (req, res) => {
  const { nome, senha } = req.body;

  const user = await prisma.usuarios.findFirst({
    where: {
      nome: nome,
    },
  });

  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado.' });
  }

  if (user.senha !== senha) {
    return res.status(400).json({ message: 'Senha inválida.' });
  }

  res.status(200).json({ message: 'Login bem-sucedido.' });
});

router.post('/reset', async (req, res) => {
  const { name, newPassword } = req.body;

  const user = await prisma.usuarios.findFirst({
    where: {
      nome: name,
    },
  });

  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado.' });
  }

  const updatedUser = await prisma.usuarios.update({
    where: {
      usuario_id: user.usuario_id,
    },
    data: {
      senha: newPassword,
    },
  });

  res.status(200).json({ message: 'Senha redefinida com sucesso.' });
});

module.exports = router;
