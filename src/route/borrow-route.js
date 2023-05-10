import { Router } from "express";
import borrowController from "../controller/borrow-controller.js";

const borrowRouter = Router();

const endpoint = "/borrows";

borrowRouter.post(endpoint, borrowController.borrowBook);

borrowRouter.get(endpoint, borrowController.getBorrowedBooks);

borrowRouter.get(
  endpoint + "/:borrowCode",
  borrowController.getDetailBorrowedBook
);

// borrowRouter.put(endpoint + "/:borrowCode", borrowController.putBorrowByCode);

borrowRouter.delete(endpoint, borrowController.returnBook);

export default borrowRouter;
