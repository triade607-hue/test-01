import { environment } from '../../../environments/environment';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${environment.apiUrl}/auth/login`,
    REGISTER: `${environment.apiUrl}/auth/register`,
    LOGOUT: `${environment.apiUrl}/auth/logout`,
    REFRESH: `${environment.apiUrl}/auth/refresh`,
  },
  PRODUCTS: {
    LIST: `${environment.apiUrl}/products`,
    DETAIL: (id: string) => `${environment.apiUrl}/products/${id}`,
  },
  USERS: {
    PROFILE: `${environment.apiUrl}/users/profile`,
  }
};
