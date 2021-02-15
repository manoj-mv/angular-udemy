import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() selectedItemToParentEvent = new EventEmitter<Recipe>();
  recipes:Recipe[] =[
    new Recipe('Test Recipe','Test','https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1575&q=80'),
    new Recipe('Test Recipe','Test','https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1575&q=80'),
  ];
  constructor() { }

  ngOnInit(): void {
  }
  propagateSelectedItemToParent(selectedItem : Recipe){
    console.log(selectedItem);
    this.selectedItemToParentEvent.emit(selectedItem);
  }

}
