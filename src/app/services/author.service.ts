import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { authorEndpoints } from '../configs/endpoint';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  constructor(private http: HttpClient) { }

  getAuthorDetails(id: string): Observable<any> {
    const apiUrl = `${authorEndpoints.getAuthorDetails}${id}.json`;
    return this.http.get<any>(apiUrl);
  }
}

