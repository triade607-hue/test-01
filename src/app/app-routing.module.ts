import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { buyerGuard } from './core/guards/buyer.guard';
import { sellerGuard } from './core/guards/seller.guard';

const routes: Routes = [
  // Public routes
  {
    path: '',
    loadChildren: () => import('./features/public/public.module').then(m => m.PublicModule)
  },
  
  // Auth routes
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  
  // Buyer routes (protected)
  {
    path: 'buyer',
    loadChildren: () => import('./features/buyer/buyer.module').then(m => m.BuyerModule),
    canActivate: [authGuard, buyerGuard]
  },
  
  // Seller routes (protected)
  {
    path: 'seller',
    loadChildren: () => import('./features/seller/seller.module').then(m => m.SellerModule),
    canActivate: [authGuard, sellerGuard]
  },
  
  // Messaging (protected)
  {
    path: 'messages',
    loadChildren: () => import('./features/messaging/messaging.module').then(m => m.MessagingModule),
    canActivate: [authGuard]
  },
  
  // Notifications (protected)
  {
    path: 'notifications',
    loadChildren: () => import('./features/notifications/notifications.module').then(m => m.NotificationsModule),
    canActivate: [authGuard]
  },
  
  // Settings (protected)
  {
    path: 'settings',
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [authGuard]
  },
  
  // Support
  {
    path: 'support',
    loadChildren: () => import('./features/support/support.module').then(m => m.SupportModule)
  },
  
  // Wildcard route
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
