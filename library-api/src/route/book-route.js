import { Router } from "express";
import bookController from "../controller/book-controller.js";

const bookRouter = Router();

/**
 * @swagger
 * components:
 *   parameters:
 *     BookCode:
 *       name: 'bookCode'
 *       in: path
 *       required: true
 *       description: 'Book code for get detail, update, or delete'
 *       schema:
 *         type: string
 *         minLength: 1
 *       examples:
 *         'Harry Potter':
 *           description: 'Sample book code for Harry Potter'
 *           value: 'JK-45'
 *         'A Study in Scarlet':
 *           description: 'Sample book code for A Study in Scarlet'
 *           value: 'SHR-1'
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           description: 'Code of the book'
 *           example: 'JK-45'
 *         title:
 *           type: string
 *           description: 'Title of the book'
 *           example: 'Harry Potter'
 *         author:
 *           type: string
 *           description: 'Author of the book'
 *           example: 'J.K Rowling'
 *         stock:
 *           type: int
 *           description: 'Stock of the book'
 *           example: 1
 *         created_at:
 *           type: string
 *           description: 'Date of added the book'
 *           example: '11/5/2023, 04.50.20'
 *         updated_at:
 *           type: string
 *           description: 'Date of updated the book'
 *           example: '11/5/2023, 04.50.20'
 *         deleted_at:
 *           type: string
 *           description: 'Date of updated the book'
 *           example: null
 *     AddOrUpdateBook:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           description: 'Code of the book'
 *           example: 'JK-45'
 *         title:
 *           type: string
 *           description: 'Title of the book'
 *           example: 'Harry Potter'
 *         author:
 *           type: string
 *           description: 'Author of the book'
 *           example: 'J.K Rowling'
 *         stock:
 *           type: int
 *           description: 'Stock of the book'
 *           example: 1
 *     ArrayBooks:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Book'
 *
 */
const endpoint = "/books";

/**
 * @swagger
 * /books:
 *  post:
 *    tags: [Book]
 *    summary: Add new data book
 *    description: Add new data book
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AddOrUpdateBook'
 *    responses:
 *      '200':
 *         description: Success add new data book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             examples:
 *               'Harry Potter':
 *                 description: 'Success add new data book'
 *                 value:
 *                   code: 'JK-45'
 *                   title: 'Harry Potter'
 *                   author: 'J.K Rowling'
 *                   stock: 1
 *               'A Study in Scarlet':
 *                 description: 'Success add new data book'
 *                 value:
 *                   code: 'SHR-1'
 *                   title: 'A Study in Scarlet'
 *                   author: 'Arthur Conan Doyle'
 *                   stock: 1
 */
bookRouter.post(endpoint, bookController.postNewBook);

/**
 * @swagger
 * /books:
 *  get:
 *    tags: [Book]
 *    summary: Get all data books
 *    description: Get all data books
 *    responses:
 *      '200':
 *         description: Success get all data books
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArrayBooks'
 *             examples:
 *               success:
 *                 description: 'Success get all data books'
 *                 value:
 *                   - code: 'JK-45'
 *                     title: 'Harry Potter'
 *                     author: 'J.K Rowling'
 *                     stock: 1
 *                     created_at: '11/5/2023, 04.50.20'
 *                     updated_at: '11/5/2023, 04.51.20'
 *                     deleted_at: null
 *                   - code: 'SHR-1'
 *                     title: 'A Study in Scarlet'
 *                     author: 'Arthur Conan Doyle'
 *                     stock: 1
 *                     created_at: '11/5/2023, 04.52.20'
 *                     updated_at: '11/5/2023, 04.52.20'
 *                     deleted_at: null
 *
 */
bookRouter.get(endpoint, bookController.getBooks);

