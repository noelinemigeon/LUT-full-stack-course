import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item:any;
  name:any;

  constructor(
    private itemService:ItemsService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(id).subscribe(item => {
      this.item=item;

      this.item.username=this.item.item.username
      this.item.name=this.item.item.name
      this.item.ingredients=this.item.item.ingredients
      this.item.recipe=this.item.item.recipe
      this.item.difficulty=this.item.item.difficulty
      this.item.time=this.item.item.time
      if(this.item.item.likes==undefined){
        this.item.likes = 0
      } else {
        this.item.likes=this.item.item.likes
      }
      
    }, 
    err => {
      console.log(err);
      return false;
    });
  }

  //increments like in db
  likeRecipe(){
    console.log("Button pushed")
    const id = String(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    this.itemService.addLike(id).subscribe()
  }

  reloadCurrentPage() {
    window.location.reload();
  }


}

