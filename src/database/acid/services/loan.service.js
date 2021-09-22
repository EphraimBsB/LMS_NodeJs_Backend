import model from "../../models";
import { Op } from "sequelize";

class LoanService {
  new = async (userId, bookId) => {
    // const { userId, bookId } = req.body;
    let issueDate = new Date();
    let dueDate = new Date(issueDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const returnDate = null;
    let status = "inProgress";
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

    findBook.update({ status: "borrowed" });

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
    loans.forEach((element) => {
      const id = element.id;
      setTimeout(async () => {
        const overDue = new Date();
        if (overDue.getTime() > element.dueDate.getTime()) {
          await model.Loans.update({ status: "overdue" });
        }
      }, 1000);
    });

    if (!loans) return null;

    return loans;
  };

  findaLoan = async (req) => {
    const { id } = req.params;
    let { action } = req.body;
    const loan = await model.Loans.findOne({
      where: { id },

      include: [
        {
          model: model.Books,
        },
        {
          model: model.User,
        },
      ],
    });
    if (action === true) {
      const findBook = await model.Books.findOne({
        where: { id: loan.bookId },
      });

      findBook.update({ status: "available" });
      loan.update({ returnDate: new Date(), status: "returned" });
    }
    return loan;
  };

  checkLoan = async (bookId) => {
    const loan = await model.Loans.findOne({
      where: {
        bookId: bookId,
        [Op.and]: {
          [Op.or]: [{ status: "inProgress" }, { status: "overdue" }],
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
