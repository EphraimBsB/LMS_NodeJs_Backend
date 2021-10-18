import Joi from "joi";

export const registerValidation = (req, res, next) => {
  const user = {
    name: req.body.name,
    last_name: req.body.last_name,
    roll_number: req.body.roll_number,
    course: req.body.course,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: req.body.password,
    role: req.body.role,
  };
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    last_name: Joi.string().min(3).max(30).required(),
    roll_number: Joi.string().min(3).max(10).required(),
    course: Joi.string().min(3).max(10).required(),
    email: Joi.string()
      .regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
      .required(),
    phone_number: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(6).max(15).required(),
    role: Joi.string().valid("librarian", "student", "admin"),
  });
  const { error } = schema.validate(user);
  if (error) {
    return res.status(400).json({
      message: "validation has faild",
      error: error.message,
    });
  }
  req.user = user;
  return next();
};

export const loginValidation = (req, res, next) => {
  const user = {
    roll_number: req.body.roll_number,
    password: req.body.password,
  };
  const schema = Joi.object({
    roll_number: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).required(),
  });
  const { error } = schema.validate(user);
  if (error) {
    return res.status(400).json({
      message: "validation has faild",
      error: error.message,
    });
  }
  req.user = user;
  return next();
};
