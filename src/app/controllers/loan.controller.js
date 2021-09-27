class LoanController {
  constructor(service) {
    this.service = service;
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
}

export default LoanController;
