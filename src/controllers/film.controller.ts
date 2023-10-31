import {getFilmLatestItems, updateFilm } from './../services/film.service';
import { CreateFilmInput } from "../schema/film.schema";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { createFilm, getFilmById, getFilmTopItems } from "../services/film.service";
import { object } from 'zod';


export const createFilmHandler = async (
    req: Request<{}, {}, CreateFilmInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const film = await createFilm({
            title: req.body.title,
            description: req.body.description,
            filmBanner: req.body.filmBanner,
            filmImage: req.body.filmImage,
            releaseDate: req.body.releaseDate,
            time: req.body.time,
            age: req.body.age,
            quality: req.body.quality,
            genre: req.body.genre,
            filmType: req.body.filmType,
            country: req.body.country,
            director: req.body.director,
            cast: req.body.cast,
            trailer: req.body.trailer,
            rate: req.body.rate,
        });
        res.status(200).json({
            success: true,
            createFilm : {
                film
            },
        });
    } catch (err: any) {
        next(err);
    }
}


export const getFilmHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const film = await getFilmById({ _id: req.params._id });
        res.status(200).json({
            success: true,
            film,
        });
    } catch (err: any) {
        next(err);
    }
}

export const updateFilmHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const film = await updateFilm(req.params._id, req.body);
        res.status(200).json({
            success: true,
            updateFilm: {
                film
            },
        });
    } catch (err: any) {
        next(err);
    }
}

export const getTopFilmHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const film = await getFilmTopItems();
        res.status(200).json({
            success: true,
            film,
        });
    } catch (err: any) {
        next(err);
    }
}

export const getLatestFilmHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const film = await getFilmLatestItems();
        res.status(200).json({
            success: true,
            film,
        });
    } catch (err: any) {
        next(err);
    }
}


