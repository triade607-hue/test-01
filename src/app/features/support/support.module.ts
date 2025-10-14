import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SupportRoutingModule } from './support-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SupportRoutingModule,
    SharedModule
  ]
})
export class SupportModule { }
