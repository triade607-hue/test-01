import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Components
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
    // Components
    LoginModalComponent,
    RegisterModalComponent,
  ]
})
export class AuthModule { }
