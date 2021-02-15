import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { emit } from 'process';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipe_item') recipe: Recipe;
  @Output() onItemSelectedEvent = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  onSelectedItem(){
    this.onItemSelectedEvent.emit();
  }
}
