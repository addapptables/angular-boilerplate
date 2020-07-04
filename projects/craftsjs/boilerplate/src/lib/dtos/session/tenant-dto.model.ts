export class TenantDto {

  id: string;

  name: string;

  subDomain: string;

  isActive: boolean;

  editionId?: number;

  isSubscriptionEnded?: boolean;

  subscriptionEndDate?: Date;

  remainingDayCount?: number;

}
