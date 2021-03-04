import {
  Component, OnDestroy, OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
// import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
// import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as authActions from '../auth/store/auth.actions';
import * as recipeActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy{
  private userAuthSub:Subscription;
  isAuthenticated = false;
  constructor(
    // private dataStorageService:DataStorageService,
    private recipeService:RecipeService,
    // private authService:AuthService,
    private store:Store<fromApp.AppState>
  ){}

  ngOnInit(){
    this.userAuthSub = this.store.select('auth')
    .pipe(
      map(
        authState =>{
          return authState.user;
        }
      )
    )
    .subscribe(
      user=>{
        this.isAuthenticated = !user ? false : true;
      }
    );
  }
  onLogOut(){
    // this.authService.logout();
    this.store.dispatch(new authActions.LogOut());
    
  }

  ngOnDestroy(){
    this.userAuthSub.unsubscribe();
  }
  onSaveData(){
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new recipeActions.StoreRecipes());
  }
  onFetchData(){
    // this.dataStorageService.fetchRecipes()
    // .subscribe(
    //   response=>{
    //     this.recipeService.setRecipes(response);
    //     console.log(response);
    //   }
    // );
    this.store.dispatch(new recipeActions.FetchRecipes());
  }
}