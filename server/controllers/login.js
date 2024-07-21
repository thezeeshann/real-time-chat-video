import loginSchema from "../lib/validations/login.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const body = await loginSchema.validateAsync(req.body);
    const { email, password } = body;

    const exitUser = await UserModel.findOne({ email });

    if (exitUser) {
      const checkPassword = await bcrypt.compare(password, exitUser.password);

      if (!checkPassword) {
        return res.status(404).json({
          success: false,
          message: "Invlid credentials",
        });
      }

      const payload = {
        userId: exitUser._id,
        userEmail: exitUser.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      const option = {
        httpOnly: true,
        secure: true,
      };

      return res.cookie("token", token, option).json({
        success: true,
        message: "user login successfully",
        token,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export default login;
