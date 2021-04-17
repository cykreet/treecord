export interface APIDonation {
  user: APIDonationUser;
  gift: boolean;
  trees: number;
  donatedAt: Date;
  message: string | null;
}

export interface APIDonationUser {
  name: string;
  team: string | null;
}
