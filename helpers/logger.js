const logger = (req, res, next) => {
  console.log({ path: req.path, date: new Date().toLocaleDateString() });
  next();
}

module.exports = logger;