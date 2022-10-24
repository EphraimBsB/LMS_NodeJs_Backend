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

  findBookbyDdc = async (title, ddc, description, image) => {
    const findBook = await model.Books.findOne({
      where: {
        [Op.or]: [{ title: title }, { ddc: ddc }, { description: description }, {image:image}],
      },
    });
    return findBook;
  };

  find = async (id) => {
    const findBook = await model.Books.findOne({where: { id },});
    return findBook;
  };

  update = async (editedBook, id) => {
    const upDate = await model.Books.update(editedBook, id);
    console.log("BOOK ID :",upDate);
    return upDate;
  };

  delete = async (obj) => {
    const destroy = await model.Books.destroy(obj);
    return destroy;
  };

  findAllBooks = async () => {
    const BooksFindAll = await model.Books.findAll({
      where: {},
      order: [["id", "DESC"]],
    });
    BooksFindAll.forEach(async (element) => {
      if (element.stock == 0) {
        element.update({ status: "Borrowed" });
      }
    });
    return BooksFindAll
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
          {
            ddc: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          {
            subjects: {
              [Op.like]: "%" + keyword + "%",
            },
          },
        ],
      },
      order: [["id", "DESC"]],
    });
    return BooksFindAll;
  };

  filterBooks = async (keyword) => {
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
          {
            ddc: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          {
            isbn: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          {
            categories: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          {
            subjects: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          {
            pub_year: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          {
            type: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          {
            source: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          {
            status: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          
        ],
      },
      order: [["id", "DESC"]],
    });
    return BooksFindAll;
  };
}
export default BookService;
