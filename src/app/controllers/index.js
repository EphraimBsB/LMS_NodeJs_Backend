import BookService from "./../../database/acid/services/book.service";
import UserService from "./../../database/acid/services/user.services";
import UserController from "./user.controller";
import BookController from "./book.controller";
import { hashPass, comparePass, userToken } from "../helpers/auth.bcrypt";
import LoanService from "./../../database/acid/services/loan.service";
import LoanController from "./loan.controller";
import { Workbook } from "exceljs";


const bookService = new BookService();
const userService = new UserService();
const loanService = new LoanService();
let workbook = new Workbook();
workbook.removeWorksheet();
export const userController = new UserController(
  userService,
  hashPass,
  comparePass,
  userToken
);
export const bookController = new BookController(bookService, workbook);
export const loanController = new LoanController(loanService, workbook);
