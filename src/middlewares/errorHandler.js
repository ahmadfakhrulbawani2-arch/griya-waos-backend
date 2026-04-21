// centralize err handling
const errorHandling = (err, req, res, next) => {
  console.log(err.stack);
  if (err.code === "23505") {
    // PostgreSQL unique violation
    return res.status(409).json({
      status: 409,
      message: "Already created",
      error: err.message,
    });
  }
  res.status(500).json({
    status: 500,
    message: "Something went wrong",
    error: err.message,
  });
};

export default errorHandling;
