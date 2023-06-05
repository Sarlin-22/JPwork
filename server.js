const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

prisma.$connect().then(() => {
  console.log("Prisma connected")

  const app = express();
  const port = 3000;

  app.use(express.json());

  // middleware to serve HTML files from 'public' directory
  app.use('/public', express.static(path.join(__dirname, 'public')));

  // middleware to serve CSS files from 'css' directory
  app.use('/css', express.static(path.join(__dirname, 'css')));

  app.use(express.static(path.join(__dirname, 'public')));

  const authRouter = require('./routes/auth');
  app.use('/auth', authRouter);

  const apiRouter = require('./routes/api');  // Novo router
  app.use('/api', apiRouter);  // Usando o novo router

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
