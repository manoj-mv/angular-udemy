import { State } from "@ngrx/store";
import { Recipe } from "../recipe.model";

import * as recipesActions from './recipes.actions';

export interface recipesState{
    recipes: Recipe[];
}


const intitialState: recipesState = {
    recipes: []
}
export function recipeReducer(state = intitialState ,action:recipesActions.recipesActionsTypes){
    switch(action.type){
        case recipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload.recipes]
            };
        case recipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes,action.payload.recipe]
            }
        case recipesActions.UPDATE_RECIPE:

            const UpdatedRecipe = {
                ...state.recipes[action.payload.index],  //old recipe
                ...action.payload.updatedRecipe
            };
            
            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = UpdatedRecipe;

            return {
                ...state,
                recipes: updatedRecipes
            };

        case recipesActions.DELETE_RECIPE:
            return{
                ...state,
                recipes: state.recipes.filter(
                    (recipe,index)=>{
                        return index != action.payload.index;
                    }
                )
            }
        default:
            return state;
    }
}