import model from "./../../models";

class BookLocationService {
  createBookLocation = async (req) => {
    const { location } = req;
    const { bookId, shelf, side, column, row } = location;
    const book = await model.Books.findOne({ where: { id: bookId } });
    const bookLocation = await model.Location.create({
      bookId,
      shelf,
      side,
      column,
      section: book.subjects,
      row,
      ddc: book.ddc,
    });
    return bookLocation;
  };

  find = async (bookId) => {
    const findBook = await model.Location.findOne({ where: { bookId } });
    return findBook;
  };

  update = async (location, id) => {
    const upDate = await model.Location.update(location, id);
    return upDate;
  };
}

export default BookLocationService;
