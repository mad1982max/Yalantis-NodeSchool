require('dotenv').config();

const express = require('express');
const profileRoutes = require('./routes');
const MyErrors = require('./helpers/handleError');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const PORT = process.env.PORT || 3000;

app.use('/profile', profileRoutes);
app.use(MyErrors.error404);
app.use(MyErrors.errorSend);

app.listen(PORT, () => {
  console.log(`--app listening at http://localhost:${PORT}`)
});