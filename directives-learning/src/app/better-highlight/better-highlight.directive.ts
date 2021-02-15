import { 
  Directive, 
  ElementRef, 
  HostBinding, 
  HostListener, 
  Input, 
  OnInit, 
  Renderer2 } from '@angular/core';


@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  @Input() defaultColor:string = 'transparent';
  @Input('appBetterHighlight') highlightColor:string = 'blue';

  @HostBinding('style.backgroundColor') bgColor:string; 
  constructor(private renderer:Renderer2, private elRef:ElementRef) { }

  ngOnInit(){
    this.bgColor= this.defaultColor;
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor','blue');
  }

  @HostListener('mouseenter') mouseover(eventData:Event){
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor','blue');
    this.bgColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData:Event){
    // this.renderer.setStyle(this.elRef.nativeElement,'backgroundColor','transparent');
    this.bgColor = this.defaultColor;
  }
}
