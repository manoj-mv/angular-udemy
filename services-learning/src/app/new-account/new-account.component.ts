import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers:[LoggingService]
})
export class NewAccountComponent implements OnInit{
  constructor(private logStatus:LoggingService,
    private accountService:AccountService
  ){}
  ngOnInit(){
    this.accountService.statusUpdated.subscribe((ststus:string) => {
      alert('New Status : '+status);
    })
  }
  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName,accountStatus);
    // this.logStatus.logStatusChange(accountStatus);
  }
}
