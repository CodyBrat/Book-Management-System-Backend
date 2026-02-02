import { BookRepository } from '../repositories/BookRepository.js';

export class BookService {
    constructor() {
        this.bookRepository = new BookRepository();
    }

    async getAllBooks(query) {
        const { search, genre, sort, page, limit } = query;
        const filter = {};
        if (genre) filter.genre = genre;

        return await this.bookRepository.findAll({
            search,
            filter,
            sort,
            page,
            limit
        });
    }

    async getBookById(id) {
        const book = await this.bookRepository.findById(id);
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    }

    async createBook(data) {
        this.validateBookData(data);
        return await this.bookRepository.create(data);
    }

    async updateBook(id, data) {
        await this.getBookById(id);

        return await this.bookRepository.update(id, data);
    }

    async deleteBook(id) {
        const deleted = await this.bookRepository.delete(id);
        if (!deleted) {
            throw new Error('Book not found');
        }
        return { message: 'Book deleted successfully' };
    }

    validateBookData(data) {
        if (!data.title || !data.author || !data.price) {
            throw new Error('Missing required fields: title, author, price');
        }
        if (typeof data.price !== 'number' || data.price < 0) {
            throw new Error('Price must be a positive number');
        }
    }
}
