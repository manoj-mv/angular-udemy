import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartMsgComponent } from './recipe-start-msg/recipe-start-msg.component';
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesRoutingModule } from "./recipe-routing.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartMsgComponent,
        RecipeEditComponent,
    ],
    imports:[
        RouterModule,
        ReactiveFormsModule,
        
        // custom
        SharedModule,
        // routing
        RecipesRoutingModule
    ],
    exports:[
       
    ]
})
export class RecipesModule{

}