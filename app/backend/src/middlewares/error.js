const error = (err, _req, res, _next) => {
  console.error(err);
  return res.status(err.statusCode || 500).json({ message: err.message });
};

module.exports = error;