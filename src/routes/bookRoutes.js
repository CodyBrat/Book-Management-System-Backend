import express from 'express';
import { BookController } from '../controllers/BookController.js';

const router = express.Router();
const bookController = new BookController();

router.get('/', bookController.index);
router.get('/:id', bookController.show);
router.post('/', bookController.store);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.destroy);

export default router;
