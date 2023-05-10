import sequelize from "../config/database.js";
import ConflictError from "../exception/conflict-error.js";
import NotFoundError from "../exception/not-found-error.js";
import Book from "../model/book.js";
import Borrowing from "../model/borrowing.js";
import Member from "../model/member.js";
import { Op } from "sequelize";
import timeToLocaleTime from "../util/date-util.js";
import ForbiddenError from "../exception/forbidden-error.js";

// Service for adding borrowing
const borrowBook = async ({ book_code, member_code }) => {
  const bookCode = book_code;
  const memberCode = member_code;
  if (!(await bookIsExist(bookCode))) {
    throw new NotFoundError("Book is not exist");
  }

  if (!(await memberIsExist(memberCode))) {
    throw new NotFoundError("Member is not exist");
  }

  if (await hasBorrowedTheBook(bookCode, memberCode)) {
    throw new ConflictError(
      "Members are only allowed to borrow one of the same book"
    );
  }

  const book = await Book.findOne({ where: { code: bookCode.trim() } }).then(
    (result) => {
      if (result.dataValues.stock === 0) {
        throw new ConflictError("Book is out of stock");
      }
      return result.dataValues;
    }
  );

  const member = await Member.findOne({
    where: { code: memberCode.trim() },
  }).then((result) => {
    if (result.dataValues.borrowed_count === 2) {
      throw new ConflictError("Maximum borrow limit reached");
    }
    return result.dataValues;
  });

  if (member.penalty_duration > 0) {
    throw new ForbiddenError(
      "Member can't borrow a book are still under penalty"
    );
  }

  const borrowing = {
    book_code: bookCode.trim(),
    member_code: memberCode.trim(),
  };

  const result = await sequelize.transaction(async (t) => {
    const borrowingResult = await Borrowing.create(borrowing, {
      transaction: t,
    }).then((result) => result.dataValues);

    const bookResult = await Book.update(
      {
        stock: --book.stock,
      },
      { where: { code: bookCode.trim() }, returning: true, transaction: t }
    ).then((result) => result[1][0].dataValues);

    const memberResult = await Member.update(
      {
        borrowed_count: ++member.borrowed_count,
      },
      { where: { code: memberCode.trim() }, returning: true, transaction: t }
    ).then((result) => result[1][0].dataValues);

    convertTimeBorrowing(borrowingResult);

    return borrowingResult;
  });

  return result;
};

// Service for return book
const returnBook = async ({ book_code, member_code }) => {
  const bookCode = book_code;
  const memberCode = member_code;
  if (!(await bookIsExist(bookCode))) {
    throw new NotFoundError("Book is not exist");
  }

  if (!(await memberIsExist(memberCode))) {
    throw new NotFoundError("Member is not exist");
  }

  if (!(await hasBorrowedTheBook(bookCode, memberCode))) {
    throw new NotFoundError("Member didn't borrow the book");
  }

  const member = await Member.findOne({
    where: { code: memberCode.trim() },
  }).then((result) => result.dataValues);

  const book = await Book.findOne({
    where: { code: bookCode.trim() },
  }).then((result) => result.dataValues);

  const borrowing = await Borrowing.findOne({
    where: { book_code: bookCode.trim(), member_code: memberCode.trim() },
  }).then((result) => result.dataValues);

  const borrowTime = Date.parse(borrowing.borrow_date);

  const result = await sequelize.transaction(async (t) => {
    const borrowingResult = await Borrowing.destroy({
      where: { book_code: bookCode, member_code: memberCode },
      returning: true,
      transaction: t,
    }).then((result) => result[0].dataValues);

    const borrowDate = new Date(borrowingResult.borrow_date);
    borrowDate.setHours(0, 0, 0, 0);

    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 7);

    const returnDate = new Date(borrowingResult.return_date);
    returnDate.setHours(0, 0, 0, 0);

    if (returnDate > dueDate) {
      member.penalty_duration = 3;
    }

    const bookResult = await Book.update(
      { stock: ++book.stock },
      { where: { code: bookCode.trim() }, returning: true, transaction: t }
    ).then((result) => result[1][0].dataValues);

    const memberResult = await Member.update(
      {
        borrowed_count: --member.borrowed_count,
        penalty_duration: member.penalty_duration,
      },
      { where: { code: memberCode.trim() }, returning: true, transaction: t }
    ).then((result) => result[1][0].dataValues);

    convertTimeBorrowing(borrowingResult);

    return borrowingResult;
  });

  return result;
};

//
const getBorrowings = async () => {
  const result = await Borrowing.findAll({
    order: [["borrow_date", "DESC"]],
  }).then((result) => {
    result = result.map((value) => value.dataValues);
    return result;
  });

  return result;
};

const getBorrowingByCode = async (code) => {
  if (!(await borrowingIsExist(code))) {
    throw new NotFoundError("Borrowing is not exist");
  }
  const result = await Borrowing.findOne({
    where: { code },
    include: [Book],
  }).then((result) => result.dataValues);
  console.log(result);

  return result;
};

// Service for update borrowing
const updateBorrowingByCode = async (code, borrowing) => {
  if (!(await borrowingIsExist(code))) {
    throw new NotFoundError("Borrowing is not exist");
  }

  if ((await borrowingIsExist(borrowing.code)) && code !== borrowing.code) {
    throw new ConflictError("Borrowing code is already in use");
  }

  const result = await sequelize.transaction(async (t) => {
    const borrowingResult = await Borrowing.update(
      {
        code: borrowing.code.trim(),
        title: borrowing.title.trim(),
        author: borrowing.author.trim(),
        stock: borrowing.stock,
      },
      { where: { code: code.trim() }, returning: true, transaction: t }
    ).then((result) => result[1][0].dataValues);

    convertTimeBorrowing(borrowingResult);

    return borrowingResult;
  });

  return result;
};

// Service for delete borrowing
const deleteBorrowingByCode = async (code) => {
  if (!(await borrowingIsExist(code))) {
    throw new NotFoundError("Borrowing is not exist");
  }

  const result = await sequelize.transaction(async (t) => {
    const borrowingResult = await Borrowing.destroy({
      where: { code },
      returning: true,
      transaction: t,
    }).then((result) => result[0].dataValues);

    return borrowingResult;
  });

  return result;
};

// Service for check existing borrowing
const borrowingIsExist = async (code) => {
  const borrowing = await Borrowing.findOne({ where: { code } });
  return borrowing !== null;
};

// Service for check existing book
const bookIsExist = async (code) => {
  const book = await Book.findOne({ where: { code } });
  return book !== null;
};

// Service for check existing member
const memberIsExist = async (code) => {
  const member = await Member.findOne({ where: { code } });
  return member !== null;
};

//
const hasBorrowedTheBook = async (bookCode, memberCode) => {
  const result = await Borrowing.findOne({
    where: {
      book_code: bookCode,
      member_code: memberCode,
      return_date: { [Op.is]: null },
    },
  });
  return result !== null;
};

// Service for convert time on object borrowing
const convertTimeBorrowing = (data) => {
  data["borrow_date"] = timeToLocaleTime(data, "borrow_date");

  if (data["return_date"]) {
    data["return_date"] = timeToLocaleTime(data, "return_date");
  }
};

export default {
  borrowBook,
  returnBook,
  getBorrowingByCode,
};
