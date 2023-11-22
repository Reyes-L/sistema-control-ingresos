export interface Order{
  id: string;
  name: string;
  address: string;
  mobile: string;
  products: Products[];
}

export interface Products{
  id: string;
  product: string;
  account: number;
  price: number;
}

export interface Person{
  id: string;
  name: string;
  address: string;
  mobile: string;
}
