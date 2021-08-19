require('dotenv').config();
const express = require('express');
const routesHandler = require('./routes');
const MyErrors = require('./helpers/handleError')

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const PORT = process.env.PORT || 3000;

app.use('/profile', routesHandler)
app.use(MyErrors.error404);
app.use(MyErrors.errorSend);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})