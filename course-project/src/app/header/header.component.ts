import {
  Component, OnDestroy, OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy{
  private userAuthSub:Subscription;
  isAuthenticated = false;
  constructor(
    private dataStorageService:DataStorageService,
    private recipeService:RecipeService,
    private authService:AuthService
  ){}

  ngOnInit(){
    this.userAuthSub = this.authService.userSub.subscribe(
      user=>{
        this.isAuthenticated = !user ? false : true;
      }
    );
  }
  onLogOut(){
    this.authService.logout();
    
  }

  ngOnDestroy(){
    this.userAuthSub.unsubscribe();
  }
  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes()
    .subscribe(
      response=>{
        this.recipeService.setRecipes(response);
        console.log(response);
      }
    );
  }
}