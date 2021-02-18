import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  //event for update ingredient original array and copy of it we can access via getIngredients() method
  ingredientsChangedEvent = new EventEmitter<Ingredient[]>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes', 10)
  ];
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(newIngredient:Ingredient){
    this.ingredients.push(newIngredient);
    // event that emit on each ingredent added
    this.ingredientsChangedEvent.emit(this.ingredients.slice()); 
    console.log(this.ingredients);
  }

  // method to add ingredients from recipe-detail component
  addIngredients(ingredientsToAdd: Ingredient[]){
    // for(let ingredient of ingredientsToAdd){}
    this.ingredients.push(...ingredientsToAdd);
    // console.log(this.ingredients);
    this.ingredientsChangedEvent.emit(this.ingredients.slice());
  }
}
