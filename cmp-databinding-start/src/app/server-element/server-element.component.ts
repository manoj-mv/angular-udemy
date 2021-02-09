import { 
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component, 
  ContentChild, 
  DoCheck,
  ElementRef,
  Input, 
  OnChanges, 
  OnDestroy, 
  OnInit, 
  SimpleChanges, 
  ViewChild, 
  ViewEncapsulation }
from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class ServerElementComponent 
implements 
OnInit,
OnChanges,
DoCheck, 
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy {
  @Input('serverEl')element:{type:string,name:string,content:string};
  @Input() name :string;
  @ViewChild('heading',{static:true}) header:ElementRef;
  @ContentChild('contentParagraph') paragraph:ElementRef;
  
  constructor() { 
    console.log('counstuctor called...');
  }

  ngOnChanges(changes: SimpleChanges){
    console.log('ngOnCHanges called..');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit called...');
    console.log('header text content: '+this.header.nativeElement.textContent);
    console.log('text content of heading para '+this.paragraph);
  }
  ngDoCheck(){
    console.log('ngDOCheck called..');
  }
  ngAfterContentInit(){
    console.log('ngAfterContentInit called..');
    console.log('text content of heading para '+this.paragraph);
  }
  ngAfterContentChecked(){
    console.log('ngAfterContentChecked called..')
  }
  ngAfterViewInit(){
    console.log('ngAfterViewInit called..');
    console.log('header text content: '+this.header.nativeElement.textContent);
  }
  ngAfterViewChecked(){
    console.log('ngAfterViewChecked called..');
  }
  ngOnDestroy(){
    console.log('ngOnDestroy is called..');
  }
}

