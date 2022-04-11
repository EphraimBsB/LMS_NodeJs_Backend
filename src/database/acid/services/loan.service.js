import model from "../../models";
import { Op } from "sequelize";

class LoanService {
  new = async (userId, bookId, bookAccNo) => {
    let issueDate = new Date();
    let dueDate;
    const returnDate = null;
    let status = "Inprogress";

    const user = await model.User.findOne({ where: { id: userId } });
    if (user.degree === "undergraduate") {
      dueDate = new Date(issueDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    } else if (user.degree === "postgraduate") {
      dueDate = new Date(issueDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    } else if (user.degree === "lecturer") {
      dueDate = new Date(issueDate.getTime() + 120 * 24 * 60 * 60 * 1000);
    }

    const book = await model.Books.findOne({ where: { id: bookId } });
    let accNum = await book.acc_num.split(",");
    if (book.stock > 0 && accNum.includes(bookAccNo)) {
      const newloan = await model.Loans.create({
        userId,
        bookId,
        bookAccNo,
        issueDate,
        dueDate,
        returnDate,
        status,
      });

      let newStock = book.stock - 1;
      let index = accNum.indexOf(bookAccNo);
      if (index > -1) {
        accNum.splice(index, 1);
        let newAccNum = accNum.toString();
        book.update({ stock: newStock, acc_num: newAccNum });
      }

      return newloan;
    } else if (book.stock == 0) {
      book.update({ status: "Borrowed" });
    }
  };

  findAllLoans = async () => {
    const loans = await model.Loans.findAll({
      attributes: [
        "id",
        "userId",
        "bookId",
        "bookAccNo",
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
            "subjects",
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
      if (
        overdueDate.getTime() >= dueDate.getTime() &&
        element.returnDate == null
      ) {
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
    let { action, bookAccNo } = req.body;
    const loan = await model.Loans.findOne({
      attributes: [
        "id",
        "userId",
        "bookId",
        "bookAccNo",
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
            "description",
            "ddc",
            "subjects",
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
            "course",
            "email",
            "phone_number",
          ],
        },
      ],
    });
    if (action === "return" && bookAccNo == loan.bookAccNo) {
      const findBook = await model.Books.findOne({
        where: { id: loan.bookId },
      });
      let accNum = findBook.acc_num.split(",");

      if (loan.status === "Returned") {
        return loan;
      } else {
        await loan.update({
          returnDate: new Date(),
          status: "Returned",
        });
        let newStock = parseInt(findBook.stock) + 1;
        accNum.unshift(bookAccNo);
        accNum.sort();
        await findBook.update({
          status: "Available",
          stock: newStock,
          acc_num: accNum.toString(),
        });
      }
    }
    // else if (newDueDate) {
    //   await loan.update({
    //     dueDate: newDueDate,
    //   });
    // }
    return loan;
  };

  checkLoan = async (userId) => {
    const loan = await model.Loans.findOne({
      where: {
        userId: userId,
        [Op.and]: {
          [Op.or]: [{ status: "Inprogress" }, { status: "Overdue" }],
        },
      },
    });
    return loan;
  };

  checkUser = async (userId) => {
    const user = await model.User.findOne({ where: { id: userId } });
    if (user.degree === "undergraduate") return user;
  };

  userLoans = async (req) => {
    const { id } = req.params;
    const user = await model.User.findOne({
      where: { id: id },
      attributes: [
        "id",
        "name",
        "last_name",
        "course",
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
        "bookAccNo",
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
            "subjects",
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
