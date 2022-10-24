import model from "./../../models";
const readXlsxFile = require("read-excel-file/node");
var isbn = require('node-isbn');

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    console.log("FILE",req.file)
    let path = "uploaded_files/excel.data/" + req.file.filename;
    readXlsxFile(path).then((rows) => {
      rows.shift();
      let Books = [];
      rows.forEach((row) => {
        
        if(row[7] !== null && row[7]){
        let isb = row[7].toString().replace('978-','');
        // console.log('ISBN ROW : ', isb);
        isbn.resolve(isb, function (err, book) {
          if (err) {
              // console.log('Book not found', err);
              // console.log('NOT FOUND:', isb);
          } else {
          let bookItem = {
            title: book.title,
            author: book.authors,
            description: book.description,
            editions: book.editions,
            ddc: book.ddc,
            acc_num: book.acc_num,
            isbn: book.isbn,
            copies: book.copies,
            stock: book.copies,
            categories: book.categories,
            subjects: book.subjects,
            pub_year: book.pub_year,
            source: book.source,
            from: book.from,
            type: book.type,
            image: imageFilePath,
            ebook: ebookpath,
            status: book.status,
            shelf: book.shelf,
            side: book.side,
            column: book.column,
            row: book.row,
        };
        Books.push(bookItem);
              console.log('Book found: ', book);
              console.log('FOUND :', isb);
          }
        });
      }
      });
      model.Books.bulkCreate(Books)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

export default upload;
