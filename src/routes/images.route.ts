import express from 'express';
import store from '../middleware/multer';
import {uploadImageController, uploadMultiImageController} from '../controllers/upload.controller';
import { deserializeUser } from '../middleware/deserializeUser';

const router = express.Router();

router.use(deserializeUser);

// Upload image route
router.post('/uploadImage', store.single("file"), uploadImageController);

// Get multi image route
router.post('/uploadMultiImage', store.array("files", 10), uploadMultiImageController);


export default router;
