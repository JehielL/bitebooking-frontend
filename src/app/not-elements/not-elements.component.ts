import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-not-elements',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-elements.component.html',
  styleUrl: './not-elements.component.css'
})
export class NotElementsComponent {
  showSpinner= true;
constructor(){}
ngOnInit(): void{

  window.scrollTo(0, 0); 
  setTimeout(()=>{
    this.showSpinner=false;
  },1000)
}
  


}
