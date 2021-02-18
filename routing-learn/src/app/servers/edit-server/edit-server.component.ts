import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { canComponentDeactivate } from './can-deactivate-gaurd.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, canComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit=false;
  changesSaved=false;
  constructor(private serversService: ServersService,
      private currentRoute:ActivatedRoute,
      private router:Router
    ) { }

  ngOnInit() {
    // console.log(this.currentRoute)
    console.log('query param:',this.currentRoute.snapshot.queryParams);
    console.log(this.currentRoute.snapshot.fragment)
    this.currentRoute.queryParams.subscribe(
      (queryParameters:Params)=>{
        this.allowEdit = queryParameters['allowEdit'] === '1' ? true : false;
        console.log(queryParameters);
      }
    );
    this.currentRoute.fragment.subscribe();
    let id = this.currentRoute.snapshot.paramMap.get('id');
    this.currentRoute.paramMap.subscribe(
      (paramMap: ParamMap)=>{
        id = paramMap.get('id');
      }  
    );
    this.server = this.serversService.getServer(Number(id));
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved =true;
    this.router.navigate(['../'],{relativeTo:this.currentRoute});
  }

  canDeactivate():Observable<boolean> | Promise<boolean> | boolean{
    if(!this.allowEdit){
      return true;
    }

    if(this.server.name !== this.serverName || 
    this.server.status !== this.serverStatus &&
    !this.changesSaved) {
      return confirm('Do you want to discard the channges?');
    }
    else{
      return true;
    }
  }
}
