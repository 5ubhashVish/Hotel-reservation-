import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationListComponent } from '../reservation-list/reservation-list.component';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReservationListComponent, ReservationFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ReservationModule {}
