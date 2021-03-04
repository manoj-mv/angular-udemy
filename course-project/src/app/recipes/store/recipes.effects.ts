import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as fromApp  from '../../store/app.reducer';


import * as recipesActions from './recipes.actions';
import { Store } from "@ngrx/store";

@Injectable()
export class RecipeEffects{
    constructor(private actions$:Actions,
                private http:HttpClient,
                private store:Store<fromApp.AppState>){}


    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(recipesActions.FETCH_RECIPES),
        switchMap(
            () =>{
                return this.http.get<Recipe[]>
                    ('https://angular-recipe-book-af92c-default-rtdb.firebaseio.com/recipes.json')
            }
        ),
        map(
            recipes=>{
                // javascript map fn for add empty array if there is no ingredient is present
              return recipes.map(
                recipe =>{
                  return {...recipe, ingredients: recipe.ingredients? recipe.ingredients:[]};
                }  
              )
            }
        ),
        map(
            (recipes)=>{
                return new recipesActions.setRecipes({recipes : recipes});
            }
        )
    );

    @Effect({dispatch:false})
    storeRecipe = this.actions$.pipe(
        ofType(recipesActions.STORE_RECIPES),
        withLatestFrom(
            this.store.select('recipes')
        ),
        switchMap(
            ([actionData, recipesState])=>{
                return this.http
                    .put('https://angular-recipe-book-af92c-default-rtdb.firebaseio.com/recipes.json', recipesState.recipes)
            }
        )
    )
}