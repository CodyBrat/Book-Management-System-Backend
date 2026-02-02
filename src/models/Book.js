import { v4 as uuidv4 } from 'uuid';

export class Book {
    constructor({ id = uuidv4(), title, author, genre, price, publishYear }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.price = price;
        this.publishYear = publishYear;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
