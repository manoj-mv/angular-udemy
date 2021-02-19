import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode:boolean = false;
  constructor(private currentRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.currentRoute.paramMap
      .subscribe(
        (paramMap:ParamMap)=>{
          // console.log(paramMap);
          this.id = +paramMap.get('id');
          // set edit mode by checking whether id is present in paramMap after url change
          this.editMode = paramMap.get('id') !== null;
          // console.log(this.editMode)
        }
      );
  }

}
