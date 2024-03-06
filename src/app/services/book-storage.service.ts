import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookStorageService {
  private localStorageKey = 'wishlist';

  constructor() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  getBooks(): any[] {
    const storedBooks = localStorage.getItem(this.localStorageKey);
    return storedBooks ? JSON.parse(storedBooks) : [];
  }

  addBook(book: any): void {
    const storedBooks = this.getBooks();
    const exist = storedBooks.filter((item) => item.id === book.id);
    if (exist.length === 0) {
      storedBooks.push(book);
      localStorage.setItem(this.localStorageKey, JSON.stringify(storedBooks));
      alert('Book added to wishlist');
    } else {
      alert('Book already in wishlist');
    }
  }

  removeBook(bookId: string): void {
    const storedBooks = this.getBooks();
    const rest = storedBooks.filter((book) => book.id !== bookId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(rest));
  }
}
