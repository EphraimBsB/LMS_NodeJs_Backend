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
    return upDate;
  };

  delete = async (obj) => {
    const destroy = await model.Books.destroy(obj);
    return destroy;
  };

  findAllBooks = async (page, size) => {
    const BooksFindAll = await model.Books.findAndCountAll(
      {
        limit: +size || 100,
        offset: +page * +size || 0,
        where: {},
        order: [["id", "DESC"]],
      }
    );
    return BooksFindAll
  };

  searchBook = async (keyword) => {
    const BooksFindAll = await model.Books.findAndCountAll({
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

  analitics = async () => {
    let total = 0;
    let physical = [];
    let ebook = [];
    let available = 0;
    let analycis = {};
    const allCollection = await model.Books.findAll();
    allCollection.map(book => {
      total += parseInt(book.copies);
      available += parseInt(book.stock);
      if(book.type.includes('Physical')){
        physical.push(book);
      }else if(book.type.includes('E-book')){
        ebook.push(book);
      }
    });
    
    const phy = physical.length;
    const eb = ebook.length;
    analycis={
      total,
      available,
      phy,
      eb
    }
    
    return analycis
  };
}
export default BookService;
