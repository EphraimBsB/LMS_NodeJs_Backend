import model from "../../models";
import { Op } from "sequelize";
import { async } from "regenerator-runtime";

class LoanService {
  constructor() {
    let timerId;
    this.timerId = timerId;
  }

  new = async (userId, bookId) => {
    // const { userId, bookId } = req.body;
    let issueDate = new Date();
    let dueDate = new Date(issueDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const returnDate = null;
    let status = "Inprogress";
    const user = await model.User.findOne({ where: { id: userId } });
    const book = await model.Books.findOne({ where: { id: bookId } });
    const newloan = await model.Loans.create({
      userId,
      bookId,
      issueDate,
      dueDate,
      returnDate,
      status,
    });
    const findBook = await model.Books.findOne({
      where: { id: bookId },
    });

    findBook.update({ status: "Borrowed" });

    return newloan;
  };

  findAllLoans = async () => {
    // let issueDate = new Date();
    // let dueDate = new Date(issueDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const loans = await model.Loans.findAll({
      attributes: [
        "id",
        "userId",
        "bookId",
        "issueDate",
        "dueDate",
        "returnDate",
        "status",
      ],
      where: {},
      order: [["id", "DESC"]],
      include: [
        {
          model: model.Books,
          attributes: [
            "id",
            "title",
            "author",
            "description",
            "ddc",
            "acc_number",
            "category",
            "copies",
            "status",
            "image",
          ],
        },
        {
          model: model.User,
          attributes: [
            "id",
            "name",
            "last_name",
            "roll_number",
            "email",
            "phone_number",
          ],
        },
      ],
    });
    loans.forEach(async (element) => {
      const dueDate = element.dueDate;
      const overdueDate = new Date();
      if (overdueDate.getTime() >= dueDate.getTime()) {
        element.update({
          status: "Overdue",
          where: { status: "Inprogress" },
        });
      }
    });

    if (!loans) return null;

    return loans;
  };

  findaLoan = async (req) => {
    const { id } = req.params;
    let { action } = req.body;
    const loan = await model.Loans.findOne({
      attributes: [
        "id",
        "userId",
        "bookId",
        "issueDate",
        "dueDate",
        "returnDate",
        "status",
        "updatedAt",
      ],
      where: { id },

      include: [
        {
          model: model.Books,
          attributes: [
            "id",
            "title",
            "author",
            "ddc",
            "acc_number",
            "category",
            "status",
            "image",
          ],
        },
        {
          model: model.User,
          attributes: [
            "id",
            "name",
            "last_name",
            "roll_number",
            "email",
            "phone_number",
          ],
        },
      ],
    });
    if (action === "return") {
      const findBook = await model.Books.findOne({
        where: { id: loan.bookId },
      });

      findBook.update({ status: "Available" });
      loan.update({
        returnDate: new Date(),
        status: "Returned",
      });
    }
    return loan;
  };

  checkLoan = async (bookId) => {
    const loan = await model.Loans.findOne({
      where: {
        bookId: bookId,
        [Op.and]: {
          [Op.or]: [{ status: "Inprogress" }, { status: "Overdue" }],
        },
      },
    });
    return loan;
  };

  userLoans = async (req) => {
    const { id } = req.params;
    const user = await model.User.findOne({
      where: { id: id },
      attributes: [
        "id",
        "name",
        "last_name",
        "roll_number",
        "email",
        "phone_number",
      ],
    });

    const Loans = await model.Loans.findAll({
      where: { userId: user.id },
      attributes: [
        "id",
        "userId",
        "bookId",
        "issueDate",
        "dueDate",
        "returnDate",
        "status",
      ],
      include: [
        {
          model: model.Books,
          attributes: [
            "id",
            "title",
            "author",
            "ddc",
            "acc_number",
            "category",
            "status",
            "image",
          ],
        },
      ],
      order: [["id", "DESC"]],
    });

    const userLoan = {
      user,
      Loans,
    };
    return userLoan;
  };
}
export default LoanService;
