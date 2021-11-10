import express from "express";
import { bookController, bookLocationController } from "../controllers";
import bookValidation from "./../middlewares/book.validation";
import bookLocationValidation from "./../middlewares/book.location.validation";
import { checkAuth, checkRole } from "../middlewares/check.auth";

const router = express.Router();
router.post(
  "/",
  bookValidation,
  checkAuth,
  checkRole(["librarian", "admin"]),
  bookController.newBook
);
router.get("/books/:id", bookController.findBook);
router.get("/books", bookController.findAll);
router.get("/search", bookController.search);
router.patch(
  "/:id",
  bookValidation,
  checkAuth,
  checkRole(["librarian", "admin"]),
  bookController.editbook
);
router.delete(
  "/:id",
  checkAuth,
  checkRole(["librarian", "admin"]),
  bookController.deleteBook
);
router.post(
  "/location",
  bookLocationValidation,
  bookLocationController.createLocation
);
router.get("/export", bookController.exportExcel);
export default router;
