import { Component, OnDestroy, OnInit } from '@angular/core';
import {Appservice} from '../_services/app.service'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dtOptions: DataTables.Settings = {};    
  constructor(private appService: Appservice) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',      
      pageLength: 10,
    };
    this.cargarEmpleados();
  }

  cargarEmpleados(){
    this.appService.getEmpleados()
      .subscribe(
        data => {
          console.log(data.response)
        },
        error => {
          console.log(error);
        }
      )
  }
}
