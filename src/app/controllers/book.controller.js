import removeEmptyObject from "./../helpers/remove.empty.object"
class BookController {
  constructor(service, workbook) {
    this.service = service;
    this.workbook = workbook;
  }
  newBook = (req, res) => {
    const { book } = req;
    const { title, ddc, description, image } = book;
    this.service
      .findBookbyDdc(title, ddc, description, image)
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

  imageUpload = (req, res) => {
    if (req.file) {
      let path = "./uploaded_files/book_images" + req.file.filename;
      this.service
        .saveImg(path)
        .then((resust) => {
          res.status(201).json({
            message: "Created sucessfully",
            resust,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Something went wrong",
            err: err,
          });
        });
    } else {
      res.status(500).json({
        message: "Can't upload img",
      });
    }
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

  findAll = (req, res) => {
    const {page, size} = req.query;
    this.service
      .findAllBooks(page, size)
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

  filter = (req, res) => {
    let { keyword } = req.query;

    this.service
      .filterBooks(keyword)
      .then((result) => {
        res.status(200).json({ books: result });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Something wrong, can't Filter Books",
          error: error,
        });
      });
  };

  editbook = (req, res) => {
    const editbook = req.body;
    const book = removeEmptyObject(editbook);
    const { id } = req.params;
    const obj = { where: { id } };
    this.service
      .update(book, obj)
      .then((result) => {
        if (result[0] === 1) {
          res.status(200).json({
            message: "Book updated succefully",
            editBook: book,
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
  

  exportExcel = (req, res) =>{
    let { name } = req.query;
    this.service
      .exportAlltoExcel()
      .then(async(objs) => {
        let books = [];
        objs.forEach((obj) => {
          books.push({
            id: obj.id,
            title: obj.title,
            author: obj.author,
            description: obj.description,
            publisher:obj.publisher,
            pub_year:obj.pub_year,
            isbn:obj.isbn,
            ddc: obj.ddc,
            acc_num: obj.acc_num,
            categories:obj.categories,
            type:obj.type,
            copies: obj.copies,
            stock: obj.stock,
            subjects: obj.subjects,
            status: obj.status,
            image: obj.image,
          });
        });
        this.workbook.removeWorksheet();
        let worksheet = this.workbook.addWorksheet("Books");

        worksheet.columns = [
          { header: "Title", key: "title", width: 35 },
          { header: "Author", key: "author", width: 35 },
          { header: "Description", key: "description", width: 35 },
          { header: "Publisher", key: "publisher", width: 20 },
          { header: "Pub Year", key: "pub_year", width: 20 },
          { header: "ISBN Number", key: "isbn", width: 20 },
          { header: "DDC Number", key: "ddc", width: 35 },
          { header: "ACC Number", key: "acc_num", width: 20 },
          { header: "Category", key: "categories", width: 20 },
          { header: "Book Type", key: "type", width: 20 },
          { header: "subjects", key: "subjects", width: 20 },
          { header: "Copies", key: "copies", width: 10 },
          { header: "Stock", key: "stock", width: 10 },
          { header: "Status", key: "status", width: 20 },
          { header: "Image", key: "image", width: 35 },
        ];

        worksheet.addRows(books);

        const data = await this.workbook.xlsx.writeFile(`uploaded_files/excel.data/${name}`);
        res.status(200).json({
          message: "File Exported Successfully",
          file: data
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong ON export",
          error: err,
        });
      });
  };

  

  booksAnalitics = (req, res) => {
    this.service
      .analitics()
      .then((result) => {
        console.log(result);
        res.status(200).json({ analysis: result });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Something wrong, can't ANALYSE Books",
          error: error,
        });
      });
  };
}
export default BookController;
