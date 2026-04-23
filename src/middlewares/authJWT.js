// buat cek apakah user authorize ke protected routes
import jwt from "jsonwebtoken";

const authJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const err = new Error("Token missing");
      err.name = "UnauthorizedError";
      return next(err);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    err.name = "UnauthorizedError";
    next(err);
  }
};

export default authJWT;
