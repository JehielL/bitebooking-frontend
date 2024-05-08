import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-restaurant',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-restaurant.component.html',
  styleUrl: './not-restaurant.component.css'
})
export class NotRestaurantComponent {
  showSpinner= true;
  constructor(){}
  ngOnInit(): void{

    window.scrollTo(0, 0); 
    setTimeout(()=>{
      this.showSpinner=false;
    },1000)
  }
}
