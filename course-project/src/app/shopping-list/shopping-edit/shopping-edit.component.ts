import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') name;
  @ViewChild('amountInput') amount;
  // @Output() ingredientAddedEvent = new EventEmitter<Ingredient>();
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
  }
  onAddIngredient(){
    const IngredientName = this.name.nativeElement.value;
    const amount_needed = this.amount.nativeElement.value; 
    const ingredient = new Ingredient(IngredientName,amount_needed);
    this.shoppingListService.addIngredient(ingredient);
    // this.ingredientAddedEvent.emit(ingredient);
  }
}
