
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

import * as shoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{
  // @ViewChild('nameInput') name;
  // @ViewChild('amountInput') amount;
  // @Output() ingredientAddedEvent = new EventEmitter<Ingredient>();
  editSubscription :Subscription;
  edit_Id:number;
  editMode:boolean =false;
  IngredientToEdit:Ingredient;
  @ViewChild('IngredientForm') ingredientForm:NgForm;
  constructor(private store: Store<fromApp.AppState> ) { }

  ngOnInit(): void {

    this.editSubscription = this.store.select('shoppingList').subscribe(
      stateData =>{
        if(stateData.editedIngredientIndex > -1){
          this.editMode = true;
          this.IngredientToEdit = stateData.editedIngredient;
          this.ingredientForm.setValue({
            name:this.IngredientToEdit.name,
            amount : this.IngredientToEdit.amount
          });
        }
        else{
          this.editMode = false;
        }
      }
    );
    // this.editIdsubscription = this.shoppingListService.editIngredientSubject
    //   .subscribe(
    //     (editId:number)=>{
    //       this.editMode=true;
    //       this.edit_Id = editId;
    //       this.IngredientToEdit = this.shoppingListService.getIngredient(this.edit_Id);
    //       // console.log(this.IngredientToEdit,this.ingredientForm);
    //       this.ingredientForm.setValue({
    //         name:this.IngredientToEdit.name,
    //         amount : this.IngredientToEdit.amount
    //       })
    //     }
    //   )
  }
  // add or update ingredient
  onSubmit(formRef:NgForm){
    // const IngredientName = this.name.nativeElement.value;
    // const amount_needed = this.amount.nativeElement.value; 
    const formVals = formRef.value;
    const IngredientName = formVals.name;
    const amount_needed = formVals.amount;
    const ingredient = new Ingredient(IngredientName,amount_needed);
    if(this.editMode){
      // this.shoppingListService.updateIngredient(this.edit_Id,ingredient);
      this.store.dispatch(new shoppingListActions.UpdateIngredient({ingredient: ingredient}));
      this.store.subscribe(data=> console.log(data));
    }
    else{
      // this.shoppingListService.addIngredient(ingredient);
      this.store.dispatch(new shoppingListActions.AddIngredient(ingredient)); 
    }
    this.editMode=false;
    formRef.reset();
    // this.ingredientAddedEvent.emit(ingredient);
  }

  onClear(){
    this.ingredientForm.reset();
    this.editMode=false;
    this.store.dispatch(new shoppingListActions.stopEdit());
  }

  onDelete(){
    // this.shoppingListService.deleteIngredient(this.edit_Id);
    this.store.dispatch(new shoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(){
    this.editSubscription.unsubscribe();
    this.store.dispatch(new shoppingListActions.stopEdit());
  }
}
