import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ButtonComponent } from './components/Button/button.component';


// Directives
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LazyLoadDirective } from './directives/lazy-load.directive';

// Pipes
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { LoginModalComponent } from '../features/auth/components/login-modal/login-modal.component';

const COMPONENTS = [
  ButtonComponent,
  LoginModalComponent
];

const DIRECTIVES = [
  ClickOutsideDirective,
  LazyLoadDirective
];

const PIPES = [
  CurrencyFormatPipe,
  TimeAgoPipe,
  TruncatePipe
];

@NgModule({
  imports: [
    CommonModule,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ]
})
export class SharedModule { }
