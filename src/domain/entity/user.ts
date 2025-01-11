import { User } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUser extends User {}

/**
 * @openapi
 * components:
 *   entities:
 *      User:
 *          required:
 *            - id
 *            - created_at
 *          properties: 
 *            id:
 *                type: string
 *            email:
 *                type: string
 *            name:
 *                type: string
 *            avatar:
 *                type: string
 *            created_at:
 *                type: string
 *                format: date
 */
