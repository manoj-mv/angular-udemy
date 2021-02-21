import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;
  constructor(private recipeService:RecipeService,
              private currentRoute:ActivatedRoute,
              private router:Router
  ) {}
  ngOnInit(): void {
    this.currentRoute.paramMap
      .subscribe(
        (paramMap:ParamMap)=>{
          this.id = +paramMap.get('id');
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
    
  }
  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.currentRoute});
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
