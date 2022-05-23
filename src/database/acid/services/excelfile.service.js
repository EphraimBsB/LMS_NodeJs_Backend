import model from "./../../models";
const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    let path = ".uploaded_files/excel.data/" + req.file.filename;
    readXlsxFile(path).then((rows) => {
      rows.shift();
      let Books = [];
      rows.forEach((row) => {
        let book = {
          title: row[0],
          author: row[1],
          description: row[2],
          ddc: row[3],
          acc_number: row[4],
          copies: row[5],
          stock: row[6],
          subjects: row[7],
          pub_year: row[8],
        };
        Books.push(book);
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
