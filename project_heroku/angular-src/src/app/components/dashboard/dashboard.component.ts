import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items:any;
  items_data:any;
  id:any;

  constructor(
    private itemService:ItemsService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items_data => {
      //console.log("Type of items_data = ",typeof(items_data))
      this.items=items_data['items']
      //console.log(this.items)
    }, 
    err => {
      //console.log(err);
      return false;
    });
  }

  goToItem(){
    this.id=this.items[0]._id
    //console.log("Items = ",this.items[0]._id) //display the id
    console.log("ID = ",this.id)
    this.router.navigate([`/itemDetail/${this.id}`]);
    //this.itemService.getItem(this])
  }

}
