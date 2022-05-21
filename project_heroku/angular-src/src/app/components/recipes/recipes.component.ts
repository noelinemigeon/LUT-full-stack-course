import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes:any;

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getRecipes().subscribe(recipes_data => {
      //console.log("Type of items_data = ",typeof(items_data))
      this.recipes=recipes_data['recipes']
      //console.log(recipes_data)
    }, 
    err => {
      console.log(err);
      return false;
    });
  }

}
