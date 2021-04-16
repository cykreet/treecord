export interface Donation {
  user: DonationUser;
  gift: boolean;
  trees: number;
  donatedAt: Date;
  message: string | null;
}

export interface DonationUser {
  name: string;
  team: string | null;
}
