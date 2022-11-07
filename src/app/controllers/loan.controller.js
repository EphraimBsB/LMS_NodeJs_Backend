class LoanController {
  constructor(service, workbook) {
    this.service = service;
    this.workbook = workbook;
  }

  checkUser = async (req, res, next) => {
    const { userId } = req.body;
    if(!userId){
      next();
    }else{
    await this.service
      .checkLoan(userId)
      .then(async (response) => {
        if (response) {
          let user = await this.service.checkUser(userId);
          if (user) {
            return res.status(409).json({
              message: "Soory Can't borrow two books at once",
            });
          }
        }
        next();
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          err: err.message,
        });
      });
    }
  };

  newLoan = async (req, res) => {
    const { userId, bookId, bookAccNo, id } = req.body;
    if(userId && bookId){
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
    }else{
      this.service
      .issueBook(id,bookAccNo)
      .then((result) => {
        if(result == null){
          res.status(404).json({ 
            message: "Access Number Not Available",
            loan: result,
          });
        }else{
        res.status(201).json({
          loan: result,
        });
      }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          err: err.message,
        });
      });
    }
    
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

  filter = (req, res) => {
    let { keyword } = req.query;
    this.service
      .filterLoans(keyword)
      .then((result) => {
        res.status(200).json({ loans: result });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Something wrong, can't search",
          error: error,
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
