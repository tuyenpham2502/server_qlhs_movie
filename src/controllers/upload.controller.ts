import ImageModel from '../models/image.model';
import { NextFunction } from 'express';

export const uploadImageController = async (req: any, res: any, next: NextFunction) => {
    try {
        if (!req.file) {
            const error = new Error('Please upload a file');
            return next(error);
        }

        else {
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





