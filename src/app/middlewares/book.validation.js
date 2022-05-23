import Joi from "joi";

const bookValidation = (req, res, next) => {
  let imageFilePath;
  let ebookpath;
  if (req.files.ebook != undefined) {
    ebookpath = "./uploaded_files/e-books/" + req.files.ebook[0].filename;
  }
  if (req.files.image != undefined) {
    imageFilePath =
      "./uploaded_files/book_images/" + req.files.image[0].filename;
  } else {
    imageFilePath = req.body.image;
  }

  const book = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    ddc: req.body.ddc,
    acc_num: req.body.acc_num,
    copies: req.body.copies,
    stock: req.body.copies,
    subjects: req.body.subjects,
    pub_year: req.body.pub_year,
    image: imageFilePath,
    ebook: ebookpath,
    status: req.body.status,
    shelf: req.body.shelf,
    side: req.body.side,
    column: req.body.column,
    row: req.body.row,
  };
  const schema = Joi.object().keys({
    title: Joi.string().required().max(255),
    author: Joi.string().required().max(255),
    description: Joi.string().required(),
    ddc: Joi.string().required().min(3).required().min(3),
    acc_num: Joi.string().required(),
    copies: Joi.number().required(),
    stock: Joi.number().required(),
    subjects: Joi.string().required(),
    pub_year: Joi.string().required(),
    image: Joi.string().required(),
    ebook: Joi.string().required(),
    status: Joi.string().valid(
      "Available",
      "Unavailable",
      "Reserved",
      "Borrowed"
    ),
    shelf: Joi.string().required(),
    side: Joi.string().required(),
    column: Joi.number().integer().required(),
    row: Joi.number().integer().required(),
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
