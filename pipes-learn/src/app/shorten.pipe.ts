import { Pipe, PipeTransform } from "@angular/core";


// import {PipeTransform} from '@angular/core';
@Pipe({
    name:'shorten'
})
export class ShortenPipe implements PipeTransform{
    transform(value:any,limit){
        if(value.length > limit){
            return value.substr(0,limit)+'...';
        }
        return value;
         
    }
}

