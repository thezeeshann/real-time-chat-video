import UserModel from "../models/user.js";
import registerSchema from "../lib/validations/register.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const body = await registerSchema.validateAsync(req.body);
    const { name, email, password } = body;

    const existUser = await UserModel.find({ email });
    if (!existUser) {
      return res.status(400).json({
        success: false,
        message: "This email alredy used",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
