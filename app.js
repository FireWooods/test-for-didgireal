const express = require('express');
const actionsRouter = require('./routes/action_routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/api', actionsRouter);

app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
