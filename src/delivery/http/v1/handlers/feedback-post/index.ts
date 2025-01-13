import { DeliveryParams } from '@/delivery/types';
import Express from 'express';
import { createRouteHandler } from '../../routeHandler';
import { IHandler } from '../types';
import { buildCreateFeedbackPost, CreateFeedbackPost } from './create';
import { buildDeleteFeedbackPost, DeleteFeedbackPost } from './delete';
import { buildEditFeedbackPost, EditFeedbackPost } from './edit';
import { postCreateRules, postDeleteRules, postEditRules, postVoteRules } from './rules';
import { buildVoteFeedbackPost, VoteFeedbackPost } from './vote';

type Params = Pick<DeliveryParams, 'feedbackPost'>;

export type FeedbackPostMethods = {
	create: CreateFeedbackPost;
	delete: DeleteFeedbackPost;
	edit: EditFeedbackPost;
	vote: VoteFeedbackPost;
};

const buildFeedbackPostRoutes = (methods: FeedbackPostMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router();

    /**
     * @openapi
     * /feedback-post:
     *   post:
     *     tags:
     *       - FeedbackPost
     *     summary: Create a feedback post
     *     produces:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/postCreate'
     *     responses:
     *       201:
     *         description: Feedback post created.
     */
    namespace.post('/', postCreateRules, createRouteHandler(methods.create));

    /**
     * @openapi
     * /feedback-post/{id}:
     *   delete:
     *     tags:
     *       - FeedbackPost
     *     summary: Delete a feedback post
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the post to delete
     *     responses:
     *       204:
     *         description: Feedback post was deleted.
     *       500:
     *         description: Feedback post wasn't found.
     */
    namespace.delete('/:id', postDeleteRules, createRouteHandler(methods.delete));

    /**
     * @openapi
     * /feedback-post/{id}:
     *   patch:
     *     tags:
     *       - FeedbackPost
     *     summary: Edit a feedback post
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         description: ID of the post to edit
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/postEdit'
     *     responses:
     *       200:
     *         description: Feedback post was edited.
     *       401:
     *         description: User is not authorized to edit the feedback post.
     */
    namespace.patch('/:id', postEditRules, createRouteHandler(methods.edit));

    /**
     * @openapi
     * /feedback-post/{id}/vote:
     *   post:
     *     tags:
     *       - FeedbackPost
     *     summary: Upvote or remove a vote on a feedback post
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: ID of the post to vote on
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/postVote'
     *     responses:
     *       200:
     *         description: Feedback post vote updated (upvoted or unvoted).
     *       400:
     *         description: Invalid input or action.
     *       404:
     *         description: Feedback post not found.
     *       500:
     *         description: Internal server error.
     */
    namespace.post('/:id/vote', postVoteRules, createRouteHandler(methods.vote));

    root.use('/feedback-post', namespace);
  };
};


export const buildFeedbackPostHandler = (params: Params): IHandler => {
  const create = buildCreateFeedbackPost(params);
  const deleteFeedbackPost = buildDeleteFeedbackPost(params);
  const edit = buildEditFeedbackPost(params);
  const vote = buildVoteFeedbackPost(params);

  return {
    registerRoutes: buildFeedbackPostRoutes({
      create,
      delete: deleteFeedbackPost,
      edit,
      vote,
    }),
  };
};
