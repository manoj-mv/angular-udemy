import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  serverElements=[{type:'server',name:'Test server',content:'test'}];
  
  onServerAdded(newServerData:{serverName:string,serverContent:string}){
    // console.log(newServerData.serverName,newServerData.serverContent);
    this.serverElements.push(
      {
        type: 'server',
        name: newServerData.serverName,
        content: newServerData.serverContent
      }
    );
    // console.log(this.serverElements);
  }
  onBlueprintAdded(newServerData:{serverName:string,serverContent:string}){
    console.log(newServerData.serverName,newServerData.serverContent);
    this.serverElements.push(
      {
        type: 'blueprint',
        name: newServerData.serverName,
        content: newServerData.serverContent
      }
    );
    // console.log(this.serverElements);
  }

  onChangeFirst(){
    this.serverElements[0].name = "changed";
  }
  onDestroyFirst(){
    this.serverElements.splice(0,1);
  }
}