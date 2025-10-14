import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storage = inject(StorageService);
  
  const token = storage.getItem('token');
  
  if (token) {
    return true;
  }
  
  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
