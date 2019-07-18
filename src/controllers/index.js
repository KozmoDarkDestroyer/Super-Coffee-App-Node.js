const express = require('express');
const app = express();

app.use(require('./users'));
app.use(require('./categories'));
app.use(require('./products'));
app.use(require('./login'));
app.use(require('./image'));
app.use(require('./uploads'));

module.exports = app;