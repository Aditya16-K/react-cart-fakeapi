export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export type Profile = {
  name: string;
  email: string;
  phone: number;
  address: string;
};
