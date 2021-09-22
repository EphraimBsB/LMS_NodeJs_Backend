import express from 'express';
import imagecontroller from '../controllers/image.controller';
import imageUpload from '../helpers/image.upload';
import { checkAuth } from '../middleware/check.auth';
const router = express.Router();
router.post('/upload',checkAuth,imageUpload.single('image'),imagecontroller);

export default router;