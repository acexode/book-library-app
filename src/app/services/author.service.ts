import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  constructor(private http: HttpClient) { }

  getAuthorDetails(id: string): Observable<any> {
    const apiUrl = `https://openlibrary.org/authors/${id}.json`;
    return this.http.get<any>(apiUrl);
  }
}

