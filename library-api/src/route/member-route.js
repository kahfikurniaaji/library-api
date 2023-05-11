import { Router } from "express";
import memberController from "../controller/member-controller.js";

const memberRouter = Router();

/**
 * @swagger
 * components:
 *   parameters:
 *     MemberCode:
 *       name: 'memberCode'
 *       in: path
 *       required: true
 *       description: 'Member code for get detail, update, or delete'
 *       schema:
 *         type: string
 *         minLength: 1
 *       examples:
 *         'Angga':
 *           description: 'Sample member code for Angga'
 *           value: 'M001'
 *         'Ferry':
 *           description: 'Sample member code for Ferry'
 *           value: 'M002'
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           description: 'Code of the member'
 *           example: 'M001'
 *         name:
 *           type: string
 *           description: 'Name of the member'
 *           example: 'Angga'
 *         borrowed_count:
 *           type: int
 *           description: 'Total borrowed books of the member'
 *           example: 1
 *         penalty_duration:
 *           type: int
 *           description: 'Duration penalty of the member in days'
 *           example: 0
 *         registered_at:
 *           type: string
 *           description: 'Date of register the member'
 *           example: '11/5/2023, 10.00.00'
 *         updated_at:
 *           type: string
 *           description: 'Date of updated the member'
 *           example: '11/5/2023, 10.00.00'
 *         unregistered_at:
 *           type: string
 *           description: 'Date of unregister the member'
 *           example: null
 *     AddOrUpdateMember:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           description: 'Code of the member'
 *           example: 'M001'
 *         name:
 *           type: string
 *           description: 'Name of the member'
 *           example: 'Angga'
 *     ArrayMembers:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Member'
 *
 */
const endpoint = "/members";

/**
 * @swagger
 * /members:
 *  post:
 *    tags: [Member]
 *    summary: Add new member
 *    description: Add new member
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AddOrUpdateMember'
 *    responses:
 *      '200':
 *         description: Success add new member
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *             examples:
 *               'Angga':
 *                 description: 'Success add new data member'
 *                 value:
 *                   code: 'M001'
 *                   name: 'Angga'
 *               'Ferry':
 *                 description: 'Success add new data member'
 *                 value:
 *                   code: 'M002'
 *                   name: 'Ferry'
 */
memberRouter.post(endpoint, memberController.postNewMember);

/**
 * @swagger
 * /members:
 *  get:
 *    tags: [Member]
 *    summary: Get all data members
 *    description: Get all data members
 *    responses:
 *      '200':
 *         description: Success get all data members
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArrayMembers'
 *             examples:
 *               success:
 *                 description: 'Success get all data members'
 *                 value:
 *                   - code: 'M001'
 *                     name: 'Angga'
 *                     borrowed_count: 1
 *                     penalty_duration: 0
 *                     registered_at: '11/5/2023, 10.00.00'
 *                     updated_at: '11/5/2023, 10.00.00'
 *                     unregistered_at: null
 *                   - code: 'M002'
 *                     name: 'Ferry'
 *                     borrowed_count: 0
 *                     penalty_duration: 0
 *                     registered_at: '11/5/2023, 11.00.00'
 *                     updated_at: '11/5/2023, 11.00.00'
 *                     unregistered_at: null
 *
 */
memberRouter.get(endpoint, memberController.getMembers);

/**
 * @swagger
 * /members/{memberCode}:
 *  get:
 *    tags: [Member]
 *    summary: Get detail member
 *    description: Get detail member
 *    parameters:
 *      - $ref: '#/components/parameters/MemberCode'
 *    responses:
 *      '200':
 *         description: Success Get detail member
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *             examples:
 *               'Angga':
 *                 description: 'Success get detail Angga'
 *                 value:
 *                   code: 'M001'
 *                   name: 'Angga'
 *                   borrowed_count: 1
 *                   penalty_duration: 0
 *                   registered_at: '11/5/2023, 10.00.00'
 *                   updated_at: '11/5/2023, 10.00.00'
 *                   unregistered_at: null
 *               'Ferry':
 *                 description: 'Success get detail Ferry'
 *                 value:
 *                   code: 'M002'
 *                   name: 'Ferry'
 *                   borrowed_count: 0
 *                   penalty_duration: 0
 *                   registered_at: '11/5/2023, 11.00.00'
 *                   updated_at: '11/5/2023, 11.00.00'
 *                   unregistered_at: null
 *
 */
memberRouter.get(endpoint + "/:memberCode", memberController.getMemberByCode);

/**
 * @swagger
 * /members/{memberCode}:
 *  put:
 *    tags: [Member]
 *    summary: Update detail member
 *    description: Update detail member
 *    parameters:
 *      - $ref: '#/components/parameters/MemberCode'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AddOrUpdateMember'
 *          examples:
 *            'Angga':
 *              description: 'Success update detail Angga'
 *              value:
 *                name: 'Angga Tampan'
 *            'Ferry':
 *              description: 'Success update detail Ferry'
 *              value:
 *                name: 'Ferry Ganteng'
 *    responses:
 *      '200':
 *         description: Success update detail member
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *             examples:
 *               'Angga':
 *                 description: 'Success update detail Angga'
 *                 value:
 *                   code: 'M001'
 *                   name: 'Angga Tampan'
 *                   borrowed_count: 1
 *                   penalty_duration: 0
 *                   registered_at: '11/5/2023, 10.00.00'
 *                   updated_at: '11/5/2023, 11.30.00'
 *                   unregistered_at: null
 *               'Ferry':
 *                 description: 'Success update detail Ferry'
 *                 value:
 *                   code: 'M002'
 *                   name: 'Ferry Ganteng'
 *                   borrowed_count: 0
 *                   penalty_duration: 0
 *                   registered_at: '11/5/2023, 10.00.00'
 *                   updated_at: '11/5/2023, 12.00.00'
 *                   unregistered_at: null
 *
 */
memberRouter.put(endpoint + "/:memberCode", memberController.putMemberByCode);

/**
 * @swagger
 * /members/{memberCode}:
 *  delete:
 *    tags: [Member]
 *    summary: Delete member
 *    description: Delete member
 *    parameters:
 *      - $ref: '#/components/parameters/MemberCode'
 *    responses:
 *      '200':
 *         description: Success delete member
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *             examples:
 *               'Angga':
 *                 description: 'Success delete Angga'
 *                 value:
 *                   code: 'M001'
 *                   name: 'Angga Tampan'
 *                   borrowed_count: 1
 *                   penalty_duration: 0
 *                   registered_at: '11/5/2023, 10.00.00'
 *                   updated_at: '11/5/2023, 11.30.00'
 *                   unregistered_at: '11/5/2023, 12.30.00'
 *               'Ferry':
 *                 description: 'Success delete Ferry'
 *                 value:
 *                   code: 'M002'
 *                   name: 'Ferry Ganteng'
 *                   borrowed_count: 0
 *                   penalty_duration: 0
 *                   registered_at: '11/5/2023, 10.00.00'
 *                   updated_at: '11/5/2023, 12.00.00'
 *                   unregistered_at: '11/5/2023, 13.00.00'
 *
 */
memberRouter.delete(
  endpoint + "/:memberCode",
  memberController.deleteMemberByCode
);

export default memberRouter;
