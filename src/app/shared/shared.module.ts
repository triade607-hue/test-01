import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { BadgeComponent } from './components/badge/badge.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { RatingComponent } from './components/rating/rating.component';
import { ColorSelectorComponent } from './components/color-selector/color-selector.component';
import { QuantitySelectorComponent } from './components/quantity-selector/quantity-selector.component';
import { TimelineStepComponent } from './components/timeline-step/timeline-step.component';
import { ModalComponent } from './components/modal/modal.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { AlertComponent } from './components/alert/alert.component';

// Directives
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LazyLoadDirective } from './directives/lazy-load.directive';

// Pipes
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

const COMPONENTS = [
  ButtonComponent,
  InputComponent,
  BadgeComponent,
  StatusBadgeComponent,
  ToggleComponent,
  RatingComponent,
  ColorSelectorComponent,
  QuantitySelectorComponent,
  TimelineStepComponent,
  ModalComponent,
  SearchBarComponent,
  LoaderComponent,
  EmptyStateComponent,
  PaginationComponent,
  AlertComponent
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
