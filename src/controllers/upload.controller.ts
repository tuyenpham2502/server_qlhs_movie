import * as fs from 'fs';
import ImageModel from '../models/image.model';
import { NextFunction } from 'express';

export const uploadImageController = async (req: any, res: any, next: NextFunction) => {
    try {
        if (!req.file) {
            const error = new Error('Please upload a file');
            return next(error);
        }

        else {
            await ImageModel.create({
                image: req.file.filename,
            })
            res.status(200).json({
                success: true,
                image: req.file,
            });
        }
    } catch (err) {
        next(err);
    }
}

export const uploadMultiImageController = async (req: any, res: any, next: NextFunction) => {
    try {
        if (!req.files) {
            const error = new Error('Please upload a file');
            return next(error);
        }
        else {
            await req.files.forEach((file: any) => {
                ImageModel.create({
                    image: file.filename,
                })
            })
            res.status(200).json({
                success: true,
                image: req.files,
            });
        }
    }
    catch (err) {
        next(err);
    }
}


export const getImageController = async (req: any, res: any, next: NextFunction) => {
    try {
        const data = await ImageModel.find();
        res.send(data);
    }
    catch (err) {
        next(err);
    }
}


export const deleteImageController = async (req: any, res: any, next: NextFunction) => {
    try {
        const id = req.params.id;
        const data = await ImageModel.findByIdAndDelete(id);
        fs.unlinkSync(`./public/FileStorage/${data.image}`);
        res.send(data);
    }
    catch (err) {
        next(err);
    }
}




