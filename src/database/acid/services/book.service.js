import { async } from "regenerator-runtime";
import model from "./../../models";
import { Op } from "sequelize";
class BookService {
  new = async (book) => {
    const newbook = await model.Books.create(book);
    return newbook;
  };

  createAcc = async (req) => {
    const { book } = req;
    const { copies } = book;
    for (let acc_number = 0; acc_number < copies; acc_number++) {
      await model.AccNumbers.create({ acc_number });
    }
  };

  findBookbyDdc = async (ddc) => {
    const findBook = await model.Books.findOne({ where: { ddc } });
    return findBook;
  };

  find = async (id) => {
    const findBook = await model.Books.findOne({
      where: { id },
      include: [
        {
          model: model.Location,
          attributes: ["block", "column", "section", "row", "ddc"],
          // as: "location",
        },
      ],
    });
    return findBook;
  };

  update = async (editedBook, id) => {
    const upDate = await model.Books.update(editedBook, id);
    return upDate;
  };

  delete = async (obj) => {
    const destroy = await model.Books.destroy(obj);
    return destroy;
  };

  findAllBooks = async () => {
    const BooksFindAll = await model.Books.findAll({
      where: {},
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
        "createdAt",
      ],
      include: [
        {
          model: model.Location,
          attributes: ["block", "column", "section", "row", "ddc"],
        },
      ],
      order: [["id", "DESC"]],
    });
    return BooksFindAll;
  };

  searchBook = async (keyword) => {
    const BooksFindAll = await model.Books.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          {
            author: {
              [Op.like]: "%" + keyword + "%",
            },
          },
        ],
      },
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
        "createdAt",
      ],
      include: [
        {
          model: model.Location,
          attributes: ["block", "column", "section", "row", "ddc"],
        },
      ],
      order: [["id", "DESC"]],
    });
    return BooksFindAll;
  };
}
export default BookService;
