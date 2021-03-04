import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import * as shoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes:Recipe[] =[
  //   new Recipe(
  //     'Test Recipe',
  //     'Test','https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1575&q=80',
  //     [ new Ingredient('abc',2),
  //       new Ingredient('xyz',3)
  //     ]
  //   ),
  //   new Recipe(
  //     'Test Recipe 2',
  //     'Test','https://cutt.ly/hk6s5hY',
  //     [
  //       new Ingredient('mno',4),
  //       new Ingredient('xyz',1)
  //     ]
  //   ),
  // ];
  private recipes:Recipe[]=[];
  constructor(private store:Store<fromApp.AppState>) { }
  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index:number){
    return this.recipes[index];
  }

  addRecipe(newRecipe: Recipe){
    this.recipes.push(newRecipe);
    console.log(this.recipes);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number, updatedRecipe:Recipe){
    this.recipes[index]=updatedRecipe;
    console.log(this.recipes);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    // this.shoppingListService.addIngredients(ingredients);
    // console.log('ok');
    this.store.dispatch(new shoppingListActions.AddIngredients(ingredients));
    // this.store .select('shoppingList').subscribe(
    //   (data) => {
    //     console.log(data);
    //   }
    // );

  }

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
