import model from "./../../models";

class BookLocationService {
  createBookLocation = async (req) => {
    const { location } = req;
    const { bookId, block, column, row } = location;
    const book = await model.Books.findOne({ where: { id: bookId } });
    const bookLocation = await model.Location.create({
      bookId,
      block,
      column,
      section: book.category,
      row,
      ddc: book.ddc,
    });
    return bookLocation;
  };

  find = async (bookId) => {
    const findBook = await model.Location.findOne({ where: { bookId } });
    return findBook;
  };
}

export default BookLocationService;
