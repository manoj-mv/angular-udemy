import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes:Recipe[];
  subscription:Subscription;
  constructor(private recipeService:RecipeService,
              private router:Router,
              private currentRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipesList:Recipe[])=>{
          this.recipes = recipesList;

        }
      )
    this.recipes = this.recipeService.getRecipes();
  }
  
  onRecipeCreate(){
    this.router.navigate(['create'],{relativeTo:this.currentRoute});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
