import Joi from "joi";

const bookLocationValidation = (req, res, next) => {
  const location = {
    bookId: req.body.bookId,
    block: req.body.block,
    column: req.body.column,
    // section: req.body.section,
    row: req.body.row,
    // ddc: req.body.ddc,
  };

  const schema = Joi.object().keys({
    bookId: Joi.number().integer().required(),
    block: Joi.number().integer().required(),
    column: Joi.number().integer().required(),
    // section: Joi.string().required().min(3),
    row: Joi.number().integer().required(),
    // ddc: Joi.string().required().min(3),
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
