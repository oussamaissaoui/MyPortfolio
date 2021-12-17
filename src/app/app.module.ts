import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandPageComponent } from './land-page/land-page.component';
import { FlowerComponent } from './flower/flower.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SecondObjectComponent } from './second-object/second-object.component';
import { ThirdOneComponent } from './third-one/third-one.component';
import { OnHovComponent } from './on-hov/on-hov.component';
import { MeModelComponent } from './me-model/me-model.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { MatDialogModule } from '@angular/material/dialog';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from './contact.service';


@NgModule({
  declarations: [
    AppComponent,
    LandPageComponent,
    FlowerComponent,
    SidebarComponent,
    SecondObjectComponent,
    ThirdOneComponent,
    OnHovComponent,
    MeModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
