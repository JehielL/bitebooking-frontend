import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbAccordionModule, NgbAlert, NgbAlertModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Menu } from '../Interfaces/menu.model';
import { Dish } from '../Interfaces/dish.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Rating } from '../Interfaces/rating.model';


@Component({
  selector: 'app-menu-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink, DatePipe, NgbAccordionModule, NgbAlert, NgbRatingModule, ReactiveFormsModule],
  templateUrl: './menu-detail.component.html',
  styleUrl: './menu-detail.component.css'
})
export class MenuDetailComponent {

  menu: Menu | undefined;


  ratings: Rating[] = [];
  ratingForm = new FormGroup({

    score: new FormControl(0),
    comment: new FormControl(''),
  });



  showDeleteMenuMessage: boolean = false;
dishes: any;

  constructor(

    private activedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {


  }

  ngOnInit(): void {

    this.activedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;
      const url = 'http://localhost:8080/menus/' + id;
      this.httpClient.get<Menu>(url).subscribe(m => this.menu = m);

      this.httpClient.get<Rating[]>('http://localhost:8080/menus/filter-by-menu/' + id)
        .subscribe(ratings => this.ratings = ratings);
    });



  }

  delete(menus: Menu) {
    const url = 'http://localhost:8080/menus/' + menus.id;
    this.httpClient.delete(url).subscribe(response => {
      this.menu = undefined;
      this.showDeleteMenuMessage = true;
    });
  }



  hideDeletedMenuMessage() {
    this.showDeleteMenuMessage = false;
  }





  save() {

    const rating: Rating = {
      id: 0,
      score: this.ratingForm.get('score')?.value ?? 0,
      comment: this.ratingForm.get('comment')?.value ?? '',
      menu: this.menu,

    };

    this.httpClient.post<Rating>('http://localhost:8080/ratings', rating).subscribe(rating => {
      this.ratingForm.reset();
    });

    this.httpClient.get<Rating[]>('http://localhost:8080/menus/filter-by-menu/' + this.menu?.id)
    .subscribe(ratings => this.ratings = ratings);
  }


}
