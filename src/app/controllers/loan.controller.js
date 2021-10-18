class LoanController {
  constructor(service, workbook) {
    this.service = service;
    this.workbook = workbook;
  }
  newLoan = async (req, res) => {
    const { userId, bookId } = req.body;
    await this.service
      .checkLoan(bookId)
      .then((result) => {
        if (result) {
          res.status(409).json({
            message: "Loan already exist",
          });
        } else {
          this.service
            .new(userId, bookId)
            .then((result) => {
              res.status(201).json({
                loan: result,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Something went wrong",
                err: err.message,
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Book does not exist",
          err: err,
        });
      });
  };

  findall = (req, res) => {
    this.service
      .findAllLoans()
      .then((result) => {
        res.status(200).json({
          loans: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          err: err.message,
        });
      });
  };

  findOne = (req, res) => {
    this.service
      .findaLoan(req)
      .then((result) => {
        res.status(200).json({
          loans: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          err: err.message,
        });
      });
  };

  findUserLoans = (req, res) => {
    this.service
      .userLoans(req)
      .then((result) => {
        res.status(200).json({
          loans: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          err: err.message,
        });
      });
  };

  exportExcel = async (req, res) => {
    this.service
      .findAllLoans()
      .then((objs) => {
        let books = [];

        objs.forEach((obj) => {
          books.push({
            title: obj.Book.title,
            author: obj.Book.author,
            description: obj.Book.description,
            ddc: obj.Book.ddc,
            copies: obj.Book.copies,
            acc_number: obj.Book.acc_number,
            name: obj.User.name,
            last_name: obj.User.last_name,
            roll_number: obj.User.roll_number,
            course: obj.User.course,
            email: obj.User.email,
            phone_number: obj.User.phone_number,
            issueDate: obj.issueDate,
            dueDate: obj.dueDate,
            returnDate: obj.returnDate,
          });
        });
        this.workbook.removeWorksheet();
        let worksheet = this.workbook.addWorksheet("Loans");

        worksheet.columns = [
          { header: "Title", key: "title", width: 35 },
          { header: "Author", key: "author", width: 35 },
          { header: "Description", key: "description", width: 35 },
          { header: "DDC Number", key: "ddc", width: 35 },
          { header: "Copies", key: "copies", width: 35 },
          { header: "ACC Number", key: "acc_number", width: 15 },
          { header: "Student", key: "name", width: 20 },
          { header: "Lastname", key: "last_name", width: 20 },
          { header: "Roll No", key: "roll_number", width: 20 },
          { header: "Course", key: "course", width: 20 },
          { header: "Email", key: "email", width: 25 },
          { header: "Phone No", key: "phone_number", width: 25 },
          { header: "Issue Date", key: "issueDate", width: 20 },
          { header: "Due Date", key: "dueDate", width: 20 },
          { header: "Returned Date", key: "returnDate", width: 20 },
        ];

        // Add Array Rows
        worksheet.addRows(books);

        const data = this.workbook.xlsx.writeFile("./excel.data/loans.xlsx");
        res.status(200).json({
          message: "Succefull",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          error: err,
        });
      });
  };
}

export default LoanController;
