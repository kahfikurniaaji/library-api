import { Router } from "express";
import bookController from "../controller/book-controller.js";

const bookRouter = Router();

const endpoint = "/books";

bookRouter.post(endpoint, bookController.postNewBook);

bookRouter.get(endpoint, bookController.getBooks);

bookRouter.get(endpoint + "/:bookCode", bookController.getBookByCode);

bookRouter.put(endpoint + "/:bookCode", bookController.putBookByCode);

bookRouter.delete(endpoint + "/:bookCode", bookController.deleteBookByCode);

export default bookRouter;
