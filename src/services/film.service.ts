import FilmModel, { Film } from "../models/film.model";
import { FilterQuery, QueryOptions } from 'mongoose';

export const createFilm = async (input: Partial<Film>) => {
        const newFilm = await FilmModel.create(input);
        return newFilm;
}

export const getFilmById = async (query: FilterQuery<Film>, options: QueryOptions={}) => {
        const film = await FilmModel.findById(query, {}, options).lean();
        return film;
}

export const updateFilm = async (filmId: string, update: Partial<Film>) => {
        const film = await FilmModel.findByIdAndUpdate(filmId, update, { new: true });
        return film;
}

export const getFilms = async (query: FilterQuery<Film>, options: QueryOptions={}) => {
        const film = await FilmModel.find(query, {}, options).lean();
        return film;
}

