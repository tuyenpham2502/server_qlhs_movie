import express from 'express';
import { createFilmHandler, getFilmHandler, getFilmsHandler, updateFilmHandler } from './../controllers/film.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
router.use(deserializeUser, requireUser);


// Admin Create Film route
router.post('/createFilm', restrictTo('admin'), createFilmHandler);

//get film by id
router.get('/getFilm/:_id', getFilmHandler);

// Admin Update Film route
router.patch('/updateFilm/:_id', restrictTo('admin'), updateFilmHandler);

// Get films
router.get('/getFilms', restrictTo('admin'), getFilmsHandler);




export default router;

