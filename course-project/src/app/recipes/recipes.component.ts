import { Component, OnDestroy, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedItem :Recipe;
 
  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(){
    
  }
}
