const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  const { query, path } = req;
  console.log({ query, path });
  next();
})

router.get('/', (req, res) => {
  res.send('path: /');
})

router.get('*', (req, res) => {
  res.send('path: error');
})

module.exports = router;


