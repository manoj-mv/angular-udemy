import { Ingredient } from "../../shared/ingredient.model";
import * as shoppingListActions from './shopping-list.actions';


// interface for shoppinglist state
export interface shoppingListState{
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex:number;
}

// // to access centralize state definitions later
// export interface appState{
//     shoppingList: shoppingListState
// }

const initialState:shoppingListState = {
    ingredients: [
      new Ingredient('Apples',5),
      new Ingredient('Tomatoes', 10)
    ],
    editedIngredient:null,
    editedIngredientIndex: -1

};

export function shoppingListReducer(state:shoppingListState = initialState, 
                                    action: shoppingListActions.shoppingListActionsTypes){
    switch(action.type){
        case shoppingListActions.ADD_INGREDIENT:
                return {
                    ...state,
                    ingredients:[...state.ingredients, action.payload]
                }
        case shoppingListActions.ADD_INGREDIENTS:
                // console.log('ok');
                return{
                    ...state,
                    ingredients:[...state.ingredients,...action.payload]
                }
        case shoppingListActions.UPDATE_INGREDIENT:
                console.log(action);
                const prev_ingredient = state.ingredients[state.editedIngredientIndex];
                const updatedIngredient={
                    ...prev_ingredient, //incase any property we dont need to overwrite
                    ...action.payload.ingredient
                };
                const updatedIngredients = [...state.ingredients];
                updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
                return {
                    ...state,
                    ingredients: updatedIngredients,
                    editedIngredientIndex: -1,
                    editedIngredient: null
                } ;

        case shoppingListActions.DELETE_INGREDIENT:
                return {
                    ...state,
                    ingredients : state.ingredients.filter(
                        (Ingredient,index)=>{
                            return index !== state.editedIngredientIndex;
                        }
                    ),
                    editedIngredientIndex: -1,
                    editedIngredient: null
                };
        case shoppingListActions.START_EDIT:
                return {
                    ...state,
                    editedIngredientIndex : action.payload.edit_id,
                    editedIngredient: {...state.ingredients[action.payload.edit_id]}
                }
        
        case shoppingListActions.STOP_EDIT:
                return{
                    ...state,
                    editedIngredientIndex: -1,
                    editedIngredient: null
                }
        default:
                return state;
    }

}