import express from 'express';
import { createFilmHandler, getFilmHandler, updateFilmHandler } from './../controllers/film.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
router.use(deserializeUser, requireUser);


// Admin Create Film route
router.post('/createFilm', restrictTo('admin'), createFilmHandler);

//get film by id
router.get('/getFilm/:filmId', getFilmHandler);

// Admin Update Film route
router.patch('/updateFilm/:filmId', restrictTo('admin'), updateFilmHandler);


export default router;

