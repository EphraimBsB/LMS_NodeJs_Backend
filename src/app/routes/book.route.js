import express from "express";
import { bookController } from "../controllers/";
import bookValidation from "./../middlewares/book.validation";
import { checkAuth, checkRole } from "../middlewares/check.auth";
import upload from "../../database/acid/services/excelfile.service";
import uploadFile from "../middlewares/excel.upload.mid";
import uploadImage from "../middlewares/book.image.upd";
import oclcFunc from "../helpers/oclc.api";

const router = express.Router();
router.post(
  "/",
  checkAuth,
  checkRole(["librarian", "admin"]),
  uploadImage.fields([
    { name: "image", maxCount: 1 },
    { name: "ebook", maxCount: 1 },
  ]),
  bookValidation,
  bookController.newBook
);
router.post(
  "/book_image",
  uploadImage.single("image"),
  bookController.imageUpload
);
router.get("/books/:id", bookController.findBook);
router.get("/books", bookController.findAll);
router.get("/search", bookController.search);
router.get("/oclc/:oclc", oclcFunc);
router.get("/filter", bookController.filter);
router.get("/analysis", bookController.booksAnalitics);
router.patch(
  "/book_edit/:id",
  checkAuth,
  checkRole(["librarian", "admin"]),
  uploadImage.fields([
    { name: "image", maxCount: 1 },
    { name: "ebook", maxCount: 1 },
  ]),
  bookController.editbook
);
router.delete(
  "/:id",
  checkAuth,
  checkRole(["librarian", "admin"]),
  bookController.deleteBook
);
router.get("/export", bookController.exportExcel);
router.post("/upload_excel_file", uploadFile.single("file"), upload);
export default router;
