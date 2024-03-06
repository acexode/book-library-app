import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { BookResponse } from '../model/book-response.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://openlibrary.org/subjects/finance.json?limit=9';
  bookSubject: BehaviorSubject<BookResponse | null> =
    new BehaviorSubject<BookResponse | null>(null);
  bookSignal = signal<BookResponse | null>(null);

  constructor(private http: HttpClient) {
    this.getFinanceBooks().subscribe((res: BookResponse) => {
      this.bookSubject.next(res || null);
      console.log(res);
      this.bookSignal.set(res);
    });
  }

  getFinanceBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  searchBooksByTitle(title: string): Observable<any> {
    const apiUrl = `https://openlibrary.org/search.json?title=${title}&limit=9`;
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
    const apiUrl = `https://openlibrary.org/search.json?author=${author}&limit=9`;
    return this.http.get<any>(apiUrl);
  }

  searchBooksBySubject(subject: string): Observable<any> {
    const apiUrl = `https://openlibrary.org/subjects/${subject}.json?limit=9`;
    return this.http.get<any>(apiUrl);
  }

  getBookDetails(id: string): Observable<any> {
    const apiUrl = `https://openlibrary.org/works/${id}.json`;
    return this.http.get<any>(apiUrl);
  }
}

