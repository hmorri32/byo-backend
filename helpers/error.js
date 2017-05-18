exports.notFound = (req, res, next) => {
  const err = new Error('Route Not Found!');
  err.status = 404;
  next(err);
};

exports.arrayLength = (req, res) => {
  const err = new Error('ID not found!');
  err.status = 404;
  this.developmentErrors(err, req, res);
};

exports.queryArrayLength = (req, res) => {
  const err = new Error('Your query param is ultra invalid!');
  err.status = (404);
  this.developmentErrors(err, req, res);
};

exports.developmentErrors = (err, req, res) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  };
  res.status(err.status || 500);
  res.format({
    'text/html': () => {
      res.render('error', errorDetails);
    },
    'application/json': () => res.json(errorDetails)
  });
};
