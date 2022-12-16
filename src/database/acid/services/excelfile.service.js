import model from "./../../models";
const readXlsxFile = require("read-excel-file/node");
import { Op } from "sequelize";
let isbn = require('node-isbn');
const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    let path = "uploaded_files/excel.data/" + req.file.filename;

    readXlsxFile(path).then(async (rows) => {
      let slicedRows = rows.slice(2);
      const books = await Promise.all(slicedRows.map(async row => {
        return await isbn.resolve(row[5]).then((book) => ( {
          title: row[3]??'NO TITLE',
          author: row[2]??'NO AUTHOR',
          description:book.description??'NO DESCRIPTION AVAILABLE',
          editions: 'No Edition',
          ddc: row[6],
          acc_num: '0000,0000,0000',
          isbn: row[5]??'NO ISBN',
          copies: row[8]??'NO COPIES',
          stock: row[8]??'NO STOCK',
          categories: 'Book',
          subjects: row[7]??'NO SUBJECT',
          publisher: book.publisher??'NO PUBLISHER',
          pub_year: book.publishedDate??'NO PUB YEAR',
          source: 'Purchased',
          from: 'ISBAT University',
          type: 'Physical',
          image: book.imageLinks.thumbnail??'/uploaded_files/book_images/No-image.jpg',
          location: 'ISBAT Main Campus',
          shelf: 'Open Shelf',
          location: 'Main Campus',
        })).catch(err => ({
          title: row[3]??'NO TITLE',
          author: row[2]??'NO AUTHOR',
          description:'NO DESCRIPTION AVAILABLE',
          editions: 'No Edition',
          ddc: row[6],
          acc_num: '0000,0000,0000',
          isbn: row[5]??'NO ISBN',
          copies: row[8]??'NO COPIES',
          stock: row[8]??'NO STOCK',
          categories: 'Book',
          subjects: row[7]??'NO SUBJECT',
          publisher: row[4]??'NO PUBLISHER',
          pub_year: row[1]??'NO PUB YEAR',
          source: 'Purchased',
          from: 'ISBAT University',
          type: 'Physical',
          image: '/uploaded_files/book_images/No-image.jpg',
          location: 'ISBAT Main Campus',
          shelf: 'Open Shelf',
          location: 'Main Campus',
        }));
      }));
      model.Books.bulkCreate(books)
        .then((book) => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
            book: book
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

const findBook = async(title, ddc) => {
  const findBook = await model.Books.findOne({
    where: {
      [Op.or]: [{ title: title }, { ddc: ddc },],
    },
  });
  return findBook;
}

export default upload;
