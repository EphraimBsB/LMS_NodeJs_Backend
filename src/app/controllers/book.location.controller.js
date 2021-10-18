class BookLocationController {
  constructor(locationService) {
    this.locationService = locationService;
  }

  createLocation = (req, res) => {
    const { location } = req;
    const { bookId } = location;
    this.locationService
      .find(bookId)
      .then((result) => {
        if (result) {
          res.status(409).json({
            message: "Book Location already exist",
          });
        } else {
          this.locationService
            .createBookLocation(req)
            .then((resust) => {
              res.status(201).json({
                message: "Created sucessfully",
                location: resust,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "can not create location on no existing book",
                err: err,
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
}
export default BookLocationController;