/**
 * @swagger
 * /books/{bookCode}:
 *  get:
 *    tags: [Book]
 *    summary: Get detail book
 *    description: Get detail book
 *    parameters:
 *      - $ref: '#/components/parameters/BookCode'
 *    responses:
 *      '200':
 *         description: Success Get detail book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             examples:
 *               'Harry Potter':
 *                 description: 'Success get detail Harry Potter book'
 *                 value:
 *                   code: 'JK-45'
 *                   title: 'Harry Potter'
 *                   author: 'J.K Rowling'
 *                   stock: 1
 *                   created_at: '11/5/2023, 04.50.20'
 *                   updated_at: '11/5/2023, 04.51.20'
 *                   deleted_at: null
 *               'A Study in Scarle':
 *                 description: 'Success get detail A Study in Scarle book'
 *                 value:
 *                   code: 'SHR-1'
 *                   title: 'A Study in Scarle'
 *                   author: 'Arthur Conan Doyle'
 *                   stock: 1
 *                   created_at: '11/5/2023, 04.52.20'
 *                   updated_at: '11/5/2023, 04.52.20'
 *                   deleted_at: null
 *
 */
bookRouter.get(endpoint + "/:bookCode", bookController.getBookByCode);

/**
 * @swagger
 * /books/{bookCode}:
 *  put:
 *    tags: [Book]
 *    summary: Update detail book
 *    description: Update detail book
 *    parameters:
 *      - $ref: '#/components/parameters/BookCode'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AddOrUpdateBook'
 *          examples:
 *            'Harry Potter':
 *              description: 'Success update detail Harry Potter book'
 *              value:
 *                stock: 10
 *            'A Study in Scarlet':
 *              description: 'Success update detail A Study in Scarlet book'
 *              value:
 *                stock: 5
 *    responses:
 *      '200':
 *         description: Success update detail book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             examples:
 *               'Harry Potter':
 *                 description: 'Success update detail Harry Potter book'
 *                 value:
 *                   code: 'JK-45'
 *                   title: 'Harry Potter'
 *                   author: 'J.K Rowling'
 *                   stock: 10
 *                   created_at: '11/5/2023, 04.50.20'
 *                   updated_at: '11/5/2023, 10.51.20'
 *                   deleted_at: null
 *               'A Study in Scarlet':
 *                 description: 'Success update detail A Study in Scarlet book'
 *                 value:
 *                   code: 'SHR-1'
 *                   title: 'A Study in Scarlet'
 *                   author: 'Arthur Conan Doyle'
 *                   stock: 5
 *                   created_at: '11/5/2023, 04.52.20'
 *                   updated_at: '11/5/2023, 10.52.20'
 *                   deleted_at: null
 *
 */
bookRouter.put(endpoint + "/:bookCode", bookController.putBookByCode);

/**
 * @swagger
 * /books/{bookCode}:
 *  delete:
 *    tags: [Book]
 *    summary: Delete book
 *    description: Delete book
 *    parameters:
 *      - $ref: '#/components/parameters/BookCode'
 *    responses:
 *      '200':
 *         description: Success delete book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             examples:
 *               'Harry Potter':
 *                 description: 'Success delete Harry Potter book'
 *                 value:
 *                   code: 'JK-45'
 *                   title: 'Harry Potter'
 *                   author: 'J.K Rowling'
 *                   stock: 1
 *                   created_at: '11/5/2023, 04.50.20'
 *                   updated_at: '11/5/2023, 10.51.20'
 *                   deleted_at: '11/5/2023, 12.51.20'
 *               'A Study in Scarlet':
 *                 description: 'Success delete A Study in Scarlet book'
 *                 value:
 *                   code: 'SHR-1'
 *                   title: 'A Study in Scarlet'
 *                   author: 'Arthur Conan Doyle'
 *                   stock: 1
 *                   created_at: '11/5/2023, 04.52.20'
 *                   updated_at: '11/5/2023, 10.52.20'
 *                   deleted_at: '11/5/2023, 12.52.20'
 *
 */
bookRouter.delete(endpoint + "/:bookCode", bookController.deleteBookByCode);

export default bookRouter;
