import { NgModule }     from '@angular/core';
import { BrowserModule }from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './pages/search/search.component';
import { routing }      from './app.routing';


@NgModule({
  imports: [ BrowserModule, routing, FormsModule],
  declarations: [
    AppComponent, SearchComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
