export interface User {
  UserId: string;
  Name: string;
  Email: string;
  Password: string;
  Role?: "user" | "admin" | "seller";
  Address?: string;
  Phone?: string;
  CreatedAt: string;
}
export interface product {
  ProductId: string;
  Name: string;
  Price: number;
  Category: string;
  Stock: number;
  ImageURL?: string;
  SellerID: string;
}

export interface Cart {
  UserId: string;
  Items: { ProductId: string; Quantity: number }[];
}

export interface Order {
  OrderId: string;
  Userid: string;
  Items: { ProductID: string; Quantity: number }[];
  TotalPrice: number;
  Status: "Pending" | "Shiped" | "Delivered";
  CreatedAt: string;
}
