import ConflictError from "../../src/exception/conflict-error.js";
import Book from "../../src/model/book.js";
import borrowingService from "../../src/service/borrow-service.js";
import memberService from "../../src/service/member-service.js";
import bookService from "../../src/service/book-service.js";
import Member from "../../src/model/member.js";
import Borrowing from "../../src/model/borrowing.js";

// Create object book1
const book1 = {
  code: "JK-45",
  title: "Harry Potter",
  author: "J.K Rowling",
  stock: 2,
};

// Create object book2
const book2 = {
  code: "SHR-1",
  title: "A Study in Scarlet",
  author: "Arthur Conan Doyle",
  stock: 1,
};

// Create object book3
const book3 = {
  code: "TW-11",
  title: "Twilight",
  author: "Stephenie Meyer",
  stock: 1,
};

// Create object member1
const member1 = {
  code: "M001",
  name: "Angga",
};

// Create object member2
const member2 = {
  code: "M002",
  name: "Ferry",
};

// Create object member2
const member3 = {
  code: "M003",
  name: "Putri",
};

// Action before each
beforeEach(async () => {
  await Borrowing.truncate({
    force: true,
    restartIdentity: true,
    cascade: true,
  });
  await Book.truncate({ force: true, cascade: true });
  await Member.truncate({ force: true, cascade: true });
});

// Test borrow book service
test("test borrow book service", async () => {
  await bookService.addBook(book1);
  await memberService.addMember(member1);
  const borrowing1 = { book_code: book1.code, member_code: member1.code };
  const result = await borrowingService.borrowBook(borrowing1);
  Object.keys(borrowing1).forEach(async (key) => {
    await expect(result).toHaveProperty(key, borrowing1[key]);
  });

  await bookService.addBook(book2);
  await bookService.addBook(book3);
  const borrowing2 = { book_code: book2.code, member_code: member1.code };
  await borrowingService.borrowBook(borrowing2);
  const borrowing3 = { book_code: book3.code, member_code: member1.code };
  await expect(
    async () => await borrowingService.borrowBook(borrowing3)
  ).rejects.toThrow(ConflictError);

  await memberService.addMember(member2);
  const borrowing4 = { book_code: book2.code, member_code: member2.code };
  await expect(
    async () => await borrowingService.borrowBook(borrowing4)
  ).rejects.toThrow(ConflictError);
});

// Test return book service
test("test return book service", async () => {
  const borrowing1 = { book_code: book1.code, member_code: member1.code };

  await bookService.addBook(book1);
  await memberService.addMember(member1);
  await borrowingService.borrowBook(borrowing1);
  const result = await borrowingService.returnBook(borrowing1);
  Object.keys(borrowing1).forEach(async (key) => {
    await expect(result).toHaveProperty(key, borrowing1[key]);
  });
});

// Action before each
afterEach(async () => {
  await Borrowing.truncate({
    force: true,
    restartIdentity: true,
    cascade: true,
  });
  await Book.truncate({ force: true, cascade: true });
  await Member.truncate({ force: true, cascade: true });
});
