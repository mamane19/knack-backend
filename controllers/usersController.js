import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/users.model.js";

dotenv.config();

//Add a User
export async function signUp(req, res) {
  try {
    // let userExists = await Users.findAll({where: {Email: req.body.Email}});
    // if (userExists) {
    //     res.status(500).json({
    //     success: false,
    //     message: "Oopss! User Email already exists..."
    //     });
    // } else {
    bcrypt.hash(req.body.password, 10).then(async (hash) => {
      let userObj = {
        email_address: req.body.email_address,
        password: hash,

        user_name: req.body.user_name,
      };
      let user = await Users.create(userObj);
      if (user) {
        res.status(200).json({
          success: true,
          message: "User created successfully",
          data: user,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "User could not be created at this time",
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
}

//Sign In
export async function signIn(req, res) {
  //Get a user with the email address
  //Ensure that their password is correct
  //Create a JWT for them. (For Authenticating Other API Requests)
  try {
    let user = await User.findOne({
      where: { email_address: req.body.email_address },
    });
    if (!user) {
      return res.status(401).json({
        status: failed,
        message: "Authentication Failed: User with email address not found.",
      });
    }
    bcrypt.compare(req.body.password, user.password).then((response) => {
      if (!response) {
        return res.status(401).json({
          status: false,
          message: "Authentication Failed: Incorrect password.",
        });
      }
      let authToken = jwt.sign(
        { email_address: user.email_address, user_id: user.user_id },
        process.env.AUTH_KEY,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        status: true,
        message: "User authentication successful",
        user: {
          user_name: user.user_name,
          email_address: user.email_address,
          user_id: user.user_id,
        },
        token: authToken,
        expiresIn: 3600,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
}
