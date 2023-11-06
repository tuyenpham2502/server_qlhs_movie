import { createChildComment, getComment, getNewCommentLastWeek } from './../services/comment.service';
import { createComment } from "../services/comment.service";
import { CreateCommentInput } from "../schema/comment.schema";
import { NextFunction, Request, Response } from "express";

interface Params {
    _id: string;
}

export const createCommentHandler = async (
    req: Request<{}, {}, CreateCommentInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const comment = await createComment({
            userId: req.body.userId,
            filmId: req.body.filmId,
            parentId: req.body.parentId,
            childIds: req.body.childIds,
            content: req.body.content,
            like: req.body.like,
            dislike: req.body.dislike,
        });
        res.status(200).json({
            success: true,
            createComment: {
                comment,
            },
        });
    } catch (err: any) {
        next(err);
    }
}   

export const createChildCommentHandler = async (
    req: Request<Params, {}, CreateCommentInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const comment = await createChildComment(req.params._id, {
            userId: req.body.userId,
            filmId: req.body.filmId,
            parentId: req.body.parentId,
            childIds: req.body.childIds,
            content: req.body.content,
            like: req.body.like,
            dislike: req.body.dislike,
        });
        res.status(200).json({
            success: true,
            createChildComment: {
                comment,
            },
        });
    } catch (err: any) {
        next(err);
    }
}

export const getNewCommentHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const comment = await getNewCommentLastWeek();
        res.status(200).json({
            success: true,
            getNewComment: {
                comment,
            },
        });
    } catch (err: any) {
        next(err);
    }
}

