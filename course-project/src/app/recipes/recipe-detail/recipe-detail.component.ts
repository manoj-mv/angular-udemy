import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

import * as fromApp from '../../store/app.reducer'; 
import * as recipesActions from '../store/recipes.actions';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;
  constructor(private recipeService:RecipeService,
              private currentRoute:ActivatedRoute,
              private router:Router,
              private store:Store<fromApp.AppState>
  ) {}
  ngOnInit(): void {
    // first way
    // this.currentRoute.paramMap
    //   .subscribe(
    //     (paramMap:ParamMap)=>{
    //       this.id = +paramMap.get('id');
    //       // this.recipe = this.recipeService.getRecipe(this.id);
    //       this.store.select('recipes').pipe(
    //         map(
    //           recipesState =>{
    //             return recipesState.recipes.find(
    //               (recipe,index)=>{
    //                 return index === this.id;
    //               }
    //             )
    //           }
    //         )
    //       ).subscribe(
    //         recipe =>{
    //           this.recipe = recipe;
    //         }
    //       )
    //     }
    //   );
    

    // more elegant way
    this.currentRoute.paramMap.pipe(
      map(
        (paramMap:ParamMap) => {
          return paramMap.get('id');
        }
      ),
      switchMap(
        recipeId =>{
          this.id = +recipeId;
          return this.store.select('recipes')
        }
      ),
      map(
        recipeState =>{
          return recipeState.recipes.find(
            (recipe,index) =>{
              return this.id === index;
            }
          );
        }
      )
    )
    .subscribe(
      recipe => {
        this.recipe = recipe;
      }
    )
  }
  onAddToShoppingList(){
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(new shoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.currentRoute});
  }

  onDelete(){
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new recipesActions.DeleteRecipe({index:this.id}))
    this.router.navigate(['/recipes']);
  }
}
