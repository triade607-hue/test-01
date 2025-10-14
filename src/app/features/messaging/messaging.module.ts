import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingRoutingModule } from './messaging-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MessagingRoutingModule,
    SharedModule
  ]
})
export class MessagingModule { }
