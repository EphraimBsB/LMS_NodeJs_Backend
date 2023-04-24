import express from "express";
import { loanController } from "../controllers";
import { checkAuth, checkRole } from "../middlewares/check.auth";
const router = express.Router();
router.post(
  "/",
  // checkAuth,
  // checkRole(["librarian", "admin", "student"]),
  loanController.checkUser,
  loanController.newLoan
);
router.post(
  "/issue_loan",
  // checkAuth,
  // checkRole(["librarian", "admin", "student"]),
  // loanController.checkUser,
  loanController.issueLoan
);
router.patch(
  "/loans",
  checkAuth,
  checkRole(["librarian", "admin", "student"]),
  loanController.findall
);

router.get("/filter_loans", loanController.filter);
router.patch(
  "/loans/:id",
  checkAuth,
  checkRole(["librarian", "admin"]),
  loanController.findOne
);
router.get(
  "/userloans/:id",
  checkAuth,
  checkRole(["librarian", "admin", "student"]),
  loanController.findUserLoans
);

router.get("/export", loanController.exportExcel);

export default router;
