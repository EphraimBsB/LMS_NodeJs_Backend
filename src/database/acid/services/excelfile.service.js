import model from "./../../models";
const readXlsxFile = require("read-excel-file/node");
import { Op } from "sequelize";
const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    let path = "uploaded_files/excel.data/" + req.file.filename;
    readXlsxFile(path).then((rows) => {
      rows.shift();
      let Books = [];
      rows.forEach((row) => {
            let bookItem = {
            title: row[3],
            author: row[2],
            description: 'NO DESCRIPTION AVAILABLE',
            editions: 'None',
            ddc: row[5].trim(),
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
            shelf: '0',
            side: 'None',
            column: 0,
            row: 0,
        };
        Books.push(bookItem);
        });
      model.Books.bulkCreate(Books)
        .then((book) => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
            books: book
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
