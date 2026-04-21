import bcrypt from "bcrypt";
import {
  createUserService,
  getUserByUsernameService,
} from "../model/userModel.js";
import handleResponse from "../routes/handleResponse.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsernameService(username);
    if (!user) {
      return handleResponse(res, 401, "Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return handleResponse(res, 401, "Invalid username or password");
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const { password: _, ...userData } = user;
    handleResponse(res, 200, "Login successful", { user: userData, token });
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
