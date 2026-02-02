import { BookService } from '../services/BookService.js';

export class BookController {
    constructor() {
        this.bookService = new BookService();
    }

    index = async (req, res, next) => {
        try {
            const result = await this.bookService.getAllBooks(req.query);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const book = await this.bookService.getBookById(id);
            res.json(book);
        } catch (error) {
            if (error.message === 'Book not found') {
                return res.status(404).json({ error: error.message });
            }
            next(error);
        }
    }

    store = async (req, res, next) => {
        try {
            const book = await this.bookService.createBook(req.body);
            res.status(201).json(book);
        } catch (error) {
            if (error.message.includes('Missing') || error.message.includes('Price')) {
                return res.status(400).json({ error: error.message });
            }
            next(error);
        }
    }

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const book = await this.bookService.updateBook(id, req.body);
            res.json(book);
        } catch (error) {
            if (error.message === 'Book not found') {
                return res.status(404).json({ error: error.message });
            }
            next(error);
        }
    }

    destroy = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.bookService.deleteBook(id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Book not found') {
                return res.status(404).json({ error: error.message });
            }
            next(error);
        }
    }
}
