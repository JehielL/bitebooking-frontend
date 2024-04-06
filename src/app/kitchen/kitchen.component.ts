import { Component } from '@angular/core';

@Component({
  selector: 'app-kitchen',
  standalone: true,
  imports: [],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent {
  cocinasPorLetra = [
    {
      letra: 'A',
      cocinas: [
        { nombre: 'Alemana' },
        { nombre: 'Americana' },
        { nombre: 'Argentina' },
        { nombre: 'Australiana' }
      ]
    },
    {
      letra: 'B',
      cocinas: [
        { nombre: 'Belga' },
        { nombre: 'Brasileña' },
        { nombre: 'Británica' }
      ]
    },
    
  ];
  
}
