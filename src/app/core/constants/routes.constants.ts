export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  BUYER: {
    PROFILE: '/buyer/profile',
    ORDERS: '/buyer/orders',
    WISHLIST: '/buyer/wishlist',
  },
  SELLER: {
    DASHBOARD: '/seller/dashboard',
    PRODUCTS: '/seller/products',
  },
  PUBLIC: {
    PRODUCT_DETAIL: (id: string) => `/product/${id}`,
    CART: '/cart',
  }
};
