import ConflictError from "../../src/exception/conflict-error.js";
import NotFoundError from "../../src/exception/not-found-error.js";
import Book from "../../src/model/book.js";
import bookService from "../../src/service/book-service.js";

// Create object book1
const book1 = {
  code: "JK-45",
  title: "Harry Potter",
  author: "J.K Rowling",
  stock: 1,
};

// Create object book2
const book2 = {
  code: "SHR-1",
  title: "A Study in Scarlet",
  author: "Arthur Conan Doyle",
  stock: 1,
};

// Action before each
beforeEach(async () => {
  await Book.truncate({ force: true, cascade: true });
});

// Test add book service
test("test add book service", async () => {
  const result = await bookService.addBook(book1);

  Object.keys(book1).forEach(async (key) => {
    await expect(result).toHaveProperty(key, book1[key]);
  });

  await expect(async () => await bookService.addBook(book1)).rejects.toThrow(
    ConflictError
  );
});

// Test get books service
test("test get books service", async () => {
  await bookService.addBook(book1);
  await bookService.addBook(book2);

  let result = await bookService.getBooks();

  expect(result.length).toBe(2);

  await bookService.deleteBookByCode(book1.code);

  result = await bookService.getBooks();

  expect(result.length).toBe(1);
});

// Test get book by code service
test("test get book by code service", async () => {
  await expect(
    async () => await bookService.getBookByCode(book1.code)
  ).rejects.toThrow(NotFoundError);

  await bookService.addBook(book1);
  await bookService.addBook(book2);
  await bookService.deleteBookByCode(book2.code);

  const result = await bookService.getBookByCode(book1.code);

  Object.keys(book1).forEach((key) => {
    expect(result).toHaveProperty(key, book1[key]);
  });

  await expect(
    async () => await bookService.getBookByCode(book2.code)
  ).rejects.toThrow(NotFoundError);
});

// Test update book by code service
test("test update book by code service", async () => {
  await expect(
    async () => await bookService.updateBookByCode(book1.code, book2)
  ).rejects.toThrow(NotFoundError);

  await bookService.addBook(book1);

  const book3 = {
    ...book2,
    code: book1.code,
  };

  let result = await bookService.updateBookByCode(book1.code, book3);

  Object.keys(book3).forEach((key) => {
    expect(result).toHaveProperty(key, book3[key]);
  });

  result = await bookService.updateBookByCode(book3.code, book2);

  Object.keys(book2).forEach((key) => {
    expect(result).toHaveProperty(key, book2[key]);
  });
});

// Test delete book by code service
test("test delete book by code service", async () => {
  await expect(
    async () => await bookService.deleteBookByCode(book1.code)
  ).rejects.toThrow(NotFoundError);

  await bookService.addBook(book1);

  const result = await bookService.deleteBookByCode(book1.code);

  Object.keys(book1).forEach((key) => {
    expect(result).toHaveProperty(key, book1[key]);
  });
});

// Action after each
afterEach(async () => {
  await Book.truncate({ force: true, cascade: true });
});
