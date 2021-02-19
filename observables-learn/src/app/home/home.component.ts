import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  intervalObservableSubscription:Subscription;
  constructor() { }

  ngOnInit() {
    // observable subscription
    // this.intervalObservableSubscription = interval(1000).subscribe((count)=>{
    //   console.log(count);
    // })

    // custom observable take subscriber/observer as argument and pass value to that
    const customIntervalObservable = new Observable(
      (observer) => {
        let count = 0;
        setInterval(()=>{
          observer.next(count);
          // for complete
          if(count === 3){
            observer.complete();
          }
          //fake error
          if(count > 3){
            observer.error(new Error('count is greater than 3!'));
          }
          count++;
        },1000);
      }
    );

    // use operator
    const operatorsOnObservable = customIntervalObservable.pipe(
      filter(
        (data)=>{
          return data > 0;
        }
      ),
      map(
        (data:number) =>{
          return 'Round: ' +(data+1);
        }
      )
    );

    // subscription of observable
    // this.intervalObservableSubscription =customIntervalObservable.subscribe(
      // here used operator map() stored in 'operatorsOnObservable'
    this.intervalObservableSubscription =operatorsOnObservable.subscribe(
      // 'data' - recieved from observable 
      //react to next()
      (data) =>{
        console.log(data);
      },
      // react to error()
      (error)=>{
        console.log(error);
        alert(error.message);
      },
      // react to complete()
      ()=>{
        console.log('completed')
      }
    );
    
  }

  ngOnDestroy(){
    this.intervalObservableSubscription.unsubscribe();
  }

}
