class BookController {
  constructor(service) {
    this.service = service;
  }
  newBook = (req, res) => {
    const { book } = req;
    const { ddc } = book;
    this.service
      .findBookbyDdc(ddc)
      .then((result) => {
        if (result) {
          res.status(409).json({
            message: "Book already exist",
          });
        } else {
          this.service
            .new(book)
            .then((resust) => {
              res.status(201).json({
                message: "Created sucessfully",
                book: resust,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Something went wrong",
                err: err,
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          err: err.message,
        });
      });
  };

  findBook = (req, res) => {
    const { id } = req.params;
    this.service
      .find(id)
      .then((resust) => {
        if (resust) {
          res.status(200).json({
            book: resust,
          });
        } else {
          res.status(404).json({
            message: "Not Found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          err: err.message,
        });
      });
  };

  findAll = (_, res) => {
    this.service
      .findAllBooks()
      .then((result) => {
        res.status(200).json({
          books: result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Something wrong, can't find",
          error: error,
        });
      });
  };

  search = (req, res) => {
    let { keyword } = req.query;

    this.service
      .searchBook(keyword)
      .then((result) => {
        res.status(200).json({ books: result });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Something wrong, can't search",
          error: error,
        });
      });
  };

  editbook = (req, res) => {
    const editedBook = {
      title: req.body.title,
      author: req.body.author,
      ddc: req.body.ddc,
      acc_number: req.body.acc_number,
      status: req.body.status,
      image: req.body.image,
    };
    const { id } = req.params;
    const obj = { where: { id } };
    this.service
      .update(editedBook, obj)
      .then((result) => {
        if (result[0] === 1) {
          res.status(200).json({
            message: "Book updated succefully",
            book: editedBook,
          });
        } else {
          res.status(404).json({
            message: "Not Found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          error: err.name,
        });
      });
  };

  deleteBook = (req, res) => {
    const { id } = req.params;
    const obj = { where: { id } };
    this.service
      .delete(obj)
      .then((result) => {
        if (result) {
          res.status(200).json({
            message: "Deleted succefully",
          });
        } else {
          res.status(404).json({
            message: "Not Found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          error: err.name,
        });
      });
  };
}
export default BookController;
