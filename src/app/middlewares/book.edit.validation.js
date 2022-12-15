import Joi from "joi";

const bookEditValidation = (req, res, next) => {
  let imageFilePath;
  let ebookpath;
  
  if (req.files.ebook != undefined) {
    ebookpath = "/uploaded_files/e-books/" + req.files.ebook[0].filename;
  }
  if (req.files.image != undefined) {
    imageFilePath =
      "/uploaded_files/book_images/" + req.files.image[0].filename;
  } else {
    imageFilePath = req.body.image;
  }

  const editbook = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    editions: req.body.editions,
    ddc: req.body.ddc,
    acc_num: req.body.acc_num,
    isbn: req.body.isbn,
    copies: req.body.copies,
    stock: req.body.copies,
    categories: req.body.categories,
    subjects: req.body.subjects,
    publisher: req.body.publisher,
    pub_year: req.body.pub_year,
    source: req.body.source,
    from: req.body.from,
    type: req.body.type,
    image: imageFilePath,
    ebook: ebookpath,
    location: req.body.location,
    shelf: req.body.shelf,
  };
  
  // const schema = Joi.object().keys({
  //   title: Joi.string().max(255),
  //   author: Joi.string().max(255),
  //   description: Joi.string(),
  //   editions: Joi.string(),
  //   ddc: Joi.string().min(3).min(3),
  //   acc_num: Joi.string(),
  //   isbn: Joi.string(),
  //   copies: Joi.number(),
  //   stock: Joi.number(),
  //   categories: Joi.string(),
  //   subjects: Joi.string(),
  //   publisher: Joi.string(),
  //   pub_year: Joi.string(),
  //   source: Joi.string(),
  //   from: Joi.string(),
  //   type: Joi.string(),
  //   image: Joi.string(),
  //   ebook: Joi.string(),
  //   shelf: Joi.string(),
  //   side: Joi.string(),
  //   column: Joi.number().integer(),
  //   row: Joi.number().integer(),
  // });
  // const { error } = schema.validate(editbook);
  // // console.log('Book REQUEST FILES: ',editbook);
  // if (error) {
  //   console.log('Book REQUEST FILES: ',error);
  //   return res.status(400).json({
  //     message: "validation has failed",
  //     error: error.message,
  //   });
  // }
  // console.log('Book REQUEST FILES: ',editbook);
  req.editbook = editbook;
  return next();
};

export default bookEditValidation;
