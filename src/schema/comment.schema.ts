import {array, date, number, object, string, TypeOf } from 'zod';

export const createCommentSchema = object({
    body: object({
        userId: string({ required_error: 'User Id is required' }),
        filmId : string({ required_error: 'Film Id is required' }),
        parentId : string(),
        childIds : array(string()),
        content : string({ required_error: 'Content is required' }),
        like : number({ required_error: 'Like is required' }),
        dislike : number({ required_error: 'Dislike is required' }),
    }),
});

export type CreateCommentInput = TypeOf<typeof createCommentSchema>['body'];
