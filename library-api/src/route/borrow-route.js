import { Router } from "express";
import borrowController from "../controller/borrow-controller.js";

const borrowRouter = Router();

/**
 * @swagger
 * components:
 *   parameters:
 *     BorrowCode:
 *       name: 'borrowCode'
 *       in: path
 *       required: true
 *       description: 'Borrow code for get detail, update, or delete'
 *       schema:
 *         type: int
 *       examples:
 *         'Angga borrow Harry Potter book':
 *           description: 'Sample borrow code'
 *           value: 1
 *         'Ferry borrow A Study in Scarlet book':
 *           description: 'Sample borrow code'
 *           value: 2
 *   schemas:
 *     Borrow:
 *       type: object
 *       properties:
 *         code:
 *           type: int
 *           description: 'Borrow code'
 *           example: 1
 *         borrow_date:
 *           type: string
 *           description: 'Borrow date'
 *           example: '11/5/2023, 10.00.00'
 *         return_date:
 *           type: string
 *           description: 'Return date'
 *           example: null
 *         book:
 *           type: object
 *           description: 'Borowed book'
 *           properties:
 *             code:
 *               type: string
 *               description: 'Borowed book code'
 *               example: 'JK-45'
 *             title:
 *               type: string
 *               description: 'Borowed book title'
 *               example: 'Harry Potter'
 *             author:
 *               type: string
 *               description: 'Borowed book author'
 *               example: 'J.K Rowling'
 *         member:
 *           type: object
 *           description: 'Borowers book'
 *           properties:
 *             code:
 *               type: string
 *               description: 'Borowers book member code'
 *               example: 'M001'
 *             name:
 *               type: string
 *               description: 'Borowers book member name'
 *               example: 'Angga'
 *             borrowed_count:
 *               type: int
 *               description: 'Borowers total borrowed books'
 *               example: 1
 *             penalty_duration:
 *               type: int
 *               description: 'Borowers total duration of penalties'
 *               example: 0
 *     BorrowBook:
 *       type: object
 *       properties:
 *         book_code:
 *           type: string
 *           description: 'Code of the borrow'
 *           example: 'JK-45'
 *         member_code:
 *           type: string
 *           description: 'Name of the borrow'
 *           example: 'M001'
 *     ArrayBorrows:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Borrow'
 *
 */
const endpoint = "/borrows";

/**
 * @swagger
 * /borrows:
 *  post:
 *    tags: [Borrow]
 *    summary: 'Borrow book'
 *    description: 'Borrow book'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BorrowBook'
 *    responses:
 *      '200':
 *         description: 'Success borrow book'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrow'
 *             examples:
 *               'Angga borrow Harry Potter book':
 *                 description: 'Success add new data member'
 *                 value:
 *                   code: 1
 *                   borrow_date: '11/5/2023, 12.00.00'
 *                   return_date: null
 *                   book:
 *                     code: 'JK-45'
 *                     title: 'Harry Potter'
 *                     author: 'J.K Rowling'
 *                   member:
 *                     code: 'M001'
 *                     name: 'Angga'
 *                     borrowed_count: 1
 *                     penalty_duration: 0
 */
borrowRouter.post(endpoint, borrowController.borrowBook);

/**
 * @swagger
 * /borrows:
 *  get:
 *    tags: [Borrow]
 *    summary: Get all borrowed book
 *    description: Get all borrowed book
 *    responses:
 *      '200':
 *         description: Success get all borrowed book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArrayBorrows'
 *             examples:
 *               success:
 *                 description: 'Success get all borrowed book'
 *                 value:
 *                   - code: 1
 *                     borrow_date: '11/5/2023, 12.00.00'
 *                     return_date: null
 *                     book:
 *                       code: 'JK-45'
 *                       title: 'Harry Potter'
 *                       author: 'J.K Rowling'
 *                     member:
 *                       code: 'M001'
 *                       name: 'Angga'
 *                       borrowed_count: 1
 *                       penalty_duration: 0
 *                   - code: 2
 *                     borrow_date: '11/5/2023, 13.00.00'
 *                     return_date: null
 *                     book:
 *                       code: 'SHR-1'
 *                       title: 'A Study in Scarlet'
 *                       author: 'Arthur Conan Doyle'
 *                     member:
 *                       code: 'M002'
 *                       name: 'Ferry'
 *                       borrowed_count: 1
 *                       penalty_duration: 0
 *
 */
borrowRouter.get(endpoint, borrowController.getBorrowedBooks);

/**
 * @swagger
 * /borrows/{borrowCode}:
 *  get:
 *    tags: [Borrow]
 *    summary: Get detail borrowed book
 *    description: Get detail borrowed book
 *    parameters:
 *      - $ref: '#/components/parameters/BorrowCode'
 *    responses:
 *      '200':
 *         description: Success Get detail borrowed book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrow'
 *             examples:
 *               'Angga borrowed Harry Potter book':
 *                 description: 'Success get detail borrowed book'
 *                 value:
 *                   code: 1
 *                   borrow_date: '11/5/2023, 12.00.00'
 *                   return_date: null
 *                   book:
 *                     code: 'JK-45'
 *                     title: 'Harry Potter'
 *                     author: 'J.K Rowling'
 *                   member:
 *                     code: 'M002'
 *                     name: 'Ferry'
 *                     borrowed_count: 1
 *                     penalty_duration: 0
 *               'Ferry borrowed A Study in Scarlet book':
 *                 description: 'Success get detail borrowed book'
 *                 value:
 *                   code: 2
 *                   borrow_date: '11/5/2023, 13.00.00'
 *                   return_date: null
 *                   book:
 *                     code: 'SHR-1'
 *                     title: 'A Study in Scarlet'
 *                     author: 'Arthur Conan Doyle'
 *                   member:
 *                     code: 'M002'
 *                     name: 'Ferry'
 *                     borrowed_count: 1
 *                     penalty_duration: 0
 *
 */
borrowRouter.get(
  endpoint + "/:borrowCode",
  borrowController.getDetailBorrowedBook
);

/**
 * @swagger
 * /borrows:
 *  delete:
 *    tags: [Borrow]
 *    summary: Return book
 *    description: Return book
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BorrowBook'
 *    responses:
 *      '200':
 *         description: Success return book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrow'
 *             examples:
 *               'Angga return Harry Potter book':
 *                 description: 'Success return Harry Potter book'
 *                 value:
 *                   code: 1
 *                   borrow_date: '11/5/2023, 12.00.00'
 *                   return_date: '13/5/2023, 12.00.00'
 *                   book:
 *                     code: 'JK-45'
 *                     title: 'Harry Potter'
 *                     author: 'J.K Rowling'
 *                   member:
 *                     code: 'M002'
 *                     name: 'Ferry'
 *                     borrowed_count: 0
 *                     penalty_duration: 0
 *               'Ferry return A Study in Scarlet book':
 *                 description: 'Success return A Study in Scarlet book'
 *                 value:
 *                   code: 1
 *                   borrow_date: '11/5/2023, 13.00.00'
 *                   return_date: '13/5/2023, 13.00.00'
 *                   book:
 *                     code: 'SHR-1'
 *                     title: 'A Study in Scarlet'
 *                     author: 'Arthur Conan Doyle'
 *                   member:
 *                     code: 'M002'
 *                     name: 'Ferry'
 *                     borrowed_count: 0
 *                     penalty_duration: 0
 *
 */
borrowRouter.delete(endpoint, borrowController.returnBook);

export default borrowRouter;
