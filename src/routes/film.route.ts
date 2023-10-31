import express from 'express';
import { createFilmHandler, getFilmHandler, getLatestFilmHandler, getTopFilmHandler, updateFilmHandler } from './../controllers/film.controller';
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

// Admin Get Top Film route
router.get('/getTopFilm', restrictTo('admin'), getTopFilmHandler);

router.get('/getLatestFilm', restrictTo('admin'), getLatestFilmHandler);



export default router;

