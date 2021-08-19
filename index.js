require('dotenv').config();
const express = require('express');
const routesHandler = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const PORT = process.env.PORT || 3000;

app.use('/', routesHandler)

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})