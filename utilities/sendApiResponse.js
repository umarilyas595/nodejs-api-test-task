const sendApiResponse = (res, data, statusCode, message) => {
  res.status(statusCode).json({ data, message });
};

module.exports = sendApiResponse;
