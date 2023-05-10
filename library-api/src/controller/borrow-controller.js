import borrowService from "../service/borrow-service.js";

// Controller for borrow book
const borrowBook = async (req, res, next) => {
  const result = await borrowService
    .borrowBook(req.body)
    .catch(async (err) => await next(err));
  res.status(201).json(result);
};

// Controller for return book
const returnBook = async (req, res, next) => {
  const result = await borrowService
    .returnBook(req.body)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

// Controller for get all borrowed book
const getBorrowedBooks = async (req, res, next) => {
  const result = await borrowService
    .getBorrowedBooks(req.query)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

// Controller for get detail borrowed book
const getDetailBorrowedBook = async (req, res, next) => {
  const result = await borrowService
    .getDetailBorrowedBook(req.params.borrowCode)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

export default {
  borrowBook,
  returnBook,
  getBorrowedBooks,
  getDetailBorrowedBook,
};
