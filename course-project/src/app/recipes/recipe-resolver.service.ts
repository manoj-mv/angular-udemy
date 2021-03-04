import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
import * as fromApp from '../store/app.reducer';
import { map, switchMap, take, tap } from "rxjs/operators";
import * as recipeActions from './store/recipes.actions';
import { Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";



@Injectable({
    providedIn:"root"
})
export class ReciperesolverService implements Resolve<Recipe[]>{
    constructor(
        // private dataStorageService:DataStorageService,
        private recipeService:RecipeService,
        private store:Store<fromApp.AppState>,
        private actions$: Actions
    ){}
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        // const recipes =this.recipeService.getRecipes();
       
        // return this.dataStorageService.fetchRecipes();
        return this.store.select('recipes').pipe(
            take(1),
            map(
                recipeState=>{
                    return recipeState.recipes;
                }
            ),
            switchMap(
                recipes =>{
                    if(recipes.length === 0){
                        this.store.dispatch(new recipeActions.FetchRecipes());
                        return this.actions$.pipe(
                            ofType(recipeActions.SET_RECIPES),
                            take(1)
                        );
                    }
                    else{
                        return of(recipes);
                    }
                }
            )
        )
    }
        // else{
        //     return recipes;
        // }
        
    }
