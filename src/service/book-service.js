import sequelize from "../config/database.js";
import ConflictError from "../exception/conflict-error.js";
import NotFoundError from "../exception/not-found-error.js";
import Book from "../model/book.js";
import timeToLocaleTime from "../util/date-util.js";

// Service for adding book
const addBook = async ({ code, title, author, stock }) => {
  if (await bookIsExist(code)) {
    throw new ConflictError("Code already exist");
  }

  const book = {
    code: code.trim(),
    title: title.trim(),
    author: author.trim(),
    stock: stock,
  };

  const result = await sequelize.transaction(async (t) => {
    const bookResult = await Book.create(book, { transaction: t });

    return bookResult.dataValues;
  });

  convertTimeBook(result);

  return result;
};

const getBooks = async () => {
  const result = await Book.findAll({ order: [["created_at", "DESC"]] }).then(
    (result) => {
      result = result.map((value) => {
        value = value.dataValues;
        convertTimeBook(value);
        return value;
      });

      return result;
    }
  );

  return result;
};

const getBookByCode = async (code) => {
  if (!(await bookIsExist(code))) {
    throw new NotFoundError("Book is not exist");
  }
  const result = await Book.findOne({ where: { code: code.trim() } }).then(
    (result) => result.dataValues
  );

  convertTimeBook(result);

  return result;
};

// Service for update book
const updateBookByCode = async (code, book) => {
  if (!(await bookIsExist(code))) {
    throw new NotFoundError("Book is not exist");
  }

  if ((await bookIsExist(book.code)) && code !== book.code) {
    throw new ConflictError("Book code is already in use");
  }

  const result = await sequelize.transaction(async (t) => {
    const bookResult = await Book.update(
      {
        code: book.code.trim(),
        title: book.title.trim(),
        author: book.author.trim(),
        stock: book.stock,
      },
      { where: { code: code.trim() }, returning: true, transaction: t }
    ).then((result) => result[1][0].dataValues);

    convertTimeBook(bookResult);

    return bookResult;
  });

  return result;
};

// Service for delete book
const deleteBookByCode = async (code) => {
  if (!(await bookIsExist(code))) {
    throw new NotFoundError("Book is not exist");
  }

  const result = await sequelize.transaction(async (t) => {
    const bookResult = await Book.destroy({
      where: { code: code.trim() },
      returning: true,
      transaction: t,
    }).then((result) => result[0].dataValues);

    return bookResult;
  });

  convertTimeBook(result);

  return result;
};

// Service for check existing book
const bookIsExist = async (code) => {
  const book = await Book.findOne({ where: { code } });
  return book !== null;
};

// Service for convert time on book
const convertTimeBook = (data) => {
  data["created_at"] = timeToLocaleTime(data, "created_at");
  data["updated_at"] = timeToLocaleTime(data, "updated_at");

  if (data["deleted_at"]) {
    data["deleted_at"] = timeToLocaleTime(data, "deleted_at");
  }
};

export default {
  addBook,
  getBooks,
  getBookByCode,
  updateBookByCode,
  deleteBookByCode,
};
