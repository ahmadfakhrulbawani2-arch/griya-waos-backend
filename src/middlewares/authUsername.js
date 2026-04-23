// aku harus buat auth username karena params di FE [username] jadi aku harus auth lewat username

const authUsername = (req, res, next) => {
  const usernameFromToken = req.user.username;
  const usernameFromParams = req.params.username;

  if (usernameFromToken !== usernameFromParams) {
    const err = new Error("Forbidden");
    err.name = "ForbiddenError";
    return next(err);
  }

  next();
};

export default authUsername;
