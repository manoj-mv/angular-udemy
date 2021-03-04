import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes:Recipe[];
  subscription:Subscription;
  constructor(
              // private recipeService:RecipeService,
              private router:Router,
              private currentRoute: ActivatedRoute,
              private store:Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes')
      .pipe(
        map(
          recipesState =>{
            return recipesState.recipes;
          }
        )
      )
      .subscribe(
        (recipes:Recipe[])=>{
          this.recipes = recipes;
        }
      );
    // this.subscription = this.recipeService.recipesChanged
    //   .subscribe(
    //     (recipesList:Recipe[])=>{
    //       this.recipes = recipesList;
    //     }
    //   )
    // this.recipes = this.recipeService.getRecipes();
  }
  
  onRecipeCreate(){
    this.router.navigate(['create'],{relativeTo:this.currentRoute});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
