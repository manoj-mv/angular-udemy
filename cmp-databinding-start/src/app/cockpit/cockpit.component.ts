import { Component, OnInit,EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  newServerName ="";
  // newServerContent ="";
  @ViewChild('serverContentInput',) serverContentInput: ElementRef;
  @Output() serverCreated = new EventEmitter<{serverName:string,serverContent:string}>();
  @Output('bpCreated') bluePrintCreated = new EventEmitter<{serverName:string,serverContent:string}>();
  constructor() { }

  ngOnInit(): void {
  }
  onAddServer(nameInput:HTMLInputElement){
    console.log(this.serverContentInput.nativeElement.value);
    this.serverCreated.emit({
        serverName:nameInput.value,
        serverContent:this.serverContentInput.nativeElement.value
      });
  }

  onAddBlueprint(nameInput:HTMLInputElement){
    // console.log('btn');
    // this.bluePrintCreated.emit({serverName:nameInput.value,serverContent:this.newServerContent});
    this.bluePrintCreated.emit({
      serverName:nameInput.value,
      serverContent:this.serverContentInput.nativeElement.value
    });
  }
}
