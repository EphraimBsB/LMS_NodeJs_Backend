import multer, { diskStorage } from "multer";
import path from "path";
const excelFilter = (req, file, cb) => {
  var ext = path.extname(file.originalname);
  if (ext=== '.xlsx') {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};
var storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploaded_files/excel.data/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var uploadFile = multer({ storage: storage, fileFilter: excelFilter });

export default uploadFile;
