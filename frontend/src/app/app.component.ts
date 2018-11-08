import { Component, OnInit } from '@angular/core';
import * as M from '../assets/materialize/js/materialize.min.js';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'Riku Nomina';
  options = {

  };
  
  // Se inicializa materialize
  ngOnInit() {
    let elems = document.querySelectorAll('.carousel');
    let instances = M.Carousel.init(elems, this.options);
    elems = document.querySelectorAll('.sidenav');
    instances = M.Sidenav.init(elems, this.options);
    elems = document.querySelectorAll('.tabs');
    instances = M.Tabs.init(elems, this.options);   
  }

}
