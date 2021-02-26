import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGaurd } from "./auth/auth.gaurd";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { ReciperesolverService } from "./recipes/recipe-resolver.service";
import { RecipeStartMsgComponent } from "./recipes/recipe-start-msg/recipe-start-msg.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes:Routes = [
    {path:'',redirectTo:'/recipes',pathMatch:'full'},
    {path:'recipes',component:RecipesComponent,canActivate:[AuthGaurd],
    children:[
        {path:'',component:RecipeStartMsgComponent,pathMatch:'full'},
        {path:'create',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent, resolve:[ReciperesolverService]},
        {path:':id/edit',component:RecipeEditComponent, resolve:[ReciperesolverService]}
    ]
    },
    {path:'shopping-list', component: ShoppingListComponent,
        children:[
            // {path:':id/edit',}
        ]
    },
    {path:'auth',component:AuthComponent}

];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes),
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}