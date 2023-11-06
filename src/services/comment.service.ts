import { constant } from "../constant/constant";
import CommentModel, { Comment } from "../models/comment.model";
import { FilterQuery, QueryOptions } from "mongoose";

export const createComment = async (input: Partial<Comment>) => {
  const newComment = await CommentModel.create(input);
  return newComment;
};

export const createChildComment = async (
  commentId: string,
  input: Partial<Comment>
) => {
  const newChildComment = await CommentModel.create(input);

  const addChildComment = await CommentModel.findByIdAndUpdate(
    commentId,
    {
      $push: {
        childComment: newChildComment._id,
      },
    },
    { new: true }
  );

  return addChildComment;
};

export const getComment = async (
  filter: FilterQuery<Comment>,
  options: QueryOptions = { lean: true }
) => {
  const comment = await CommentModel.find(
    {
      ...filter,
      parent_id: null,
    },
    {},
    {
      ...options,
      populate: ["children_ids"],
    }
  );
};

export const getNewCommentLastWeek = async () => {
  const comment = await CommentModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: constant.lastWeekDateTime,
        },
      },
    },
  ]);
  return comment;
};
