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
        return await isbn.resolve(row[7]).then((book) => ( {
          title: row[3],
          author: row[2],
          description:book.description??'NO DESCRIPTION AVAILABLE',
          editions: 'No Edition',
          ddc: row[5],
          acc_num: '0000,0000,0000',
          isbn: row[7],
          copies: row[8],
          stock: row[8],
          categories: 'Book',
          subjects: row[6],
          publisher: book.publisher??'No Publisher',
          pub_year: book.publishedDate??row[1],
          source: 'Purchased',
          from: 'ISBAT University',
          type: 'Physical',
          image: book.imageLinks.thumbnail??'http://localhost:5000/uploaded_files/book_images/No-image.jpg',
          location: 'ISBAT Main Campus',
          shelf: '0',
          side: 'None',
          column: 0,
          row: 0,
        })).catch(err => ({
            title: row[3],
            author: row[2],
            description:'NO DESCRIPTION AVAILABLE',
            editions: 'No Edition',
            ddc: row[5],
            acc_num: '0000,0000,0000',
            isbn: row[7],
            copies: row[8],
            stock: row[8],
            categories: 'Book',
            subjects: row[6],
            publisher: 'No Publisher',
            pub_year: row[1],
            source: 'Purchased',
            from: 'ISBAT University',
            type: 'Physical',
            image: 'http://localhost:5000/uploaded_files/book_images/No-image.jpg',
            location: 'ISBAT Main Campus',
            shelf: '0',
            side: 'None',
            column: 0,
            row: 0,
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
