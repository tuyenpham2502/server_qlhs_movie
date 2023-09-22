import * as fs from 'fs';
import ImageModel from '../models/image.model';
import { NextFunction } from 'express';

const uploadImageController = async (req: any, res: any, next: NextFunction) => {
    try {
        if (!req.file) {
            const error = new Error('Please upload a file');
            return next(error);
        }

        else {
            ImageModel.create({
                image: req.file.filename,
            }).then((data: any) => {
                res.send(data);
            }
            ).catch((err: any) => {
                res.send(err);
            })
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
            req.files.forEach((file: any) => {
                ImageModel.create({
                    image: file.filename,
                })
            })
            res.status(200).json({
                success: true,
                message: 'Images uploaded successfully',
            })
        }
    }
    catch (err) {
        next(err);
    }
}


const getImageController = async (req: any, res: any, next: NextFunction) => {
    try {
        const data = await ImageModel.find();
        res.send(data);
    }
    catch (err) {
        next(err);
    }


}

export { uploadImageController, getImageController };

