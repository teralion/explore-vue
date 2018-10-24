const express = require('express');

const app = express();
const port = 8080;

app.use(express.static('app'));

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port} 😎`)
});