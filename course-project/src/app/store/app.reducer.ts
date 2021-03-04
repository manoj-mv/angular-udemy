import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipes.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
    shoppingList : fromShoppingList.shoppingListState,
    auth: fromAuth.authState,
    recipes: fromRecipes.recipesState
}


export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth:fromAuth.authReducer,
    recipes: fromRecipes.recipeReducer
}