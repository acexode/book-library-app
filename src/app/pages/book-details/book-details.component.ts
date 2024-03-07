import {
  Component,
  Injector,
  OnInit,
  effect,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { BookResponse } from '../../model/book-response.interface';
import { BookStorageService } from '../../services/book-storage.service';
import { bookCover } from '../../endpoint';


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent implements OnInit {
  bookId: string = '';
  bookDetails: any; // Modify the type according to your data structure
  private readonly injector = inject(Injector);
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private store: BookStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
    });
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const storedBooks = this.bookService.bookSignal();
        const work = storedBooks?.works.filter(
          (work) => work.key === `/works/${this.bookId}`
        )[0];
        console.log(work);
        this.bookDetails = {
          title: work?.title,
          edition_count: work?.edition_count,
          published: work?.first_publish_year,
          subjects: work?.subject.join(', '),
          author: work?.authors.map((e: any) => e.name).join(', '),
          cover: work?.cover_id
            ? `${bookCover}${work?.cover_id}-M.jpg`
            : null,
        };
      });
    });
  }
  addToWishList(book: any) {
    this.store.addBook(book)
   }
}
