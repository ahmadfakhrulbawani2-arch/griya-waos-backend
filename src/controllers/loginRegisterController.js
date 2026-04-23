import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUserService,
  getUserByUsernameService,
} from "../model/userModel.js";
import handleResponse from "../routes/handleResponse.js";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByUsernameService(username);

    if (!user) {
      const err = new Error("Invalid username or password");
      err.name = "UnauthorizedError";
      return next(err);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const err = new Error("Invalid username or password");
      err.name = "UnauthorizedError";
      return next(err);
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "18h" },
    );

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    handleResponse(res, 200, "Login successfully", {
      ...userData,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await createUserService(username, email, hashedPassword);
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    next(err);
  }
};
