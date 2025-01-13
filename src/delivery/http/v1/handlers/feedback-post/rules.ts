import { check, param, query } from 'express-validator';
import { authRequired, validateSchema } from '../../middlewares';
import { validateIdParam } from '../../middlewares/idRequired';

/**
 * @openapi
 * components:
 *   rules:
 *     getPosts:
 *       properties:
 *         category:
 *           type: string
 *           enum: [general, performance, bug]
 *           description: Filter by category
 *         status:
 *           type: string
 *           enum: [idea, planned, in_progress, completed, closed]
 *           description: Filter by status
 *         sortBy:
 *           type: string
 *           enum: [votes, date]
 *           description: Sort by votes or date
 *         sortOrder:
 *           type: string
 *           enum: [asc, desc]
 *           description: Sort order (ascending or descending)
 */
export const getFeedbackPostsRules = [
  query('category')
    .optional()
    .isString().toLowerCase()
    .isIn(['general', 'performance', 'bug'])
    .withMessage('Invalid category. Must be "general", "performance", or "bug"'),
  query('status')
    .optional()
    .isString().toLowerCase()
    .isIn(['idea', 'planned', 'in_progress', 'completed', 'closed'])
    .withMessage(
      'Invalid status. Must be "idea", "planned", "in_progress", "completed", or "closed"',
    ),
  query('sortBy')
    .optional()
    .isString().toLowerCase()
    .isIn(['votes', 'date'])
    .withMessage('Invalid sortBy. Must be "votes" or "date"'),
  query('sortOrder')
    .optional()
    .isString().toLowerCase()
    .isIn(['asc', 'desc'])
    .withMessage('Invalid sortOrder. Must be "asc" or "desc"'),
  validateSchema,
];

/**
 * @openapi
 * components:
 *   rules:
 *     postCreate:
 *       required:
 *         - title
 *         - category
 *         - status
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *           enum: [general, performance, bug]
 *         status:
 *           type: string
 *           enum: [idea, planned, in_progress, completed, closed]
 */
export const postCreateRules = [
  check('title').exists().withMessage('Title is required').isString(),
  check('category')
    .exists().withMessage('Category is required')
    .isString().toLowerCase()
    .isIn(['general', 'performance', 'bug'])
    .withMessage('Invalid category. Must be "general", "performance", or "bug"'),
  check('status')
    .exists().withMessage('Status is required')
    .isString().toLowerCase()
    .isIn(['idea', 'planned', 'in_progress', 'completed', 'closed'])
    .withMessage('Invalid status. Must be "idea", "planned", "in_progress", "completed", or "closed"'),
  check('description').optional().isString(),
  authRequired({}),
  validateSchema,
];

/**
 * @openapi
 * components:
 *   rules:
 *     postDelete:
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *             format: uuid
 *           required: true
 *           description: ID of the feedback post to delete.
 */
export const postDeleteRules = [
  param('id').exists().withMessage('Feedback post ID is required').isUUID().withMessage('Invalid feedback post ID format'),
  authRequired({}),
  validateIdParam(),
  validateSchema,
];

/**
 * @openapi
 * components:
 *   rules:
 *     postEdit:
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *             format: uuid
 *           required: true
 *           description: ID of the feedback post to edit.
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *           enum: [general, performance, bug]
 *         status:
 *           type: string
 *           enum: [idea, planned, in_progress, completed, closed]
 */
export const postEditRules = [
  param('id').exists().withMessage('Feedback post ID is required').isUUID().withMessage('Invalid feedback post ID format'),
  check('title').optional().isString(),
  check('category')
    .optional()
    .isString().toLowerCase()
    .isIn(['general', 'performance', 'bug'])
    .withMessage('Invalid category. Must be "general", "performance", or "bug"'),
  check('status')
    .optional()
    .isString().toLowerCase()
    .isIn(['idea', 'planned', 'in_progress', 'completed', 'closed'])
    .withMessage('Invalid status. Must be "idea", "planned", "in_progress", "completed", or "closed"'),
  check('description').optional().isString(),
  authRequired({}),
  validateIdParam(),
  validateSchema,
];

/**
 * @openapi
 * components:
 *   rules:
 *     postVote:
 *       required:
 *         - action
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *             format: uuid
 *           required: true
 *           description: ID of the feedback post to vote on.
 *       properties:
 *         action:
 *           type: string
 *           enum: [upvote, unvote]
 */
export const postVoteRules = [
  param('id').exists().withMessage('Feedback post ID is required').isUUID().withMessage('Invalid feedback post ID format'),
  check('action')
    .exists().withMessage('Action is required')
    .isString()
    .isIn(['upvote', 'unvote'])
    .withMessage('Invalid action. Must be "upvote" or "unvote"'),
  authRequired({}),
  validateIdParam(),
  validateSchema,
];

