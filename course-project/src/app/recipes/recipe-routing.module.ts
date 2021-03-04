import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { AuthGaurd } from "../auth/auth.gaurd";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { ReciperesolverService } from "./recipe-resolver.service";
import { RecipeStartMsgComponent } from "./recipe-start-msg/recipe-start-msg.component";
import { RecipesComponent } from "./recipes.component";


const routes:Routes = [
    {path:'',component:RecipesComponent,canActivate:[AuthGaurd],
    children:[
        {path:'',component:RecipeStartMsgComponent,pathMatch:'full'},
        {path:'create',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent, resolve:[ReciperesolverService]},
        {path:':id/edit',component:RecipeEditComponent, resolve:[ReciperesolverService]}
    ]
    }
]
@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class RecipesRoutingModule{

}