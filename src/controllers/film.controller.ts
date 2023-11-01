import {updateFilm, createFilm, getFilmById, getFilm } from './../services/film.service';
import { CreateFilmInput } from "../schema/film.schema";
import { CookieOptions, NextFunction, Request, Response } from "express";
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
            rating: req.body.rating,
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

export const getFilmsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const films = await getFilm(req.query, req.body.options);
        res.status(200).json({
            success: true,
            films,
        });
    } catch (err: any) {
        next(err);
    }
}


