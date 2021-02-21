import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  //event for update ingredient original array and copy of it we can access via getIngredients() method
  ingredientsChangedEvent = new Subject<Ingredient[]>();

  editIngredientSubject = new Subject<number>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes', 10)
  ];
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredient(newIngredient:Ingredient){
    this.ingredients.push(newIngredient);
    // event that emit on each ingredent added
    this.ingredientsChangedEvent.next(this.ingredients.slice()); 
    console.log(this.ingredients);
  }

  updateIngredient(index:number,itemRecieved:Ingredient){
    this.ingredients[index]= itemRecieved;
    this.ingredientsChangedEvent.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChangedEvent.next(this.ingredients.slice());
  }

  // method to add ingredients from recipe-detail component
  addIngredients(ingredientsToAdd: Ingredient[]){
    // for(let ingredient of ingredientsToAdd){}
    this.ingredients.push(...ingredientsToAdd);
    // console.log(this.ingredients);
    this.ingredientsChangedEvent.next(this.ingredients.slice());
  }
}
