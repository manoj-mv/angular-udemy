import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations:[
        AuthComponent
    ],
    imports:[
        // ReactiveFormsModule,
        SharedModule,  //common module present in shared module
        FormsModule,

        // routing
        AuthRoutingModule
    ]
})
export class AuthModule{

}