import express from "express";
import cors from "cors";
import bookRoute from "./routes/book.route";
import userRouter from "./routes/user.route";
import loanRoute from "./routes/loan.route";
// import imageRoute from "./routes/image";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/book", bookRoute);
app.use("/user", userRouter);
app.use("/loan", loanRoute);
// app.use("/image", imageRoute);

export default app;
