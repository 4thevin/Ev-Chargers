export interface Station {
  Id: number | string;
  name: string;
  address: string;
  city: string;
  state: string;
  websiteUrl?: string;
  usageCost?: string;
  operator?: string;
  distance: number;
  chargerTypes: string[];
}
