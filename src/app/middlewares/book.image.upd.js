import multer, { diskStorage } from "multer";
import path from "path";

var storage = diskStorage({
  destination: (req, file, cb) => {
    var ext = path.extname(file.originalname);
    if (ext == ".png" || ext == ".jpg") {
      cb(null, "./uploaded_files/book_images");
    } else {
      cb(null, "./uploaded_files/e-books");
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname 
    );
  },
});

const filterImg = (req, file, cb) => {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".png" &&
    ext !== ".jpg" &&
    ext !== ".gif" &&
    ext !== ".jpeg" &&
    ext !== ".pdf"
  ) {
    return cb("Unsupported Image format", false);
  } else {
    cb(null, true);
  }
};

var uploadImage = multer({
  storage: storage,
  fileFilter: filterImg,
});
export default uploadImage;
