import bookService from "../service/book-service.js";

// Controller for add new book
const postNewBook = async (req, res, next) => {
  const result = await bookService
    .addBook(req.body)
    .catch(async (err) => await next(err));
  res.status(201).json(result);
};

// Controller for get all books
const getBooks = async (req, res, next) => {
  const result = await bookService
    .getBooks()
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

// Controller for get book by code
const getBookByCode = async (req, res, next) => {
  const result = await bookService
    .getBookByCode(req.params.bookCode)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

// Controller for get book by code
const putBookByCode = async (req, res, next) => {
  const result = await bookService
    .updateBookByCode(req.params.bookCode, req.body)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

// Controller for delete book by code
const deleteBookByCode = async (req, res, next) => {
  const result = await bookService
    .deleteBookByCode(req.params.bookCode)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

export default {
  postNewBook,
  getBooks,
  getBookByCode,
  putBookByCode,
  deleteBookByCode,
};
