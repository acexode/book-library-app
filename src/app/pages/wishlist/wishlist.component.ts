import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookStorageService } from '../../services/book-storage.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  financeBooks: any[] = [];
  isMenuOpen: boolean = false;
  isMobileView: boolean = false;
  constructor(private store: BookStorageService) {}

  ngOnInit(): void {
   this.financeBooks = this.store.getBooks()
  }


  removeFromWishList(book: any) {
   this.store.removeBook(book.id)
   this.financeBooks = this.store.getBooks()
  }
}
