import { Component } from '@angular/core';

@Component({
  selector: 'app-not-restaurant',
  standalone: true,
  imports: [],
  templateUrl: './not-restaurant.component.html',
  styleUrl: './not-restaurant.component.css'
})
export class NotRestaurantComponent {
  showSpinner= true;
  constructor(){}
  ngOnInit(): void{
    setTimeout(()=>{
      this.showSpinner=false;
    },1000)
  }
}
