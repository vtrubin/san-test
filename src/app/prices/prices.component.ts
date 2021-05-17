import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { Price, PriceService } from '../price.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {

  public prices: Array<Price>;
  private instrumentSubscriptions: Subscription[] = [];

  constructor(private priceSvc: PriceService) { }

  ngOnInit() {
    this.priceSvc.getAllPrices()
    .then(prices => {
      this.prices = this.filterPrices(prices);
      this.prices.forEach(p => {
        const subscription = this.priceSvc.getLatestPriceStream(p.instrument, p.interval)
        .subscribe((price: Price) => {
          this.updatePrice(price)
        });
        this.instrumentSubscriptions.push(subscription);
      })
    })
    
  }

  ngOnDestroy(): void {
    this.instrumentSubscriptions.forEach((subscription) => subscription.unsubscribe())
    
  }

  private updatePrice(price: Price) {
    const index = this.prices.findIndex(el => el.instrument === price.instrument);
    this.prices[index] = price;
  }

  private filterPrices(prices: Array<Price>): Array<Price> {
    let uniquePrices: {[key: string]: Price} = {};
    prices.forEach((p: Price) => {
      if (uniquePrices[p.instrument]){
        const newT = new Date(p.time);
        const existingT = new Date(uniquePrices[p.instrument].time);
        if (newT > existingT){
          uniquePrices[p.instrument] = p;
        }
      } else {
        uniquePrices[p.instrument] = p;
      }
    });
    return Object.values(uniquePrices);
  }

}
