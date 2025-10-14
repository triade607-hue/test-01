import { UserRole } from '../../../core/enums/user-role.enum';

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  acceptTerms: boolean;
}
