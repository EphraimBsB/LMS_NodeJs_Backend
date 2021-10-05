import BookService from "./../../database/acid/services/book.service";
import UserService from "./../../database/acid/services/user.services";
import BookLocationService from "./../../database/acid/services/boook.location.service";
// import Loan from './loan.controller'
import UserController from "./user.controller";
import BookController from "./book.controller";
import BookLocationController from "./book.location.controller";
import { hashPass, comparePass, userToken } from "../helpers/auth.bcrypt";
import LoanService from "./../../database/acid/services/loan.service";
import LoanController from "./loan.controller";
import { Workbook } from "exceljs";

const bookService = new BookService();
const bookLocationService = new BookLocationService();
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
export const bookLocationController = new BookLocationController(
  bookLocationService
);
export const loanController = new LoanController(loanService, workbook);
