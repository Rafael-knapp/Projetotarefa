const express = require('express');
const cors = require('cors');
const app = express();
const tarefasRoutes = require('../routes/tarefasRoutes');

app.use(cors());  // ADICIONE ESSA LINHA
app.use(express.json());
app.use('/tarefas', tarefasRoutes);

module.exports = app;