'use strict';
const Express = require('express');
const app = new Express();
const path = require('path');

const PORT = 3000;

app.use(Express.static(path.join(__dirname, 'dist')));

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
