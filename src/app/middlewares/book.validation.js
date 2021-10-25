import Joi from "joi";

const bookValidation = (req, res, next) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    ddc: req.body.ddc,
    copies: req.body.copies,
    acc_number: req.body.acc_number,
    category: req.body.category,
    status: req.body.status,
    image: req.body.image,
  };
  const schema = Joi.object().keys({
    title: Joi.string().required().max(255),
    author: Joi.string().required().max(255),
    description: Joi.string().required(),
    ddc: Joi.string().required().min(3).required().min(3),
    copies: Joi.number().required(),
    acc_number: Joi.string().required().min(3),
    category: Joi.string().required(),
    status: Joi.string().valid(
      "Available",
      "Unavailable",
      "Reserved",
      "Borrowed"
    ),
    image: Joi.string().required().min(10),
  });
  const { error } = schema.validate(book);
  if (error) {
    return res.status(400).json({
      message: "validation has faild",
      error: error.message,
    });
  }
  req.book = book;
  return next();
};

export default bookValidation;
