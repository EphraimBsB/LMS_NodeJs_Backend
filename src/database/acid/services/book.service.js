import model from "./../../models";
import { Op } from "sequelize";
class BookService {
  new = async (book) => {
    const newbook = await model.Books.create(book);
    return newbook;
  };

  saveImg = async (path) => {
    var img = await model.Books.create({ image: path });
    return img;
  };

  findBookbyDdc = async (title, ddc, description) => {
    const findBook = await model.Books.findOne({
      where: {
        [Op.or]: [{ title: title }, { ddc: ddc }, { description: description }],
      },
    });
    return findBook;
  };

  find = async (id) => {
    const findBook = await model.Books.findOne({
      where: { id },
      attributes: [
        "id",
        "title",
        "author",
        "description",
        "pub_year",
        "ddc",
        "acc_num",
        "subjects",
        "copies",
        "stock",
        "ebook",
        "image",
        "status",
        "shelf",
        "side",
        "column",
        "row",
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
        "pub_year",
        "ddc",
        "acc_num",
        "subjects",
        "copies",
        "stock",
        "ebook",
        "image",
        "status",
        "shelf",
        "side",
        "column",
        "row",
        "createdAt",
      ],
      order: [["id", "DESC"]],
    });
    BooksFindAll.forEach(async (element) => {
      if (element.stock == 0) {
        element.update({ status: "Borrowed" });
      }
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
        "pub_year",
        "ddc",
        "acc_num",
        "subjects",
        "copies",
        "stock",
        "ebook",
        "image",
        "status",
        "shelf",
        "side",
        "column",
        "row",
        "createdAt",
      ],
      order: [["id", "DESC"]],
    });
    return BooksFindAll;
  };
}
export default BookService;
