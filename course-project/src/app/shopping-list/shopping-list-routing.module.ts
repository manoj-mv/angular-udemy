import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list.component";

const routes:Routes = [
    {path:'', component: ShoppingListComponent,
        children:[
            // {path:':id/edit',}
        ]
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(routes),
    ],
    exports:[
        RouterModule
    ]
})
export class ShoppungListRoutingModule{
}