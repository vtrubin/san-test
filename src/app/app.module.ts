import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PricesComponent } from './prices/prices.component';
import { PriceService } from './price.service';

@NgModule({
  declarations: [
    AppComponent,
    PricesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PriceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
