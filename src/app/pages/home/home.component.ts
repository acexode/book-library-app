import { Component, OnInit, HostListener  } from '@angular/core';
import { BookService } from '../../services/book.service';
import { BookResponse, Book } from '../../model/book-response.interface';
import {NgClass, NgFor, NgIf} from "@angular/common";
import { Router, RouterLink } from '@angular/router';
import { BookStorageService } from '../../services/book-storage.service';
import { FinanceBook } from '../../model/finance-book.interface';
import { bookCover } from '../../endpoint';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  financeBooks: FinanceBook[] = [];
  isMenuOpen: boolean = false;
  isMobileView: boolean = false;
  loading: boolean = false;
  constructor(private bookService: BookService, private router: Router, private store: BookStorageService) {
    this.checkViewport()
   }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkViewport();
  }

  ngOnInit(): void {
    this.getFinanceBooks();
  }

  getFinanceBooks() {
    this.loading = true
    this.bookService.getFinanceBooks().subscribe(
      (response: BookResponse) => {
        console.log(response);
        this.loading = false;
        this.bookService.bookSignal.set(response)
        this.financeBooks = response.works.map((book: Book): any => {
          return {
            id: book.key.split('/')[2],
            title: book.title,
            publishDate: book.first_publish_year,
            authors: book.authors.map(e => ({... e, key: e.key.split('/')[2]})),
            cover: book.cover_id ? `${bookCover}${book.cover_id}-M.jpg` : null
          };
        });
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching finance books:', error);
      }
    );
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  private checkViewport() {
    this.isMobileView = window.innerWidth <= 768;
  }

  navigateToBookDetails(book: any) {
    this.router.navigate(['/book', book.id]);
  }
  addToWishList(book: any) {
   this.store.addBook(book)
  }

}
