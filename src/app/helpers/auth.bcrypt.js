/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const resolveHashPass = (hash, user) => {
  user.password = hash;
  return user;
};

export const hashPass = (user) => {
  const { password } = user;
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err);
      bcrypt.hash(password, salt, (error, hash) =>
        error ? reject(error) : resolve(resolveHashPass(hash, user))
      );
    });
  });
};

export const comparePass = (req, res, data) => {
  const { body: user } = req;
  const { password } = user;
  bcrypt.compare(password, data.password, (error, result) => {
    if (result) {
      jwt.sign(
        {
          id: data.id,
          roll_number: data.roll_number,
          role: data.role,
        },
        "secrete",
        // { expiresIn: "1d" },
        (_, token) => {
          res.status(200).json({
            message: "Authentification Successfuly",
            token,
          });
        }
      );
    } else {
      res.status(401).json({
        status: 401,
        message: "Invalid credentials",
        error,
      });
    }
  });
};

export const userToken = (res, data) => {
  jwt.sign(
    {
      id: data.id,
      roll_number: data.roll_number,
    },
    "secrete",
    (error, token) => {
      res.status(200).json({
        status: 200,
        message: "User Created Successfuly",
        token,
      });
    }
  );
};
