import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers:[ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredentChangeSubscription:Subscription;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredentChangeSubscription = this.shoppingListService.ingredientsChangedEvent.subscribe(
      (updatedIngredients: Ingredient[]) => {
        this.ingredients = updatedIngredients;
      }
    )
  }

  onEditItem(editId:number){
    console.log(editId);
    // pass id of the ingredient to be edited using subject
    this.shoppingListService.editIngredientSubject.next(editId);
  }


  ngOnDestroy(){
    this.ingredentChangeSubscription.unsubscribe();
  }
}
