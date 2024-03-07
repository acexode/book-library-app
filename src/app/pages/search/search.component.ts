import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchResponse } from '../../model/search-response.interface';
import { RouterLink } from '@angular/router';
import { bookCover } from '../../endpoint';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent {
  searchTerm: string = '';
  searchKey: string = 'title';
  searchResults: any[] = [];
  loading: boolean = false;
  noResult = false;
  constructor(private bookService: BookService) {}

  search(): void {
    if (!this.searchTerm.trim()) {
      this.searchResults = [];
      return;
    }

    this.loading = true
    this.bookService.searchBooks(this.searchTerm, this.searchKey).subscribe(
      (results: SearchResponse) => {
        console.log(results);
        this.loading = false;
        if(results.numFound > 0){
          this.noResult = false;
          console.log('found', results.numFound);
          this.searchResults = results.docs.map(doc =>{
            return {
              id: doc.key.split('/')[2],
              title: doc.title,
              publishDate: doc.first_publish_year,
              authors:  doc?.author_name,
              author_key: doc.author_key,
              cover: doc.cover_i ? `${bookCover}${doc.cover_i}-M.jpg` : null
            };
          })

        }else{
          this.noResult = true
          this.loading = false
        }
      },
      (error) => {
        console.error('Error searching for books:', error);
      }
    );
  }
}
