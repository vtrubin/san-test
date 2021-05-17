import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { switchMap, takeUntil, map } from 'rxjs/operators';


export type Price = {
  id: number,
  instrument: string,
  bid: number,
  ask: number,
  time: string,
  interval?: number // this parameter is needed to show that each mock price is updated independently
}

const MOCK_PRICES: Price[] = [
  {
    id: 1,
    instrument: 'EUR/USD',
    bid: 1.1000,
    ask: 1.2000,
    time:'01-06-2020 12:01:01:001',
    interval: 4//
  }, 
  {
    id: 2,
    instrument: 'EUR/JPY',
    bid: 119.60,
    ask: 119.90,
    time:'01-06-2020 12:01:02:001',
    interval: 1
  },
  {
    id: 3,
    instrument: 'GBP/USD',
    bid: 1.1000,
    ask: 1.2000,
    time:'01-06-2020 12:01:02:001'
  },
  {
    id: 4,
    instrument: 'GBP/USD',
    bid: 1.1000,
    ask: 1.2000,
    time:'01-06-2020 12:01:02:100',
    interval: 2
  },
]

@Injectable()
export class PriceService {

  private stopInterval = new Subject();

  constructor() { }

  

  getAllPrices(): Promise<Array<Price>> {
    return new Promise((resolve, reject) => {
      resolve(MOCK_PRICES)
    })
  }

  private getLatestsPrice(i: string): Observable<Price> {
    return new Observable(o => {
      let price = MOCK_PRICES.find(el => {
        return el.instrument === i;
     });
      price.ask++; // update mock price to show it on page
      o.next(price)
    })
  }

  getLatestPriceStream(i: string, int = 1) {
    let interval$ = interval(int * 1000).pipe(
      switchMap(_=> this.getLatestsPrice(i)),
      takeUntil(this.stopInterval)
    )
    return interval$
  }

  ngOnDestroy() {
    this.stopInterval.next();
 }

}
