require('dotenv').config();
const express = require('express');
const path = require('path');
const routesHandler = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', routesHandler)

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})