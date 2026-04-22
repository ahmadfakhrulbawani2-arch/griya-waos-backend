const handleResponse = (res, status, message, data = null, meta = null) => {
  res.status(status).json({
    status,
    message,
    data,
    meta,
  });
};

export default handleResponse;
