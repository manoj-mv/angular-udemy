import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{
  // @ViewChild('nameInput') name;
  // @ViewChild('amountInput') amount;
  // @Output() ingredientAddedEvent = new EventEmitter<Ingredient>();
  editIdsubscription :Subscription;
  edit_Id:number;
  editMode:boolean =false;
  IngredientToEdit:Ingredient;
  @ViewChild('IngredientForm') ingredientForm:NgForm;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.editIdsubscription = this.shoppingListService.editIngredientSubject
      .subscribe(
        (editId:number)=>{
          this.editMode=true;
          this.edit_Id = editId;
          this.IngredientToEdit = this.shoppingListService.getIngredient(this.edit_Id);
          // console.log(this.IngredientToEdit,this.ingredientForm);
          this.ingredientForm.setValue({
            name:this.IngredientToEdit.name,
            amount : this.IngredientToEdit.amount
          })
        }
      )
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
      this.shoppingListService.updateIngredient(this.edit_Id,ingredient);
    }
    else{
      this.shoppingListService.addIngredient(ingredient);
    }
    this.editMode=false;
    formRef.reset();
    // this.ingredientAddedEvent.emit(ingredient);
  }

  onClear(){
    this.ingredientForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.edit_Id);
    this.onClear();
  }

  ngOnDestroy(){
    this.editIdsubscription.unsubscribe();
  }
}
