var isbn = require('node-isbn');

const oclcFunc = (req, res) => {
    let {oclc} = req.params;
    console.log(oclc);
    isbn.resolve(oclc, function (err, book) {
        if (err) {
            res.status(404).json({
                message: "Not Found",
              });
            console.log('FAILD', err);
        } else {
            res.status(200).json({
                message: "Book Found Sucessfully",
                book: book,
              });
              console.log('SUCCESS');
        }
    });
}
module.exports = oclcFunc;