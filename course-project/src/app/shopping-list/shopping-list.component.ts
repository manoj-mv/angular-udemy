import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../store/app.reducer';
import * as shoppingListActions from  './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers:[ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  // private ingredentChangeSubscription:Subscription;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredentChangeSubscription = this.shoppingListService.ingredientsChangedEvent.subscribe(
    //   (updatedIngredients: Ingredient[]) => {
    //     this.ingredients = updatedIngredients;
    //   }
    // )
  }

  onEditItem(editId:number){
    console.log(editId);
    // pass id of the ingredient to be edited using subject
    // this.shoppingListService.editIngredientSubject.next(editId);
    this.store.dispatch(new shoppingListActions.startEdit({edit_id : editId}));
  }


  ngOnDestroy(){
    // this.ingredentChangeSubscription.unsubscribe();
  }
}
