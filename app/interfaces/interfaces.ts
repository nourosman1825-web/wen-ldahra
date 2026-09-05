export interface IResponse<T = undefined> {
  data?: T;
  message?: string;
  status?: number;
}

export interface IPlace {
  name: string;
  description?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  distance?: number;
  latitude?: number;
  longitude?: number;
  category: string;
  tags?: string[];
  address?: string;
}
export interface ISale {
  id?: number;
  title: string;
  description?: string;
  category: string;
  image?: string;
  date?: string;
  isSale?: boolean;
  discount?: string;
  location?: string;
}