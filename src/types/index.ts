export interface IOrderDetails {
  id: number
  productName: string;
  quantity: number;
  productPrice: number
}

export interface IOrders {
  id?: number;
  orderNumber: string;
  userName: string;
  orderTime: string;
  orderStatus: string;
  totalPrice: number;
  orderDetails: IOrderDetails[]
}
