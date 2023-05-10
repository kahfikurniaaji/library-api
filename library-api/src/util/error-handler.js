const errorHandler = async (err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.message });
};

export default errorHandler;
