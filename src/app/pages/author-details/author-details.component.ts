import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorResponse } from '../../model/author-response.interface';
import { AuthorService } from '../../services/author.service';
import { bookCover } from '../../endpoint';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.scss'
})
export class AuthorDetailsComponent  implements OnInit{
  authorId: string = '';
  authorDetails!: AuthorResponse;
  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.authorId = params['id'];
      this.getAuthor()
    });
  }

  getAuthor(){
    this.authorService.getAuthorDetails(this.authorId).subscribe((res: AuthorResponse) => {
      console.log(res);
      this.authorDetails = {
        ...res,
        photo: res.photos ?  `${bookCover}${res.photos}-M.jpg` : ''
      }
    })
  }
}
