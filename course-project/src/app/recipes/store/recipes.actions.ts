
import { Action } from "@ngrx/store";
import { Actions } from "@ngrx/store-devtools/src/reducer";
import { Recipe } from "../recipe.model";


export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch recipes';
export const ADD_RECIPE =  '[Recipe] Add Recipe';
export const UPDATE_RECIPE = "[Recipe] Update Recipe";
export const DELETE_RECIPE = "[Recipe] Delete Recipe";
export const STORE_RECIPES = "[Recipe] Store Recipe";

export class setRecipes implements Action{
    readonly type = SET_RECIPES;
    constructor(public payload: {recipes:Recipe[]}){}
}


export class FetchRecipes implements Action{
    readonly type = FETCH_RECIPES;
}


export class AddRecipe implements Action{
    readonly type =ADD_RECIPE;
    constructor(public payload:{recipe : Recipe}){}
}

export class UpdateRecipe implements Action{
    readonly type = UPDATE_RECIPE;
    constructor(public payload:{index:number, updatedRecipe:Recipe}){}
}

export class DeleteRecipe implements Action{
    readonly type = DELETE_RECIPE;
    constructor(public payload:{index:number}){}
}

export class StoreRecipes implements Action{
    readonly type = STORE_RECIPES;
}
export type recipesActionsTypes = setRecipes | FetchRecipes |
                                  AddRecipe | DeleteRecipe |
                                  UpdateRecipe | StoreRecipes;