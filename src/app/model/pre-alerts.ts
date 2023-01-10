export interface PreAlerts {

  trackingNumber?: string,

  courier?: string,

  description?: string,

  weight?: number;

  cost?: number;

  userId?: string;

  status?: string;

  totalPackagesNotShipped?: number;

  totalPackagesShipped?: number;

  totalPackagesReadyForPickUp?: number;
  updatedAt?: Date

  invoice?: any;

  firstName?: string;
  lastName?: string;
}
