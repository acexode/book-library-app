import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { AuthorDetailsComponent } from './pages/author-details/author-details.component';
import { SearchComponent } from './pages/search/search.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'book/:id', component: BookDetailsComponent },
    { path: 'author/:id', component: AuthorDetailsComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: 'search', component: SearchComponent },
  ];
