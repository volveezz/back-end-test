import { FeedbackPost } from '@prisma/client';
import { IUser } from './user';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IFeedbackPost extends FeedbackPost {
	upvotes: IUser[];
}

/**
 * @openapi
 * components:
 *   schemas:
 *     FeedbackPost:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - category
 *         - status
 *         - author_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *           enum:
 *             - general
 *             - performance
 *             - bug
 *         status:
 *           type: string
 *           enum:
 *             - idea
 *             - planned
 *             - in_progress
 *             - completed
 *             - closed
 *         upvotes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user who upvoted
 *               avatar:
 *                 type: string
 *                 description: Avatar of the user who upvoted
 *         author_id:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
*/