import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from '@typegoose/typegoose';
import { Date } from 'mongoose';
import { nanoid } from 'nanoid';


@modelOptions({
    schemaOptions: {
        // Add createdAt and updatedAt fields
        timestamps: true,
    },
    
})

export class Film {
    @prop({unique: true, default: ()=> nanoid(15) })
    filmId!: string;

    @prop({ required: true })
    title!: string;

    @prop({ required: false, maxlength: 1000 })
    description!: string;

    @prop({ required: true })
    filmBanner!: Array<string>;

    @prop({ required: true })
    filmImage!: string;

    @prop({ required: true })
    releaseDate!: string;

    @prop({ required: true })
    time!: string;

    @prop({ required: true })
    age!: number;

    @prop({ required: true })
    quality!: string;

    @prop({ required: true })
    genre!: Array<string>;

    @prop({ enum: ['tvSeries', 'movie'], required: true })
    filmType!: string;

    @prop({ required: true })
    country!: string;

    @prop({ required: true })
    director!: Array<string>;

    @prop({ required: true })
    cast!: Array<string>;

    @prop({ required: true })
    trailer!: string;

    @prop({ default: true })
    isShowing!: boolean;
    
    @prop({ default: false })
    isDeleted!: boolean;
    


}   

const FilmModel = getModelForClass(Film);
export default FilmModel;

    