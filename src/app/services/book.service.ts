import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { BookResponse } from '../model/book-response.interface';
import { bookEndpoints } from '../endpoint';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  bookSignal = signal<BookResponse | null>(null);
  limit = '&limit=9'
  constructor(private http: HttpClient) {
    this.getFinanceBooks().subscribe((res: BookResponse) => {
      console.log(res);
      this.bookSignal.set(res);
    });
  }

  getFinanceBooks(): Observable<any> {
    return this.http.get<any>(bookEndpoints.getFinanceBooks);
  }

  searchBooksByTitle(title: string): Observable<any> {
    const apiUrl = `${bookEndpoints.searchBooks}title=${title}&limit=9`;
    return this.http.get<any>(apiUrl);
  }
  searchBooks(searchTerm: string, searchKey: string) {
    let response;
    switch (searchKey) {
      case 'author':
        response = this.searchBooksByAuthor(searchTerm);
        break;
      case 'subject':
        response = this.searchBooksBySubject(searchTerm);
        break;
      case 'title':
        response = this.searchBooksByTitle(searchTerm);
        break;

      default:
        response = of('invalid search key')
        break;
    }
    return response;
  }
  searchBooksByAuthor(author: string): Observable<any> {
    const apiUrl = `${bookEndpoints.searchBooks}author=${author}&limit=9`;
    return this.http.get<any>(apiUrl);
  }

  searchBooksBySubject(subject: string): Observable<any> {
    const apiUrl = `${bookEndpoints.searchBooks}subject=${subject}.json?limit=9`;
    return this.http.get<any>(apiUrl);
  }

  getBookDetails(id: string): Observable<any> {
    const apiUrl = `${bookEndpoints.getBookDetails}${id}.json`;
    return this.http.get<any>(apiUrl);
  }
}

