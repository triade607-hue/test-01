import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { UserRole } from '../enums/user-role.enum';

export const buyerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storage = inject(StorageService);
  
  const user = storage.getItem('user');
  
  if (user && user.role === UserRole.BUYER) {
    return true;
  }
  
  router.navigate(['/']);
  return false;
};
