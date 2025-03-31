export interface Station {
  id: number | string;
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
