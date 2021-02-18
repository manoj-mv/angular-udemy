import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router ,Data} from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  constructor(private serversService: ServersService,
              private currentRoute:ActivatedRoute,
              private router:Router
  ) { }

  ngOnInit() {
    // const id =Number(this.currentRoute.snapshot.params['id']);
    // this.server = this.serversService.getServer(id);
    // this.currentRoute.params.subscribe((params:Params)=>{
    //   this.server = this.serversService.getServer(Number(params.id))
    // });

    this.currentRoute.data
      .subscribe(
        (data:Data)=>{
          this.server = data['server'];
        }
      );
  }

  onEdit(){
    this.router.navigate(['edit'],{relativeTo: this.currentRoute, queryParamsHandling:'preserve'});
  }
}
