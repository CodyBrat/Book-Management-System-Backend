import { Book } from '../models/Book.js';

export class BookRepository {
    constructor() {
        this.books = [];
        this.create({ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', price: 10.99, publishYear: 1925 });
        this.create({ title: '1984', author: 'George Orwell', genre: 'Dystopian', price: 12.99, publishYear: 1949 });
        this.create({ title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', price: 11.99, publishYear: 1960 });
    }

    async create(data) {
        const book = new Book(data);
        this.books.push(book);
        return book;
    }

    async findAll({ search, filter, sort, page = 1, limit = 10 }) {
        let result = [...this.books];
        if (search) {
            const query = search.toLowerCase();
            result = result.filter(book =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query)
            );
        }

        if (filter) {
            for (const [key, value] of Object.entries(filter)) {
                if (value) {
                    result = result.filter(book => book[key] == value);
                }
            }
        }

        if (sort) {
            const [field, order] = sort.split(':');
            const sortOrder = order === 'desc' ? -1 : 1;

            result.sort((a, b) => {
                if (a[field] < b[field]) return -1 * sortOrder;
                if (a[field] > b[field]) return 1 * sortOrder;
                return 0;
            });
        }

        const total = result.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const data = result.slice(startIndex, endIndex);

        return {
            data,
            meta: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    async findById(id) {
        return this.books.find(book => book.id === id);
    }

    async update(id, data) {
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) return null;

        this.books[index] = { ...this.books[index], ...data, updatedAt: new Date() };
        return this.books[index];
    }

    async delete(id) {
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) return false;

        this.books.splice(index, 1);
        return true;
    }
}
