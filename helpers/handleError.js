class MyErrors extends Error {
  constructor(status, name, message) {
    super(message);
    this.status = status;
    this.name = name;
  }

  static error404(req, res, next) {
    next(new MyErrors(404, 'Page not found', 'Such page was not found in your system'));
  }

  static errorSend(err, req, res, next) {
    const { name, message, status } = err
    res.json(
      { name, message, status }
    );
  }
}

module.exports = MyErrors;