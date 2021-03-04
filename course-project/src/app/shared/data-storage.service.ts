import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as recipesActions from '../recipes/store/recipes.actions';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private receipeServics:RecipeService,
    // private authService:AuthService
    private store:Store<fromApp.AppState>) { }

  storeRecipes(){
    const recipes = this.receipeServics.getRecipes(); 
    console.log(recipes);
    this.http.put('https://angular-recipe-book-af92c-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(
        response =>{
          console.log(response);
        }
      );
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>('https://angular-recipe-book-af92c-default-rtdb.firebaseio.com/recipes.json')
      .pipe(      
             map(
              recipes=>{
                return recipes.map(
                  recipe =>{
                    return {...recipe, ingredients: recipe.ingredients? recipe.ingredients:[]};
                  }  
                )
              }
            ),
            tap(
              recipes=>{
                // this.receipeServics.setRecipes(recipes);
                this.store.dispatch(new recipesActions.setRecipes({recipes: recipes}))
              }
            )
      );  
  }

}
