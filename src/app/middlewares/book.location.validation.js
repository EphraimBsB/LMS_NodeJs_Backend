import Joi from "joi";

const bookLocationValidation = (req, res, next) => {
  const location = {
    bookId: req.body.bookId,
    shelf: req.body.shelf,
    side: req.body.side,
    column: req.body.column,
    row: req.body.row,
  };

  const schema = Joi.object().keys({
    bookId: Joi.number().integer().required(),
    shelf: Joi.string().required(),
    side: Joi.string().required(),
    column: Joi.number().integer().required(),
    row: Joi.number().integer().required(),
  });
  const { error } = schema.validate(location);
  if (error) {
    return res.status(400).json({
      message: "validation has faild",
      error: error.message,
    });
  }
  req.location = location;
  return next();
};

export default bookLocationValidation;
