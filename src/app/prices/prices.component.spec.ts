import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Price, PriceService } from '../price.service';

import { PricesComponent } from './prices.component';
import { Observable } from 'rxjs/Observable';
import { subscribeOn } from 'rxjs/operator/subscribeOn';

describe('PricesComponent', () => {
  let component: PricesComponent;
  let fixture: ComponentFixture<PricesComponent>;
  let priceSvc: PriceService;
  let mockPrices: Price[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricesComponent ],
      providers: [
        PriceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricesComponent);
    component = fixture.componentInstance;
    priceSvc = fixture.debugElement.injector.get(PriceService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load list of prices', async () => {
    mockPrices = [
      {
        id: 1,
        instrument: 'EUR/USD',
        bid: 1.1000,
        ask: 1.2000,
        time:'01-06-2020 12:01:01:001',
      }, 
      {
        id: 2,
        instrument: 'EUR/JPY',
        bid: 119.60,
        ask: 119.90,
        time:'01-06-2020 12:01:02:001',
      },
    ];
    spyOn(priceSvc, "getAllPrices").and.returnValue(
      Promise.resolve(mockPrices)
    );
    await fixture.whenStable();

    expect(component.prices).toBe(mockPrices);
  });

  it('should update list of prices', async () => {
    mockPrices = [
      {
        id: 1,
        instrument: 'EUR/USD',
        bid: 1.1000,
        ask: 1.2000,
        time:'01-06-2020 12:01:01:001',
      }, 
      {
        id: 2,
        instrument: 'EUR/JPY',
        bid: 119.60,
        ask: 119.90,
        time:'01-06-2020 12:01:02:001',
      },
    ];
    let newPrice: Price = {
      id: 2,
      instrument: 'EUR/JPY',
      bid: 119.60,
      ask: 119.999,
      time:'01-06-2020 12:01:02:001',
    };

    let mockUpdatedPrice: Price[] = [
      {
        id: 1,
        instrument: 'EUR/USD',
        bid: 1.1000,
        ask: 1.2000,
        time:'01-06-2020 12:01:01:001',
      }, 
      {
        id: 3,
        instrument: 'EUR/JPY',
        bid: 119.60,
        ask: 119.999,
        time:'01-06-2020 12:01:02:001',
      },
    ]
    spyOn(priceSvc, "getAllPrices").and.returnValue(
      Promise.resolve(mockPrices)
    );

    await fixture.whenStable();

    spyOn(priceSvc, "getLatestPriceStream").and.returnValue(
      Observable.of(newPrice)
    );

    await fixture.whenStable();

    expect(component.prices).toBe(mockUpdatedPrice);

  })
});
