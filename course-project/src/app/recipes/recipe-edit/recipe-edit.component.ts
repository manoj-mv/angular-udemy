import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

import * as fromApp from '../../store/app.reducer';
import * as recipesActions from '../store/recipes.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit ,OnDestroy{
  id:number;
  editMode:boolean = false;
  recipeForm:FormGroup;
  recipeItem:Recipe;
  private storeSub :Subscription;
  constructor(private currentRoute:ActivatedRoute,
              private recipeService:RecipeService,
              private router:Router,
              private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    // old approach
    this.currentRoute.paramMap
      .subscribe(
        (paramMap:ParamMap)=>{
          // console.log(paramMap);
          this.id = +paramMap.get('id');
          // set edit mode by checking whether id is present in paramMap after url change
          this.editMode = paramMap.get('id') !== null;
          // console.log(this.editMode)
          this.initForm();
        }
      ); 

  }

  onSubmit(){
    console.log(this.recipeForm.value);
    if(this.editMode){
      // recipeForm.value is the formGroup object which has same structure of Recipe model
      // this.recipeService.updateRecipe(this.id,this.recipeForm.value);
      this.store.dispatch(new recipesActions.UpdateRecipe({index:this.id,updatedRecipe:this.recipeForm.value}))
    }
    else{
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new recipesActions.AddRecipe({recipe: this.recipeForm.value}))
    }
    this.route_to_previous();
  }

  // return form controls in a formGroup
  getControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients'))
      .push(new FormGroup({
        'name': new FormControl(null,[Validators.required]),
        'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      }))
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  route_to_previous(){
     this.router.navigate(['../'],{relativeTo:this.currentRoute});
  }
  private initForm(){
    let recipeName="";
    let recipeImagePath="";
    let recipeDescription="";
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      // this.recipeItem = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store.select('recipes').pipe(
        map(
          recipeState =>{
            return recipeState.recipes.find(
              (recipe,index) =>{
                return this.id === index;
              }
            )
          }
        )
      ).subscribe(
        recipeItem =>{
          console.log('recipeItem:',recipeItem);
          recipeName = recipeItem['name'];
          recipeImagePath = recipeItem.imagePath;
          recipeDescription = recipeItem.description;
          if(recipeItem.ingredients){
            for( let item of recipeItem.ingredients){
              recipeIngredients.push(new FormGroup({
                'name': new FormControl(item.name,[Validators.required]),
                'amount': new FormControl(item.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
              }))
            }
          }
        }
      )
     
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,[Validators.required]),
      'imagePath': new FormControl(recipeImagePath,[Validators.required]),
      'description': new FormControl(recipeDescription,[Validators.required]),
      'ingredients': recipeIngredients
    });
  }


  ngOnDestroy(){
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

}
