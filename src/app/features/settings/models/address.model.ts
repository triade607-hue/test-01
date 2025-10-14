export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
  type: 'billing' | 'shipping' | 'both';
}
