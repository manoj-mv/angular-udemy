import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes:Recipe[] =[
    new Recipe(
      'Test Recipe',
      'Test','https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1575&q=80',
      [ new Ingredient('abc',2),
        new Ingredient('xyz',3)
      ]
    ),
    new Recipe(
      'Test Recipe 2',
      'Test','https://cutt.ly/hk6s5hY',
      [
        new Ingredient('mno',4),
        new Ingredient('xyz',1)
      ]
    ),
  ];
  constructor(private shoppingListService: ShoppingListService) { }
  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index:number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
