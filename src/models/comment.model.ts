import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from '@typegoose/typegoose';
import { nanoid } from 'nanoid';

@modelOptions({
    schemaOptions: {
        // Add createdAt and updatedAt fields
        timestamps: true,
    },
    
})

export class Comment  {
    @prop({unique: true, default: ()=> nanoid(15) })
    commentId!: string;

    @prop({ required: true })
    userId!: string;

    @prop({ required: true })
    filmId!: string;

    @prop({ default: null})
    parentId!: string | null;

    @prop({ default: [] })
    childIds!: string[];

    @prop({ required: true })
    content!: string;


    @prop({ required: true })
    like!: number;

    @prop({ required: true })
    dislike!: number;

    
}

const CommentModel = getModelForClass(Comment);
export default CommentModel;

