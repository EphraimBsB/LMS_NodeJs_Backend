import express from "express";
import { loanController } from "../controllers";
import { checkAuth, checkRole } from "../middlewares/check.auth";
const router = express.Router();
router.post(
  "/",
  checkAuth,
  checkRole(["librarian", "admin", "student"]),
  loanController.checkUser,
  loanController.newLoan
);
router.patch(
  "/loans",
  checkAuth,
  checkRole(["librarian", "admin", "student"]),
  loanController.findall
);
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
