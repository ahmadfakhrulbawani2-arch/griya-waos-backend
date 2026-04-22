// centralize error handling
const errorHandling = (err, req, res, next) => {
  console.log(err);

  // default response
  let status = 500;
  let message = "Something went wrong";

  switch (err.code) {
    // Unique violation
    case "23505":
      status = 409;
      message = "Duplicate value (already exists)";
      break;

    // Foreign key violation
    case "23503":
      status = 400;
      message = "Invalid reference (foreign key violation)";
      break;

    // Not null violation
    case "23502":
      status = 400;
      message = "Missing required field (NOT NULL constraint)";
      break;

    // Check constraint violation
    case "23514":
      status = 400;
      message = "Check constraint violated";
      break;

    // Invalid text representation (wrong type, UUID error, etc.)
    case "22P02":
      status = 400;
      message = "Invalid input format";
      break;

    // undefined column / query error
    case "42703":
      status = 400;
      message = "Column does not exist";
      break;

    default:
      // fallback (non-Postgres errors)
      if (err.name === "ValidationError") {
        status = 400;
        message = "Validation error";
      }

      if (err.name === "UnauthorizedError") {
        status = 401;
        message = "Unauthorized";
      }

      if (err.name === "ForbiddenError") {
        status = 403;
        message = "Forbidden";
      }

      break;
  }

  return res.status(status).json({
    status,
    message,
    error: err.message,
  });
};

export default errorHandling;
