export interface User {
  id?: number;
  userId?: string;
  trn?: number;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  username?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  parish?: string;
  streetAddress?: string;
  pickUpBranch?: string;
  role?: string;
  authorities?: [];
  isActive?: boolean;
  isNotLocked?: boolean;
}


